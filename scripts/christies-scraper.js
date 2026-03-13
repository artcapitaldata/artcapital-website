#!/usr/bin/env node

/**
 * Art Capital — Christie's Auction Scraper
 *
 * Scarica TUTTI i risultati d'asta di arte contemporanea da Christie's
 * e li salva nella tabella auction_results di Supabase.
 *
 * Utilizzo:
 *   node christies-scraper.js              # Scrape dall'ultima vendita non completata
 *   node christies-scraper.js --test       # Testa su una singola vendita
 *   node christies-scraper.js --from 2024  # Parti dal 2024
 *
 * Requisiti:
 *   npm install playwright @supabase/supabase-js
 *   npx playwright install chromium
 */

const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// ============ CONFIGURAZIONE ============

const SUPABASE_URL = 'https://zzgindufkfxhxfzrquia.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6Z2luZHVma2Z4aHhfenJxdWlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0OTg0OCwiZXhwIjoyMDg4OTI1ODQ4fQ.wUQiEBgkomutps8zEGnzoLOagCzhAC9jR1DLtu4p4Qo';

const CHECKPOINT_FILE = path.join(__dirname, 'scraper-checkpoint.json');
const DELAY_MS = 2000; // 2 secondi tra le richieste
const CATEGORIES = [
  '702EC01E7D0D4E13B50E7D5B5ECC24E8', // Post-War & Contemporary Art
];

// ============ SUPABASE ============

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============ CHECKPOINT ============

function loadCheckpoint() {
  try {
    if (fs.existsSync(CHECKPOINT_FILE)) {
      return JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'));
    }
  } catch (e) {}
  return {
    completedSales: [],
    totalLots: 0,
    totalSales: 0,
    errors: [],
    lastRun: null,
    startedAt: new Date().toISOString(),
  };
}

function saveCheckpoint(cp) {
  cp.lastRun = new Date().toISOString();
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(cp, null, 2));
}

// ============ PARSING HELPERS ============

function parseArtistName(rawText) {
  // "YAN PEI MING (B. 1960)" → "Yan Pei Ming"
  // "CÉSAR (1921-1998)" → "César"
  if (!rawText) return { name: null, birthYear: null, deathYear: null };

  const match = rawText.match(/^(.+?)\s*\((?:B\.\s*)?(\d{4})(?:\s*[-–]\s*(\d{4}))?\)\s*$/i);
  if (match) {
    const rawName = match[1].trim();
    // Title case
    const name = rawName.split(/\s+/).map(w => {
      if (w.length <= 2 && w === w.toUpperCase()) return w.toLowerCase();
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    }).join(' ');
    return {
      name,
      birthYear: parseInt(match[2]),
      deathYear: match[3] ? parseInt(match[3]) : null,
    };
  }
  // Fallback: just clean up the name
  const name = rawText.replace(/\(.*\)/, '').trim();
  return { name, birthYear: null, deathYear: null };
}

function parsePrice(text) {
  // "GBP 19,050" → { currency: 'GBP', amount: 19050 }
  // "USD 1,234,567" → { currency: 'USD', amount: 1234567 }
  if (!text) return { currency: null, amount: null };

  const currencies = ['USD', 'GBP', 'EUR', 'CHF', 'HKD', 'CNY', 'JPY', 'AUD', 'CAD'];
  for (const curr of currencies) {
    if (text.includes(curr)) {
      const numStr = text.replace(curr, '').replace(/[,\s]/g, '').trim();
      const amount = parseFloat(numStr);
      if (!isNaN(amount)) return { currency: curr, amount };
    }
  }
  return { currency: null, amount: null };
}

function parseEstimate(text) {
  // "GBP 12,000 - GBP 18,000" → { currency: 'GBP', low: 12000, high: 18000 }
  if (!text) return { currency: null, low: null, high: null };

  const parts = text.split(/\s*[-–]\s*/);
  if (parts.length === 2) {
    const low = parsePrice(parts[0]);
    const high = parsePrice(parts[1]);
    return {
      currency: low.currency || high.currency,
      low: low.amount,
      high: high.amount,
    };
  }
  return { currency: null, low: null, high: null };
}

function parseDimensions(text) {
  // "59 × 47¼in. (150 × 120cm.)" → "150 × 120 cm"
  if (!text) return null;
  const cmMatch = text.match(/(\d+[.,]?\d*)\s*[x×]\s*(\d+[.,]?\d*)\s*cm/i);
  if (cmMatch) {
    return `${cmMatch[1].replace(',', '.')} × ${cmMatch[2].replace(',', '.')} cm`;
  }
  return text;
}

function parseYearCreated(text) {
  // "Painted in 1995" → 1995
  // "Executed in 1973." → 1973
  if (!text) return null;
  const match = text.match(/(?:painted|executed|created|made|cast|conceived)\s+(?:in\s+)?(?:circa\s+)?(\d{4})/i);
  if (match) return parseInt(match[1]);

  // Try standalone year
  const yearMatch = text.match(/\b(19\d{2}|20[0-2]\d)\b/);
  if (yearMatch) return parseInt(yearMatch[1]);
  return null;
}

function categorizeMedium(medium) {
  if (!medium) return 'other';
  const m = medium.toLowerCase();

  if (/oil on|acrylic|tempera|enamel on canvas|alkyd|mixed media on canvas/.test(m)) return 'painting';
  if (/watercolor|watercolour|gouache|pastel|drawing|ink on paper|charcoal|pencil|crayon|on paper/.test(m)) return 'work_on_paper';
  if (/screenprint|silkscreen|lithograph|etching|woodcut|print|engraving|aquatint|monotype|linocut/.test(m)) return 'print';
  if (/bronze|marble|steel|sculpture|installation|cast|carved|welded|assemblage|resin|plaster/.test(m)) return 'sculpture';
  if (/photograph|c-print|gelatin silver|digital print|chromogenic|pigment print|cibachrome/.test(m)) return 'photography';
  if (/ceramic|porcelain|earthenware|stoneware/.test(m)) return 'ceramic';

  return 'other';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============ SCRAPING ============

async function getSalesList(page, categoryId, pageNum = 1) {
  const url = `https://www.christies.com/en/results?isautosuggestclick=false&keyword=&category=${categoryId}&orderby=desc&page=${pageNum}`;

  console.log(`  Fetching sales list page ${pageNum}...`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await delay(DELAY_MS);

  // Aspetta che i risultati carichino
  try {
    await page.waitForSelector('[class*="sale-"]', { timeout: 15000 });
  } catch {
    // Prova un selettore alternativo
    try {
      await page.waitForSelector('a[href*="/auction/"]', { timeout: 10000 });
    } catch {
      console.log('  No sales found on this page, might be the last page');
      return { sales: [], hasMore: false };
    }
  }

  const sales = await page.evaluate(() => {
    const results = [];
    // Cerca tutti i link alle vendite
    const links = document.querySelectorAll('a[href*="/auction/"], a[href*="/en/auction/"]');
    const seen = new Set();

    for (const link of links) {
      const href = link.getAttribute('href');
      if (!href || seen.has(href)) continue;

      // Estrai sale ID dall'URL
      const saleMatch = href.match(/\/auction\/(\d+)/);
      if (!saleMatch) continue;

      seen.add(href);
      const saleId = saleMatch[1];
      const title = link.textContent?.trim() || '';

      // Cerca la data vicino al link
      const parent = link.closest('[class*="sale"]') || link.parentElement?.parentElement;
      const dateText = parent?.querySelector('[class*="date"], time')?.textContent?.trim() || '';

      results.push({
        saleId,
        url: href.startsWith('http') ? href : `https://www.christies.com${href}`,
        title,
        date: dateText,
      });
    }
    return results;
  });

  // Controlla se c'è una pagina successiva
  const hasMore = await page.evaluate(() => {
    const nextBtn = document.querySelector('[class*="next"], [aria-label="Next"]');
    return nextBtn && !nextBtn.disabled;
  });

  console.log(`  Found ${sales.length} sales on page ${pageNum}`);
  return { sales, hasMore };
}

async function getOnlineSaleLots(page, saleUrl, saleName) {
  console.log(`  Navigating to sale: ${saleName || saleUrl}`);

  // Per le vendite online di Christie's
  await page.goto(saleUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await delay(DELAY_MS);

  // Clicca su "Browse Lots" se presente
  try {
    const browseLots = await page.$('text=BROWSE LOTS');
    if (browseLots) {
      await browseLots.click();
      await delay(2000);
    }
  } catch {}

  // Switcha a vista lista per avere più info
  try {
    const listView = await page.$('[aria-label="List view"], button:has-text("List")');
    if (listView) await listView.click();
    await delay(1000);
  } catch {}

  // Raccogli tutti i link ai lotti
  const lotLinks = await page.evaluate(() => {
    const links = [];
    const seen = new Set();
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      // Match lot URLs: contain a lot ID number at the end
      if (href && /\/\d+\?/.test(href) || /\/\d+$/.test(href)) {
        if (href.includes('/s/') && !seen.has(href)) {
          seen.add(href);
          links.push(href.startsWith('http') ? href : `https://onlineonly.christies.com${href}`);
        }
      }
    });
    return links;
  });

  console.log(`  Found ${lotLinks.length} lot links`);
  return lotLinks;
}

async function scrapeLotPage(page, lotUrl) {
  try {
    await page.goto(lotUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await delay(DELAY_MS);

    const lotData = await page.evaluate(() => {
      const getText = (selectors) => {
        for (const sel of (Array.isArray(selectors) ? selectors : [selectors])) {
          const el = document.querySelector(sel);
          if (el?.textContent?.trim()) return el.textContent.trim();
        }
        return null;
      };

      // Raccogli tutto il testo visibile nella pagina
      const bodyText = document.body.innerText;

      // Artista - di solito è il primo heading grande o un elemento specifico
      let artistRaw = null;
      let title = null;
      let priceRealized = null;
      let estimate = null;
      let saleDate = null;
      let lotNumber = null;
      let medium = null;
      let details = null;
      let saleName = null;
      let imageUrl = null;

      // Prova vari selettori per l'artista
      const artistEl = document.querySelector('[class*="artist"], [class*="maker"], h1, [class*="lot-header"]');
      if (artistEl) artistRaw = artistEl.textContent.trim();

      // Cerca nel testo della pagina con pattern recognition
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        const text = el.textContent?.trim();
        if (!text || text.length > 500) continue;

        // Price Realised
        if (text.match(/^Price\s+Realis/i) && el.nextElementSibling) {
          priceRealized = el.nextElementSibling.textContent?.trim();
        }
        if (el.previousElementSibling?.textContent?.match(/Price\s+Realis/i)) {
          priceRealized = priceRealized || text;
        }

        // Estimate
        if (text.match(/^Estimate$/i) && el.nextElementSibling) {
          estimate = el.nextElementSibling.textContent?.trim();
        }

        // Closed date
        if (text.match(/^Closed/i) && el.nextElementSibling) {
          saleDate = el.nextElementSibling.textContent?.trim();
        }

        // Lot number
        if (text.match(/^Lot\s+\d+$/i)) {
          lotNumber = text;
        }
      }

      // Details section - contiene medium, dimensioni, anno
      const detailsSection = document.querySelector('[class*="details"], [class*="description"]');
      if (detailsSection) {
        details = detailsSection.textContent?.trim();
      }

      // Sale name dal breadcrumb
      const breadcrumb = document.querySelector('nav [class*="breadcrumb"], [class*="sale-title"]');
      if (breadcrumb) saleName = breadcrumb.textContent?.trim();

      // Immagine principale
      const img = document.querySelector('img[src*="christies"], img[class*="lot-image"], img[alt]');
      if (img) imageUrl = img.src;

      // Heading per il titolo dell'opera
      const headings = document.querySelectorAll('h1, h2');
      for (const h of headings) {
        const t = h.textContent?.trim();
        if (t && !t.match(/Christie/i) && !t.match(/AUCTION/i) && t.length < 200) {
          if (!artistRaw) artistRaw = t;
          else if (!title) title = t;
        }
      }

      return {
        artistRaw,
        title,
        priceRealized,
        estimate,
        saleDate,
        lotNumber,
        details,
        saleName,
        imageUrl,
        url: window.location.href,
      };
    });

    return lotData;

  } catch (err) {
    console.error(`  Error scraping lot ${lotUrl}: ${err.message}`);
    return null;
  }
}

function processLotData(raw) {
  if (!raw || !raw.artistRaw) return null;

  const artist = parseArtistName(raw.artistRaw);
  const priceData = parsePrice(raw.priceRealized);
  const estimateData = parseEstimate(raw.estimate);

  // Estrai medium e dimensioni dal details
  let medium = null;
  let dimensions = null;
  let yearCreated = null;

  if (raw.details) {
    const lines = raw.details.split('\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      // Medium: di solito contiene "on canvas", "on paper", "bronze", etc.
      if (!medium && /oil|acrylic|canvas|paper|bronze|marble|print|photograph|mixed media|ink|waterc|gouache|pastel|screen|lithograph/i.test(line)) {
        medium = line;
      }
      // Dimensions: contiene "cm" o "in."
      if (!dimensions && /\d+.*[x×].*\d+.*(?:cm|in)/i.test(line)) {
        dimensions = parseDimensions(line);
      }
      // Year
      if (!yearCreated && /(?:painted|executed|created|made|cast)\s+(?:in\s+)?(\d{4})/i.test(line)) {
        yearCreated = parseYearCreated(line);
      }
    }
  }

  // Parse lot number
  let lotNum = null;
  if (raw.lotNumber) {
    const m = raw.lotNumber.match(/(\d+)/);
    if (m) lotNum = m[1]; // Teniamo come stringa, la tabella ha lot_number TEXT
  }

  // Parse sale date
  let saleDate = null;
  if (raw.saleDate) {
    try {
      const d = new Date(raw.saleDate);
      if (!isNaN(d.getTime())) {
        saleDate = d.toISOString().split('T')[0];
      }
    } catch {}
  }

  return {
    artist_name: artist.name,
    title: raw.title,
    auction_house: "Christie's",
    sale_name: raw.saleName,
    sale_date: saleDate,
    lot_number: lotNum,
    medium: medium,
    medium_category: categorizeMedium(medium),
    dimensions_cm: dimensions,
    year_created: yearCreated,
    currency: priceData.currency || estimateData.currency,
    estimate_low: estimateData.low,
    estimate_high: estimateData.high,
    premium_price: priceData.amount,
    sold: priceData.amount !== null,
    source_url: raw.url,
    image_url: raw.imageUrl,
  };
}

// ============ DATABASE ============

async function upsertLot(lotData) {
  if (!lotData || !lotData.artist_name) return false;

  try {
    // Prova a matchare l'artista
    const { data: artists } = await supabase
      .from('artists')
      .select('id')
      .ilike('name', lotData.artist_name)
      .limit(1);

    if (artists && artists.length > 0) {
      lotData.artist_id = artists[0].id;
    }

    // Upsert basato su auction_house + sale_name + lot_number
    const { error } = await supabase
      .from('auction_results')
      .upsert(lotData, {
        onConflict: 'auction_house,sale_name,lot_number',
        ignoreDuplicates: false,
      });

    if (error) {
      // Se l'upsert fallisce (es. constraint mancante), prova insert
      const { error: insertError } = await supabase
        .from('auction_results')
        .insert(lotData);

      if (insertError) {
        console.error(`  DB error: ${insertError.message}`);
        return false;
      }
    }

    return true;
  } catch (err) {
    console.error(`  DB error: ${err.message}`);
    return false;
  }
}

// ============ MAIN ============

async function main() {
  const args = process.argv.slice(2);
  const testMode = args.includes('--test');
  const fromYear = args.find(a => a.startsWith('--from'))?.split('=')[1] ||
                   args[args.indexOf('--from') + 1] || null;

  console.log('===========================================');
  console.log('  Art Capital — Christie\'s Scraper');
  console.log('===========================================');
  console.log(`Mode: ${testMode ? 'TEST (1 sale only)' : 'FULL SCRAPE'}`);
  if (fromYear) console.log(`Starting from: ${fromYear}`);
  console.log('');

  const checkpoint = loadCheckpoint();
  console.log(`Checkpoint: ${checkpoint.totalLots} lots from ${checkpoint.totalSales} sales already scraped`);
  console.log('');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  // Dismissa cookie banner automaticamente
  page.on('dialog', dialog => dialog.dismiss());

  try {
    // STEP 1: Ottieni lista vendite
    console.log('STEP 1: Fetching sales list from Christie\'s...');
    let allSales = [];

    for (const categoryId of CATEGORIES) {
      let pageNum = 1;
      let hasMore = true;

      while (hasMore) {
        const { sales, hasMore: more } = await getSalesList(page, categoryId, pageNum);
        allSales = allSales.concat(sales);
        hasMore = more && !testMode;
        pageNum++;

        if (pageNum > 50) break; // Safety limit
      }
    }

    // Filtra vendite già completate
    const pendingSales = allSales.filter(s => !checkpoint.completedSales.includes(s.saleId));
    console.log(`\nTotal sales found: ${allSales.length}`);
    console.log(`Already completed: ${allSales.length - pendingSales.length}`);
    console.log(`Pending: ${pendingSales.length}\n`);

    if (testMode && pendingSales.length > 0) {
      pendingSales.length = 1; // Solo la prima vendita
    }

    // STEP 2: Per ogni vendita, scrapa i lotti
    for (let i = 0; i < pendingSales.length; i++) {
      const sale = pendingSales[i];
      console.log(`\n[${ i + 1}/${pendingSales.length}] Sale: ${sale.title || sale.saleId}`);
      console.log(`  URL: ${sale.url}`);

      try {
        // Naviga alla vendita e ottieni lista lotti
        const lotUrls = await getOnlineSaleLots(page, sale.url, sale.title);

        if (lotUrls.length === 0) {
          // Prova il pattern URL alternativo per le vendite dal vivo
          const liveUrl = `https://www.christies.com/en/auction/${sale.saleId}/browse-lots`;
          console.log(`  Trying live auction URL: ${liveUrl}`);
          // TODO: implementare scraping per vendite dal vivo
        }

        let lotsInserted = 0;

        for (let j = 0; j < lotUrls.length; j++) {
          const lotUrl = lotUrls[j];
          console.log(`  Lot ${j + 1}/${lotUrls.length}: ${lotUrl.split('/').pop()}`);

          const rawLot = await scrapeLotPage(page, lotUrl);
          if (!rawLot) {
            checkpoint.errors.push({ url: lotUrl, error: 'Failed to scrape', time: new Date().toISOString() });
            continue;
          }

          // Se il sale_name non è stato trovato nella pagina lotto, usa quello della vendita
          if (!rawLot.saleName && sale.title) {
            rawLot.saleName = sale.title;
          }

          const processed = processLotData(rawLot);
          if (!processed) {
            console.log(`    Skipped (no artist data)`);
            continue;
          }

          const saved = await upsertLot(processed);
          if (saved) {
            lotsInserted++;
            checkpoint.totalLots++;
          }

          // Log ogni 10 lotti
          if ((j + 1) % 10 === 0) {
            console.log(`  Progress: ${j + 1}/${lotUrls.length} lots processed, ${lotsInserted} saved`);
            saveCheckpoint(checkpoint);
          }
        }

        console.log(`  ✓ Completed: ${lotsInserted}/${lotUrls.length} lots saved`);
        checkpoint.completedSales.push(sale.saleId);
        checkpoint.totalSales++;
        saveCheckpoint(checkpoint);

      } catch (err) {
        console.error(`  ✗ Error on sale ${sale.saleId}: ${err.message}`);
        checkpoint.errors.push({
          saleId: sale.saleId,
          error: err.message,
          time: new Date().toISOString()
        });
        saveCheckpoint(checkpoint);
      }
    }

  } catch (err) {
    console.error(`\nFATAL ERROR: ${err.message}`);
    checkpoint.errors.push({ error: err.message, time: new Date().toISOString(), fatal: true });
  } finally {
    saveCheckpoint(checkpoint);
    await browser.close();

    console.log('\n===========================================');
    console.log('  SCRAPING COMPLETE');
    console.log('===========================================');
    console.log(`Total lots scraped: ${checkpoint.totalLots}`);
    console.log(`Total sales processed: ${checkpoint.totalSales}`);
    console.log(`Errors: ${checkpoint.errors.length}`);
    console.log(`Checkpoint saved to: ${CHECKPOINT_FILE}`);
    console.log('===========================================');
  }
}

main().catch(console.error);
