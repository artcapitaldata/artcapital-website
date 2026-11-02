/* Occhio — il quiz per riconoscere i pittori, versione web.
   Dati in data/: indice.json (scuole, pittori, lezioni, mestiere), opere.json (opere, dettagli, disegni),
   schede.json (vita e mercato, caricata quando si apre una scheda). Progressi e impostazioni nel browser. */
(() => {
'use strict';

// ---------- costanti ----------
const EPOCHE = [
  { id: 'medioevo', n: 'Duecento e Trecento', da: 1200, a: 1399 },
  { id: 'q400', n: 'Quattrocento', da: 1400, a: 1499 },
  { id: 'q500', n: 'Cinquecento', da: 1500, a: 1599 },
  { id: 'q600', n: 'Seicento', da: 1600, a: 1699 },
  { id: 'q700', n: 'Settecento', da: 1700, a: 1799 },
  { id: 'q800', n: 'Ottocento', da: 1800, a: 1899 },
  { id: 'q900', n: 'Primo Novecento', da: 1900, a: 1945, nota: 'fino al 1945' },
  { id: 'contemporaneo', n: 'Contemporaneo', da: 1946, a: 2100, nota: 'dal 1946' },
];
const PAESI = ['Italia', 'Fiandre', 'Olanda', 'Spagna', 'Francia', 'Germania', 'Inghilterra', 'Americhe', 'Altri paesi'];
const PAESI_NOTE = { Fiandre: 'e Belgio', Germania: 'Austria, Svizzera', 'Altri paesi': 'Nord ed Est Europa' };
const REGIONI = ['Toscana', 'Veneto', 'Lombardia', 'Emilia', 'Italia centrale', 'Lazio', 'Sud', 'Liguria', 'Piemonte'];
const VICINE = {
  Toscana: ['Italia centrale', 'Emilia', 'Lazio', 'Veneto'], Veneto: ['Lombardia', 'Emilia', 'Toscana', 'Lazio'],
  Lombardia: ['Veneto', 'Emilia', 'Piemonte', 'Toscana'], Emilia: ['Lombardia', 'Veneto', 'Lazio', 'Toscana'],
  'Italia centrale': ['Toscana', 'Lazio', 'Emilia', 'Veneto'], Lazio: ['Emilia', 'Sud', 'Toscana', 'Italia centrale'],
  Sud: ['Lazio', 'Liguria', 'Emilia', 'Veneto'], Liguria: ['Lombardia', 'Sud', 'Veneto', 'Emilia'],
  Piemonte: ['Lombardia', 'Liguria', 'Veneto', 'Toscana'],
};
const PAESI_VICINI = {
  Italia: ['Spagna', 'Francia', 'Fiandre', 'Germania'], Fiandre: ['Olanda', 'Germania', 'Francia', 'Spagna'],
  Olanda: ['Fiandre', 'Germania', 'Inghilterra', 'Francia'], Spagna: ['Italia', 'Fiandre', 'Francia', 'Olanda'],
  Francia: ['Italia', 'Fiandre', 'Inghilterra', 'Spagna'], Germania: ['Fiandre', 'Olanda', 'Altri paesi', 'Italia'],
  Inghilterra: ['Francia', 'Olanda', 'Americhe', 'Fiandre'], Americhe: ['Inghilterra', 'Francia', 'Altri paesi', 'Spagna'],
  'Altri paesi': ['Germania', 'Francia', 'Olanda', 'Inghilterra'],
};
const LIVELLI = {
  facile: { n: 'Facile', d: 'Solo i grandi nomi, nomi da scuole diverse', liv: [1, 2], opz: 4, intro: true, vicini: 'largo' },
  medio: { n: 'Medio', d: 'Anche i pittori da conoscitore, nomi della stessa regione', liv: [1, 2, 3], opz: 4, intro: true, vicini: 'regione' },
  difficile: { n: 'Difficile', d: 'Anche i minori, nomi della stessa scuola e generazione', liv: [1, 2, 3, 4], opz: 4, intro: true, vicini: 'scuola' },
  esperto: { n: 'Esperto', d: 'Soprattutto minori, sei nomi vicinissimi, dettagli e disegni, niente aiuti', liv: [2, 3, 4], opz: 6, intro: false, vicini: 'scuola' },
};
const FASCE = ['Meno di 100 mila €', '100 mila – 1 milione €', '1 – 10 milioni €', 'Oltre 10 milioni €'];
const INTERVALLI = [0, 600e3, 86400e3, 3 * 86400e3, 8 * 86400e3, 21 * 86400e3, 60 * 86400e3];
const NOMI_LIV = { 1: "l'ancora", 2: 'importante', 3: 'da conoscitore', 4: 'di nicchia' };

// ---------- stato salvato ----------
const K_STATO = 'occhio.web.stato.v1', K_IMP = 'occhio.web.impostazioni.v1';
function leggi(k, def) { try { const x = JSON.parse(localStorage.getItem(k)); return x || def; } catch (e) { return def; } }
function salva(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* senza memoria */ } }
const IMP_DEF = { sezione: 'libera', livello: 'medio', epoche: EPOCHE.map(e => e.id), paesi: PAESI.slice(), regioni: REGIONI.slice() };
let imp = Object.assign({}, IMP_DEF, leggi(K_IMP, {}));
let stato = Object.assign({ pittori: {}, scuole: {}, presentati: {}, recenti: [], mestiere: {}, giorni: {}, giuste: 0, sbagliate: 0 }, leggi(K_STATO, {}));
const oggi = () => new Date().toISOString().slice(0, 10);
function salvaStato() { stato.recenti = stato.recenti.slice(-400); salva(K_STATO, stato); }

// ---------- dati ----------
let D = null;           // indice
const P = {}, S = {}, OP = {}, DET = {}, DIS = {};
let SCHEDE = null;
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const caso = a => a[Math.floor(Math.random() * a.length)];
const mescola = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

async function carica() {
  const [ind, op] = await Promise.all([fetch('data/indice.json').then(r => r.json()), fetch('data/opere.json').then(r => r.json())]);
  D = ind;
  for (const s of D.scuole) S[s.id] = s;
  for (const p of D.pittori) P[p.id] = p;
  const add = (arr, dest, k) => { for (const x of arr) { const o = { id: x[0], p: x[1], t: x[2], y: x[3], c: x[4], f: x[5], h: x[6], mn: x[7], s: x[8], k }; (dest[o.p] = dest[o.p] || []).push(o); } };
  add(op.o, OP, 'o'); add(op.d, DET, 'd'); add(op.g, DIS, 'g');
}

// ---------- immagini ----------
function urlImmagine(o, w = 960) {
  if (o.s === 'e') return 'https://en.wikipedia.org/wiki/Special:FilePath/' + encodeURIComponent(o.f.replace(/ /g, '_')) + '?width=' + Math.min(w, 500);
  const n = encodeURIComponent(o.f.replace(/ /g, '_'));
  const tif = /\.tiff?$/i.test(o.f) ? '.jpg' : '';
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${o.h[0]}/${o.h}/${n}/${w}px-${n}${tif}`;
}
function riserve(o, w) {
  if (o.s === 'e') return [];
  const n = encodeURIComponent(o.f.replace(/ /g, '_'));
  return ['https://commons.wikimedia.org/wiki/Special:FilePath/' + n + '?width=' + w, `https://upload.wikimedia.org/wikipedia/commons/${o.h[0]}/${o.h}/${n}`];
}
function img(o, w = 960, cls = '') {
  const el = document.createElement('img');
  el.alt = ''; el.loading = 'lazy'; el.decoding = 'async'; el.referrerPolicy = 'no-referrer';
  if (cls) el.className = cls;
  const prove = riserve(o, w);
  el.onerror = () => {
    const n = prove.shift();
    if (n) el.src = n;
    else { el.onerror = null; const r = document.createElement('div'); r.className = 'rotta'; r.textContent = 'Immagine non disponibile'; el.replaceWith(r); }
  };
  el.src = urlImmagine(o, w);
  el.addEventListener('click', ev => { ev.stopPropagation(); if (!el.closest('.griglia.attesa')) apriLente(o); });
  return el;
}
function apriLente(o) {
  const l = $('#lente'); const im = $('img', l);
  im.src = urlImmagine(o, 1920); im.onerror = () => { im.onerror = null; im.src = urlImmagine(o, 960); };
  l.hidden = false;
}
$('#lente').addEventListener('click', () => { $('#lente').hidden = true; $('#lente img').src = ''; });

const crediti = {};
async function credito(o, el) {
  if (o.s === 'e') {
    el.innerHTML = `Immagine a bassa risoluzione da <a href="https://en.wikipedia.org/wiki/File:${encodeURIComponent(o.f.replace(/ /g, '_'))}" target="_blank" rel="noopener">Wikipedia</a>. © l'artista o gli aventi diritto: solo a scopo di studio, sezione non commerciale.`;
    return;
  }
  const pagina = 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(o.f.replace(/ /g, '_'));
  el.innerHTML = `Foto: <a href="${pagina}" target="_blank" rel="noopener">Wikimedia Commons</a>`;
  try {
    if (!crediti[o.f]) {
      const u = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=extmetadata&iiextmetadatafilter=Artist|LicenseShortName&titles=' + encodeURIComponent('File:' + o.f);
      const j = await fetch(u).then(r => r.json());
      const pg = Object.values(j.query.pages)[0];
      const m = pg.imageinfo[0].extmetadata;
      const tmp = document.createElement('div'); tmp.innerHTML = (m.Artist && m.Artist.value) || '';
      crediti[o.f] = { a: tmp.textContent.trim().slice(0, 80), l: (m.LicenseShortName && m.LicenseShortName.value) || '' };
    }
    const c = crediti[o.f];
    const chi = c.a && !/unknown|sconosciuto/i.test(c.a) ? esc(c.a) + ' · ' : '';
    el.innerHTML = `Foto: ${chi}${esc(c.l)} · <a href="${pagina}" target="_blank" rel="noopener">Wikimedia Commons</a>`;
  } catch (e) { /* resta il link */ }
}

// ---------- filtri dalle impostazioni ----------
function paese(p) { return (S[p.s] && S[p.s].paese) || 'Italia'; }
function regione(p) { return S[p.s] && S[p.s].r; }
function attivo(p) { return [p.b + 18, p.d || 2026]; }
function nelleEpoche(p) {
  const [a, b] = attivo(p);
  return EPOCHE.some(e => imp.epoche.includes(e.id) && a <= e.a && b >= e.da);
}
function nelLuogo(p) {
  const pa = paese(p);
  if (!imp.paesi.includes(pa)) return false;
  if (pa !== 'Italia' || imp.regioni.length === REGIONI.length) return true;
  return imp.regioni.includes(regione(p));
}
function nellaSezione(p) { return imp.sezione === 'completa' || p.sez !== 'P'; }
let POOL = [], POOL_SET = new Set(), POOL_LARGO = [];
function ricalcola() {
  const L = LIVELLI[imp.livello];
  POOL_LARGO = D.pittori.filter(p => (OP[p.id] || []).length && nellaSezione(p) && nelLuogo(p) && nelleEpoche(p));
  POOL = POOL_LARGO.filter(p => L.liv.includes(p.l));
  if (POOL.length < 8) POOL = POOL_LARGO.slice();
  POOL_SET = new Set(POOL.map(p => p.id));
}

// ---------- studio (scatole di Leitner) ----------
function voce(id) { return stato.pittori[id] || { box: 0, due: 0, g: 0, s: 0 }; }
function registra(id, ok) {
  const v = Object.assign({}, voce(id)); const now = Date.now();
  if (v.box === 0 && ok) v.box = (P[id] && P[id].l <= 2) ? 3 : 2;
  else if (ok) v.box = Math.min(6, v.box + 1);
  else v.box = 1;
  v.due = now + INTERVALLI[v.box]; ok ? v.g++ : v.s++;
  stato.pittori[id] = v;
  ok ? stato.giuste++ : stato.sbagliate++;
  stato.giorni[oggi()] = (stato.giorni[oggi()] || 0) + 1;
  salvaStato(); conteggio();
}
function conteggio() {
  const n = stato.giorni[oggi()] || 0; const tot = stato.giuste + stato.sbagliate;
  $('#conteggio').textContent = tot ? `${n} oggi · ${Math.round(100 * stato.giuste / tot)}%` : '';
}

// ---------- scelta del pittore e dell'opera ----------
function pesoLivello(l) { return imp.livello === 'esperto' ? { 2: 1, 3: 3, 4: 3 }[l] || 1 : imp.livello === 'difficile' ? { 1: 1, 2: 2, 3: 3, 4: 3 }[l] : { 1: 3, 2: 2, 3: 1, 4: 1 }[l]; }
function scegliPesato(arr, w) {
  const tot = arr.reduce((s, x) => s + w(x), 0); let r = Math.random() * tot;
  for (const x of arr) { r -= w(x); if (r < 0) return x; }
  return arr[arr.length - 1];
}
function prossimoPittore(evita) {
  const now = Date.now();
  const dovuti = POOL.filter(p => stato.pittori[p.id] && voce(p.id).due <= now && !evita.has(p.id)).sort((a, b) => voce(a.id).due - voce(b.id).due);
  if (dovuti.length && Math.random() < 0.55) return dovuti[0].id;
  const nuovi = POOL.filter(p => !stato.pittori[p.id] && !evita.has(p.id));
  const aperti = POOL.filter(p => stato.pittori[p.id] && !evita.has(p.id));
  if (nuovi.length && (Math.random() < 0.6 || !aperti.length)) return scegliPesato(nuovi, p => pesoLivello(p.l)).id;
  if (aperti.length) return scegliPesato(aperti, p => 7 - voce(p.id).box).id;
  const tutti = POOL.filter(p => !evita.has(p.id));
  return tutti.length ? caso(tutti).id : null;
}
function inEpoca(o) {
  if (!o.y || imp.epoche.length === EPOCHE.length) return true;
  return EPOCHE.some(e => imp.epoche.includes(e.id) && o.y >= e.da && o.y <= e.a);
}
function opera(pid, lista = OP) {
  let tutte = lista[pid] || []; if (!tutte.length) return null;
  const qui = tutte.filter(inEpoca); if (qui.length) tutte = qui;
  const rec = new Set(stato.recenti.slice(-300));
  const fresche = tutte.filter(o => !rec.has(o.id));
  if (Math.random() < 0.3) { const m = fresche.filter(o => o.mn); if (m.length) return caso(m); }
  return caso(fresche.length ? fresche : tutte);
}

// ---------- opzioni ----------
function vicino(a, b, anni) { return Math.abs(a.b - b.b) <= anni; }
function opzioniPittori(pid, n) {
  const p = P[pid]; const L = LIVELLI[imp.livello];
  const base = POOL_LARGO.filter(x => x.id !== pid);
  const simile = x => Math.abs(x.l - p.l) <= 1;
  let gruppi;
  if (L.vicini === 'scuola') {
    gruppi = [base.filter(x => x.s === p.s && vicino(x, p, 35) && simile(x)), base.filter(x => x.s === p.s && vicino(x, p, 50)),
      base.filter(x => regione(x) === regione(p) && paese(x) === paese(p) && vicino(x, p, 40)), base.filter(x => paese(x) === paese(p) && vicino(x, p, 50)), base.filter(x => vicino(x, p, 60))];
  } else if (L.vicini === 'regione') {
    gruppi = [base.filter(x => paese(x) === paese(p) && regione(x) === regione(p) && vicino(x, p, 50) && simile(x)),
      base.filter(x => paese(x) === paese(p) && vicino(x, p, 50) && simile(x)), base.filter(x => vicino(x, p, 60) && simile(x)), base.filter(x => vicino(x, p, 90))];
  } else {
    gruppi = [base.filter(x => vicino(x, p, 70) && x.l <= 2 && x.s !== p.s), base.filter(x => vicino(x, p, 100) && x.l <= 2), base.filter(x => vicino(x, p, 120))];
  }
  const scelti = [];
  for (const g of gruppi) { for (const x of mescola(g)) { if (scelti.length >= n) break; if (!scelti.includes(x.id)) scelti.push(x.id); } if (scelti.length >= n) break; }
  return mescola([pid, ...scelti]);
}
function opzioniLuogo(p) {
  const pa = paese(p);
  const stretto = imp.paesi.length === 1 || imp.regioni.length < REGIONI.length;
  if (pa === 'Italia' && REGIONI.includes(regione(p)) && (stretto || voce(p.id).box >= 1)) {
    // the centres: Firenze or Siena, Venezia or the Terraferma… (school ids)
    const stessa = D.scuole.filter(s => s.r === regione(p) && s.id !== p.s && s.paese === 'Italia').map(s => s.id);
    const vic = D.scuole.filter(s => (VICINE[regione(p)] || []).slice(0, 2).includes(s.r) && (!stretto || imp.regioni.includes(s.r))).map(s => s.id);
    const opz = [p.s, ...mescola(stessa), ...mescola(vic)].slice(0, 4);
    if (opz.length >= 2) return { giusta: p.s, opz: mescola(opz), tipo: 'scuola' };
    if (stretto) return null;
  }
  if (pa === 'Italia' && REGIONI.includes(regione(p))) {
    return { giusta: regione(p), opz: mescola([regione(p), ...mescola(VICINE[regione(p)] || REGIONI.filter(r => r !== regione(p))).slice(0, 3)]), tipo: 'regione' };
  }
  if (pa === 'Italia') {   // movimenti del Novecento italiano
    const mov = D.scuole.filter(s => s.paese === 'Italia' && !REGIONI.includes(s.r) && s.id !== p.s).map(s => s.id);
    return { giusta: p.s, opz: mescola([p.s, ...mescola(mov).slice(0, 3)]), tipo: 'movimento' };
  }
  if (imp.paesi.length === 1) return null;
  return { giusta: pa, opz: mescola([pa, ...mescola(PAESI_VICINI[pa] || PAESI.filter(x => x !== pa)).slice(0, 3)]), tipo: 'paese' };
}
function secolo(y) {
  if (y < 1400) return 'Duecento e Trecento'; if (y < 1500) return 'Quattrocento'; if (y < 1600) return 'Cinquecento';
  if (y < 1700) return 'Seicento'; if (y < 1800) return 'Settecento'; if (y < 1900) return 'Ottocento'; if (y < 1946) return 'Primo Novecento';
  return 'Contemporaneo';
}
function anno(o) { if (o.y) return o.y; const p = P[o.p]; return Math.min(p.d || 2000, p.b + 35); }

// ---------- il feed ----------
let carte = [], contatore = 0, seriale = 0, rinviate = [], inCoda = new Set(), ultimoTipo = '', ultimaScuola = -99, ultimaIntro = -99;
const nid = k => k + (++seriale);
function presentato(k) { return !!stato.presentati[k]; }

function domanda(pid) {
  const p = P[pid]; const o = opera(pid); if (!o) return null;
  const box = voce(pid).box; const dado = Math.random() * 10; const L = LIVELLI[imp.livello];
  const n = (box >= 4 || L.opz === 6) ? 5 : L.opz - 1;
  if (box >= 3 && dado < (box >= 4 ? 4.5 : 3)) { const c = avanzata(pid); if (c) return c; }
  if ((box >= 3 || imp.livello === 'esperto') && dado >= 8.5 && DET[pid] && DET[pid].length) {
    return { tipo: 'dettaglio', id: nid('d'), o: opera(pid, DET), opz: opzioniPittori(pid, n) };
  }
  if (box >= 2 && dado >= 7.6 && dado < 8.5) {
    const sec = EPOCHE.map(e => e.n); const g = secolo(anno(o)); const i = sec.indexOf(g);
    const da = Math.max(0, Math.min(sec.length - 4, i - 1 - Math.floor(Math.random() * 2)));
    return { tipo: 'quando', id: nid('w'), o, opz: sec.slice(da, da + 4), giusta: g };
  }
  const quanteDove = imp.livello === 'esperto' ? 0 : box === 0 ? 3 : box === 1 ? 2 : box === 2 ? 1.5 : 0;
  if (dado < quanteDove) { const l = opzioniLuogo(p); if (l) return { tipo: 'dove', id: nid('r'), o, opz: l.opz, giusta: l.giusta, sotto: l.tipo }; }
  return { tipo: 'chi', id: nid('q'), o, opz: opzioniPittori(pid, n) };
}
function avanzata(pid) {
  const box = voce(pid).box;
  let prove = [disegno, bottega];
  if (box >= 4 || imp.livello === 'esperto') prove = prove.concat([intruso, maestroDi]);
  for (const f of mescola(prove)) { const c = f(pid); if (c && c.tipo !== ultimoTipo) return c; }
  return null;
}
function disegno(pid) {
  const ds = DIS[pid]; if (!ds || !ds.length) return null;
  const opz = opzioniPittori(pid, voce(pid).box >= 4 ? 5 : 3); if (opz.length < 2) return null;
  return { tipo: 'disegno', id: nid('g'), o: opera(pid, DIS), opz };
}
function bottega(pid) {
  const p = P[pid]; const ok = x => P[x] && (OP[x] || []).length && nellaSezione(P[x]);
  const allievi = (p.al || []).filter(ok); let maestro;
  if (allievi.length) maestro = pid; else { const m = (p.ma || []).filter(ok); if (!m.length) return null; maestro = caso(m); }
  const opz = [pid]; if (maestro !== pid) opz.push(maestro);
  for (const x of mescola(allievi.concat((P[maestro].al || []).filter(ok)))) if (opz.length < 4 && !opz.includes(x)) opz.push(x);
  if (opz.length < 2) return null;
  return { tipo: 'bottega', id: nid('b'), o: opera(pid), opz: mescola(opz) };
}
function intruso(pid) {
  const a = P[pid]; const sue = OP[pid] || []; if (sue.length < 4) return null;
  const rete = new Set([...(a.ma || []), ...(a.al || [])]);
  const vic = POOL_LARGO.filter(x => x.id !== pid && (x.s === a.s || rete.has(x.id)) && Math.abs(x.b - a.b) <= 25);
  const b = vic.find(x => rete.has(x.id)) || (vic.length ? caso(vic) : null); if (!b) return null;
  const ob = opera(b.id); if (!ob) return null;
  const tre = mescola(sue).slice(0, 3); const g = Math.floor(Math.random() * 4); tre.splice(g, 0, ob);
  return { tipo: 'intruso', id: nid('i'), opere: tre, giusta: g, p: pid };
}
function maestroDi(pid) {
  const p = P[pid]; const ms = (p.ma || []).filter(x => P[x]); if (!ms.length) return null;
  const m = caso(ms); const escl = new Set([...(p.ma || []), ...(p.al || []), pid]);
  const anz = x => !escl.has(x.id) && x.b < p.b - 5 && x.b > p.b - 70;
  const opz = [m];
  for (const g of [D.pittori.filter(x => x.s === p.s && anz(x) && (OP[x.id] || []).length), D.pittori.filter(x => regione(x) === regione(p) && anz(x))])
    for (const x of mescola(g)) if (opz.length < 4 && !opz.includes(x.id)) opz.push(x.id);
  if (opz.length < 3) return null;
  const o = opera(pid); if (!o) return null;
  return { tipo: 'maestroDi', id: nid('m'), o, opz: mescola(opz), giusta: m, p: pid };
}
function confronto() {
  const aperti = POOL.filter(p => stato.pittori[p.id]); if (aperti.length < 4) return null;
  for (let t = 0; t < 12; t++) {
    const x = caso(aperti); const altri = aperti.filter(y => y.s !== x.s && Math.abs(y.b - x.b) <= 40); if (!altri.length) continue;
    const y = caso(altri); const a = opera(x.id), b = opera(y.id); if (!a || !b) continue;
    const sx = S[x.s], sy = S[y.s];
    let nome;
    if (paese(x) !== paese(y)) nome = { Italia: 'italiano', Fiandre: 'fiammingo', Olanda: 'olandese', Spagna: 'spagnolo', Francia: 'francese', Germania: 'tedesco', Inghilterra: 'inglese', Americhe: 'americano', 'Altri paesi': 'dell\'Europa del Nord o dell\'Est' }[paese(x)];
    else if (regione(x) !== regione(y) && REGIONI.includes(regione(x))) nome = { Toscana: 'toscano', Veneto: 'veneto', Lombardia: 'lombardo', Emilia: 'emiliano', 'Italia centrale': 'umbro-marchigiano', Lazio: 'romano', Sud: 'napoletano o del Sud', Liguria: 'genovese', Piemonte: 'piemontese' }[regione(x)];
    else nome = 'di ' + sx.n;
    const g = Math.random() < 0.5 ? 0 : 1;
    return { tipo: 'confronto', id: nid('x'), opere: g === 0 ? [a, b] : [b, a], giusta: g, domanda: 'Quale dei due è ' + nome + '?' };
  }
  return null;
}
function mestiere() {
  const tutti = D.mestiere; const nuovo = tutti.find(m => stato.mestiere[m.id] === undefined);
  const m = nuovo || tutti.filter(m => stato.mestiere[m.id] === false)[0] || (Math.random() < 0.3 ? caso(tutti) : null);
  return m ? { tipo: 'mestiere', id: nid('M'), m } : null;
}
function valore() {
  const con = POOL.filter(p => stato.pittori[p.id] && p.re); if (!con.length) return null;
  const x = caso(con); const o = opera(x.id); if (!o) return null;
  return { tipo: 'valore', id: nid('v'), p: x.id, o };
}

function aggiungi(n) {
  const fatte = []; const usati = new Set(); let tentativi = 0;
  const metti = c => { fatte.push(c); ultimoTipo = c.tipo; };
  while (fatte.length < n && tentativi++ < n * 6) {
    contatore++;
    rinviate.forEach(r => r.attesa--);
    const ri = rinviate.findIndex(r => r.attesa <= 0);
    if (ri >= 0) { const p = rinviate.splice(ri, 1)[0].p; const q = domanda(p); if (q) { metti(q); usati.add(p); continue; } }
    if (contatore % 9 === 0 && imp.livello !== 'esperto') { const m = mestiere(); if (m) { metti(m); continue; } }
    if (contatore % 7 === 0) { const c = confronto(); if (c) { metti(c); continue; } }
    if (contatore % 11 === 0) { const v = valore(); if (v) { metti(v); continue; } }
    const pid = prossimoPittore(new Set([...usati, ...rinviate.map(r => r.p)])); if (!pid) break;
    usati.add(pid);
    const p = P[pid];
    if (LIVELLI[imp.livello].intro) {
      if (!presentato('s:' + p.s) && !inCoda.has('s:' + p.s) && carte.length + fatte.length > 1 && contatore - ultimaScuola >= 6) {
        inCoda.add('s:' + p.s); ultimaScuola = contatore; metti({ tipo: 'scuola', id: nid('s'), s: p.s });
      }
      if (!presentato('p:' + pid) && !inCoda.has('p:' + pid) && p.l <= 2 && contatore - ultimaIntro >= 3) {
        inCoda.add('p:' + pid); ultimaIntro = contatore; metti({ tipo: 'pittore', id: nid('p'), p: pid }); rinviate.push({ p: pid, attesa: 3 }); continue;
      }
    }
    const q = domanda(pid); if (q) metti(q);
  }
  return fatte;
}

// ---------- disegno delle carte ----------
const feed = $('#feed');
function nomeP(id) { return P[id] ? P[id].n : id; }
function anni(p) { return p.vivo ? 'nato nel ' + p.b : p.b + '–' + p.d; }
function didascalia(o) { return [o.t, o.y, o.c].filter(Boolean).join(' · '); }
function etichettaOpz(c, x) {
  if (['chi', 'dettaglio', 'disegno', 'bottega', 'maestroDi'].includes(c.tipo)) return esc(nomeP(x));
  if (c.tipo === 'dove' && (c.sotto === 'movimento' || c.sotto === 'scuola')) return esc(S[x].n);
  return esc(x);
}
function giusta(c, i) {
  switch (c.tipo) {
    case 'chi': case 'dettaglio': case 'disegno': case 'bottega': return c.opz[i] === c.o.p;
    case 'dove': case 'quando': return c.opz[i] === c.giusta;
    case 'maestroDi': return c.opz[i] === c.giusta;
    case 'intruso': case 'confronto': return i === c.giusta;
    case 'mestiere': return i === c.m.giusta;
    case 'valore': return i === fascia(P[c.p].re);
  }
  return true;
}
function fascia(e) { return e < 1e5 ? 0 : e < 1e6 ? 1 : e < 1e7 ? 2 : 3; }
const DOMANDE = {
  chi: ['CHI L\'HA DIPINTO', 'Di chi è?'], dettaglio: ['UN DETTAGLIO', 'Di chi è questo particolare?'],
  disegno: ['UN DISEGNO', 'Di chi è questo disegno?'], bottega: ['MAESTRO O ALLIEVO', 'La bottega è questa: chi l\'ha dipinto?'],
  quando: ['QUANDO', 'In che epoca è stato dipinto?'], valore: ['QUANTO VALE', 'Il record d\'asta di questo pittore è…'],
};

function cartaQuiz(c) {
  const art = document.createElement('article'); art.className = 'card'; art.dataset.id = c.id;
  let titolo, sotto;
  if (c.tipo === 'dove') {
    titolo = c.sotto === 'paese' ? 'In che paese è stato dipinto?' : c.sotto === 'movimento' ? 'A quale movimento appartiene?' : c.sotto === 'scuola' ? 'Di quale scuola è?' : 'In che regione è stato dipinto?';
    sotto = c.sotto === 'movimento' ? 'IL MOVIMENTO' : 'DOVE';
  } else if (c.tipo === 'maestroDi') { titolo = 'Chi fu il maestro di ' + nomeP(c.p) + '?'; sotto = 'IL MAESTRO'; }
  else if (c.tipo === 'intruso') { titolo = 'Tre sono della stessa mano. Quale no?'; sotto = 'L\'INTRUSO'; }
  else if (c.tipo === 'confronto') { titolo = c.domanda; sotto = 'A CONFRONTO'; }
  else if (c.tipo === 'mestiere') { titolo = c.m.domanda; sotto = 'IL MESTIERE · ' + esc(c.m.titolo).toUpperCase(); }
  else [sotto, titolo] = DOMANDE[c.tipo];

  if (c.tipo === 'intruso' || c.tipo === 'confronto') {
    const g = document.createElement('div'); g.className = c.tipo === 'intruso' ? 'griglia' : 'duo';
    c.opere.forEach((o, i) => {
      const cella = document.createElement('div'); cella.className = 'cella'; cella.appendChild(img(o, 500));
      const n = document.createElement('span'); n.className = 'n'; n.textContent = i + 1; cella.appendChild(n);
      g.appendChild(cella);
    });
    art.appendChild(g);
  } else if (c.tipo !== 'mestiere') {
    const f = document.createElement('div'); f.className = 'figura'; f.appendChild(img(c.o));
    if (c.o.s === 'e') { const b = document.createElement('span'); b.className = 'protetta'; b.textContent = '© opera protetta · bassa risoluzione'; f.appendChild(b); }
    art.appendChild(f);
  }
  const dq = document.createElement('div'); dq.className = 'domanda';
  dq.innerHTML = `<div class="etichetta">${sotto}</div><h2>${esc(titolo)}</h2>` + (c.tipo === 'mestiere' ? `<p class="testo-lungo">${esc(c.m.testo)}</p>` : '');
  art.appendChild(dq);
  const opz = document.createElement('div'); opz.className = 'opzioni';
  let etichette;
  if (c.tipo === 'intruso' || c.tipo === 'confronto') etichette = c.opere.map((_, i) => 'N. ' + (i + 1));
  else if (c.tipo === 'mestiere') { etichette = c.m.opzioni.map(esc); opz.classList.add('una'); }
  else if (c.tipo === 'valore') { etichette = FASCE; opz.classList.add('una'); }
  else etichette = c.opz.map(x => etichettaOpz(c, x));
  etichette.forEach((t, i) => {
    const b = document.createElement('button'); b.innerHTML = t; b.addEventListener('click', () => rispondi(c, i, art)); opz.appendChild(b);
  });
  if (c.tipo === 'valore') { const pn = document.createElement('div'); pn.className = 'domanda'; pn.innerHTML = `<p>${esc(nomeP(c.p))}</p>`; dq.appendChild(pn); }
  art.appendChild(opz);
  const es = document.createElement('div'); es.className = 'esito'; es.hidden = true; art.appendChild(es);
  return art;
}

function rispondi(c, i, art) {
  if (art.dataset.fatto) return; art.dataset.fatto = '1';
  const ok = giusta(c, i);
  const bs = [...art.querySelectorAll('.opzioni button')];
  bs.forEach((b, j) => { b.disabled = true; if (giusta(c, j)) b.classList.add('giusta'); else if (j === i) b.classList.add('sbagliata'); });
  if (c.tipo === 'intruso' || c.tipo === 'confronto') {
    art.querySelectorAll('.cella').forEach((ce, j) => { if (j === c.giusta) ce.classList.add('giusta'); else if (j === i) ce.classList.add('sbagliata'); });
  }
  // chi si registra
  let pid = null;
  if (c.o) pid = c.o.p;
  if (c.tipo === 'intruso') pid = c.p;
  if (c.tipo === 'confronto') pid = c.opere[c.giusta].p;
  if (c.tipo === 'mestiere') { stato.mestiere[c.m.id] = ok; ok ? stato.giuste++ : stato.sbagliate++; stato.giorni[oggi()] = (stato.giorni[oggi()] || 0) + 1; salvaStato(); conteggio(); }
  else if (c.tipo === 'valore') { ok ? stato.giuste++ : stato.sbagliate++; stato.giorni[oggi()] = (stato.giorni[oggi()] || 0) + 1; salvaStato(); conteggio(); }
  else if (pid) registra(pid, ok);
  (c.opere || [c.o]).filter(Boolean).forEach(o => stato.recenti.push(o.id));
  mostraEsito(c, ok, art.querySelector('.esito'));
  if (!ok && pid && c.tipo !== 'confronto') programmaTrucco(pid, art);
}

function chipsPittore(p) {
  const s = S[p.s]; const out = [`<span class="chip forte">${esc(s ? s.n : '')}</span>`];
  if (paese(p) !== 'Italia') { if (!s || paese(p) !== s.n) out.push(`<span class="chip">${esc(paese(p))}</span>`); }
  else if (REGIONI.includes(regione(p))) out.push(`<span class="chip">${esc(regione(p))}</span>`);
  for (const m of (p.ma || []).slice(0, 2)) if (P[m]) out.push(`<span class="chip">allievo di ${esc(P[m].n)}</span>`);
  return out.join('');
}
function bloccoPittore(p, o, conTitolo = true) {
  let h = `<div class="nome"><button data-scheda="${p.id}">${esc(p.n)}</button><span class="anni">${esc(anni(p))} ›</span></div>`;
  if (o && conTitolo) h += `<div class="didascalia">${esc(didascalia(o))}</div>`;
  h += `<div class="chips">${chipsPittore(p)}</div>`;
  if (p.colpo) h += `<div class="colpo">${esc(p.colpo)}</div>`;
  if (p.segni && p.segni.length) h += `<div class="blocco"><div class="etichetta">Come riconoscerlo</div><ul>${p.segni.slice(0, 3).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  if (p.confondi) h += `<div class="blocco"><div class="etichetta">Con chi si confonde</div><p>${esc(p.confondi)}</p></div>`;
  return h;
}
function mostraEsito(c, ok, es) {
  es.hidden = false;
  let h = `<div class="verdetto ${ok ? 'ok' : 'no'}"><span class="pallino">${ok ? '✓' : '✗'}</span>${ok ? 'Giusto' : 'Sbagliato'}</div>`;
  if (c.tipo === 'mestiere') { h += `<p>${esc(c.m.spiegazione)}</p>`; es.innerHTML = h; return; }
  if (c.tipo === 'valore') {
    const p = P[c.p]; h += bloccoPittore(p, c.o);
    if (p.rec) h += `<div class="blocco"><div class="etichetta">Il record</div><p>${esc(p.rec)}</p></div>`;
  } else if (c.tipo === 'intruso') {
    const o = c.opere[c.giusta];
    h += `<p>L'intruso è il ${c.giusta + 1}: <b>${esc(nomeP(o.p))}</b>, ${esc(didascalia(o))}. Gli altri tre sono di <b>${esc(nomeP(c.p))}</b>.</p>` + bloccoPittore(P[c.p], null, false);
  } else if (c.tipo === 'confronto') {
    c.opere.forEach((o, i) => { h += `<p><b>${i + 1}.</b> ${esc(nomeP(o.p))} (${esc(S[P[o.p].s].n)}): ${esc(didascalia(o))}</p>`; });
  } else {
    const p = P[c.o.p];
    if (c.tipo === 'dove') h += `<p class="didascalia">${c.sotto === 'movimento' || c.sotto === 'scuola' ? esc(S[p.s].n) : esc(c.giusta)}</p>`;
    if (c.tipo === 'quando') h += `<p class="didascalia">${c.o.y ? 'Datato ' + c.o.y : 'Senza data precisa: ' + esc(nomeP(c.o.p)) + ' lavorò tra ' + (p.b + 18) + ' e ' + (p.d || 'oggi')}</p>`;
    h += bloccoPittore(p, c.o);
  }
  h += `<div class="credito"></div>`;
  es.innerHTML = h;
  const o = c.o || (c.opere && c.opere[c.giusta]);
  if (o) credito(o, es.querySelector('.credito'));
}

function cartaPittore(c) {
  const p = P[c.p]; stato.presentati['p:' + c.p] = 1; salvaStato();
  const art = document.createElement('article'); art.className = 'card';
  const g = document.createElement('div'); g.className = 'griglia';
  mescola(OP[c.p] || []).slice(0, 4).forEach(o => { const ce = document.createElement('div'); ce.className = 'cella'; ce.appendChild(img(o, 500)); const cap = document.createElement('span'); cap.className = 'cap'; cap.textContent = o.t; ce.appendChild(cap); g.appendChild(ce); });
  art.appendChild(g);
  const d = document.createElement('div'); d.className = 'intro';
  d.innerHTML = `<div class="etichetta">Un pittore nuovo · ${esc(NOMI_LIV[p.l])}</div>` + bloccoPittore(p, null) + (p.chi ? `<p class="testo-lungo">${esc(p.chi)}</p>` : '') + `<p class="fonte">Tra qualche carta ti chiedo di riconoscerlo.</p>`;
  art.appendChild(d); return art;
}
function cartaScuola(c) {
  const s = S[c.s]; stato.presentati['s:' + c.s] = 1; salvaStato();
  const art = document.createElement('article'); art.className = 'card';
  const g = document.createElement('div'); g.className = 'griglia';
  const ps = D.pittori.filter(p => p.s === c.s && (OP[p.id] || []).length && nellaSezione(p)).sort((a, b) => a.l - b.l).slice(0, 4);
  ps.forEach(p => { const o = OP[p.id][0]; const ce = document.createElement('div'); ce.className = 'cella'; ce.appendChild(img(o, 500)); const cap = document.createElement('span'); cap.className = 'cap'; cap.textContent = p.n; ce.appendChild(cap); g.appendChild(ce); });
  art.appendChild(g);
  const d = document.createElement('div'); d.className = 'intro';
  d.innerHTML = `<div class="etichetta">Una scuola · ${esc(s.paese === 'Italia' && REGIONI.includes(s.r) ? s.r : s.paese)}</div><h2>${esc(s.n)}</h2>` +
    (s.sintesi ? `<p class="testo-lungo">${esc(s.sintesi)}</p>` : '') +
    (s.segni && s.segni.length ? `<div class="blocco"><div class="etichetta">Come riconoscerla</div><ul>${s.segni.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '') +
    (s.confondi ? `<div class="blocco"><div class="etichetta">Con cosa si confonde</div><p>${esc(s.confondi)}</p></div>` : '') +
    (s.dove ? `<p class="fonte">Dove vederla: ${esc(s.dove)}</p>` : '');
  art.appendChild(d); return art;
}
function cartaTrucco(pid) {
  const p = P[pid]; const o = opera(pid); if (!o) return null;
  const art = document.createElement('article'); art.className = 'card';
  const f = document.createElement('div'); f.className = 'figura'; f.appendChild(img(o)); art.appendChild(f);
  const d = document.createElement('div'); d.className = 'intro';
  let h = `<div class="etichetta">Ripasso · come riconoscere</div>` + bloccoPittore(p, o);
  if (p.trucchi && p.trucchi.length) h += `<div class="blocco"><div class="etichetta">I trucchi degli storici</div><ul>${p.trucchi.slice(0, 3).map(t => `<li>${esc(t.t)}${t.chi ? ' (' + esc(t.chi) + ')' : ''}</li>`).join('')}</ul></div>`;
  h += `<div class="credito"></div>`;
  d.innerHTML = h; art.appendChild(d); credito(o, d.querySelector('.credito'));
  return art;
}
const trucchiDati = {};
function programmaTrucco(pid, art) {
  if ((trucchiDati[pid] || 0) >= 2) return; trucchiDati[pid] = (trucchiDati[pid] || 0) + 1;
  setTimeout(() => {
    const t = cartaTrucco(pid); if (!t) return;
    let dopo = art.nextElementSibling; if (dopo && dopo.nextElementSibling) dopo = dopo.nextElementSibling;
    feed.insertBefore(t, dopo || null);
  }, 50);
}

function disegna(c) {
  if (c.tipo === 'pittore') return cartaPittore(c);
  if (c.tipo === 'scuola') return cartaScuola(c);
  return cartaQuiz(c);
}
let sentinella;
function riempi(n = 6) {
  const nuove = aggiungi(n);
  if (!nuove.length && !feed.querySelector('.card')) {
    feed.innerHTML = `<div class="pagina"><h1>Nessun pittore</h1><p class="nota">Con queste impostazioni non c'è nessun pittore da mostrare. Allarga l'epoca, il luogo o la difficoltà.</p><button class="pulsante" data-vai="impostazioni">Impostazioni</button></div>`;
    return;
  }
  for (const c of nuove) { carte.push(c); feed.insertBefore(disegna(c), sentinella); }
}
function avviaFeed() {
  ricalcola(); feed.innerHTML = ''; carte = []; contatore = 0; rinviate = []; inCoda = new Set(); ultimoTipo = ''; ultimaScuola = -99; ultimaIntro = -99; posFeed = 0;
  feed.appendChild(barra());
  if (!stato.giuste && !stato.sbagliate) feed.appendChild(cartaBenvenuto());
  sentinella = document.createElement('div'); sentinella.className = 'altre'; sentinella.textContent = '…';
  feed.appendChild(sentinella);
  riempi(8);
  new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) riempi(6); }, { rootMargin: '1600px' }).observe(sentinella);
}
function barra() {
  const el = document.createElement('div'); el.className = 'barra';
  const nEp = imp.epoche.length === EPOCHE.length ? 'tutte le epoche' : imp.epoche.length + (imp.epoche.length === 1 ? ' epoca' : ' epoche');
  const nLu = imp.paesi.length === PAESI.length ? 'ovunque' : imp.paesi.length === 1 ? imp.paesi[0] : imp.paesi.length + ' paesi';
  el.innerHTML = `<span class="seg" role="group" aria-label="Sezione"><button data-sez="libera" aria-pressed="${imp.sezione === 'libera'}">Opere libere</button><button data-sez="completa" aria-pressed="${imp.sezione === 'completa'}">Con i contemporanei</button></span>
  <button class="filtri" data-vai="impostazioni">${esc(LIVELLI[imp.livello].n)} · ${esc(nEp)} · ${esc(nLu)}</button>`;
  el.addEventListener('click', ev => {
    const b = ev.target.closest('[data-sez]'); if (!b || imp.sezione === b.dataset.sez) return;
    imp.sezione = b.dataset.sez; salva(K_IMP, imp); avviaFeed(); window.scrollTo(0, 0);
  });
  return el;
}
function cartaBenvenuto() {
  const art = document.createElement('article'); art.className = 'card';
  art.innerHTML = `<div class="intro"><div class="etichetta">Come funziona</div><h2>Allena l'occhio del conoscitore</h2>
  <p class="testo-lungo">Un'opera alla volta: indovina chi l'ha dipinta, la scuola, l'epoca. Prima di chiederti un pittore nuovo te lo presento; i pittori che sbagli tornano prima, quelli che sai si diradano.</p>
  <p class="testo-lungo">Scegli difficoltà, epoche e paesi nelle impostazioni. Ci sono ${D.pittori.filter(p => (OP[p.id] || []).length).length.toLocaleString('it-IT')} pittori e ${Object.values(OP).reduce((s, a) => s + a.length, 0).toLocaleString('it-IT')} opere.</p>
  <div class="pulsanti"><button class="pulsante" data-vai="impostazioni">Impostazioni</button><button class="pulsante sec" data-vai="info">Fonti e crediti</button></div></div>`;
  return art;
}

// ---------- impostazioni ----------
function vistaImpostazioni() {
  const el = $('#impostazioni');
  const n = () => { const old = imp; ricalcola(); return POOL.length; };
  const btn = (gruppo, id, nome, nota, on) => `<button data-g="${gruppo}" data-id="${esc(id)}" aria-pressed="${on}">${esc(nome)}${nota ? `<small>${esc(nota)}</small>` : ''}</button>`;
  ricalcola();
  el.innerHTML = `<div class="pagina"><h1>Impostazioni</h1>
  <div class="riepilogo" id="riepilogo"></div>
  <h2>Sezione</h2>
  <div class="scelte blocchi">${btn('sezione', 'libera', 'Opere libere', 'Solo immagini libere da diritti, anche per usi commerciali', imp.sezione === 'libera')}${btn('sezione', 'completa', 'Completa', 'Aggiunge i contemporanei protetti (Fontana, Burri, Boetti, Picasso…), a bassa risoluzione', imp.sezione === 'completa')}</div>
  <p class="nota">Le opere degli artisti morti dopo il 1955, o viventi, sono protette dal diritto d'autore: compaiono solo nella sezione completa, piccole e a scopo di studio.</p>
  <h2>Difficoltà</h2>
  <div class="scelte blocchi">${Object.entries(LIVELLI).map(([k, v]) => btn('livello', k, v.n, v.d, imp.livello === k)).join('')}</div>
  <h2>Epoca</h2>
  <div class="scelte">${EPOCHE.map(e => btn('epoche', e.id, e.n, e.nota || '', imp.epoche.includes(e.id))).join('')}</div>
  <div class="riga-azioni"><button class="piccolo" data-tutte="epoche">Tutte</button><button class="piccolo" data-nessuna="epoche">Nessuna</button></div>
  <h2>Luogo</h2>
  <div class="scelte">${PAESI.map(p => btn('paesi', p, p, PAESI_NOTE[p] || '', imp.paesi.includes(p))).join('')}</div>
  <div class="riga-azioni"><button class="piccolo" data-tutte="paesi">Tutti</button><button class="piccolo" data-solo="Italia">Solo Italia</button><button class="piccolo" data-nessuna="paesi">Nessuno</button></div>
  <h2>Regioni italiane</h2>
  <div class="scelte">${REGIONI.map(r => btn('regioni', r, r, '', imp.regioni.includes(r))).join('')}</div>
  <div class="riga-azioni"><button class="piccolo" data-tutte="regioni">Tutte</button><button class="piccolo" data-nessuna="regioni">Nessuna</button></div>
  <p class="nota">L'estero c'è, ma meno a fondo dell'Italia: i maggiori di ogni scuola.</p>
  <div class="pulsanti" style="margin-top:24px"><button class="pulsante" data-vai="feed" data-riavvia="1">Vai al quiz</button></div>
  <h2>I tuoi progressi</h2>
  <p class="nota">${stato.giuste + stato.sbagliate} risposte, ${Object.keys(stato.pittori).length} pittori incontrati. Restano in questo browser.</p>
  <div class="riga-azioni"><button class="piccolo" id="azzera">Azzera i progressi</button><button class="piccolo" data-vai="info">Fonti e crediti</button></div>
  </div>`;
  const aggiorna = () => {
    ricalcola();
    const nOp = POOL.reduce((s, p) => s + (OP[p.id] || []).length, 0);
    $('#riepilogo').innerHTML = POOL.length ? `Con queste scelte: <b>${POOL.length.toLocaleString('it-IT')}</b> pittori e <b>${nOp.toLocaleString('it-IT')}</b> opere.` : '<b>Nessun pittore</b> con queste scelte: allarga epoca o luogo.';
  };
  aggiorna();
  el.onclick = ev => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.g) {
      const g = b.dataset.g, id = b.dataset.id;
      if (g === 'sezione' || g === 'livello') { imp[g] = id; el.querySelectorAll(`[data-g="${g}"]`).forEach(x => x.setAttribute('aria-pressed', x.dataset.id === id)); }
      else { const s = new Set(imp[g]); s.has(id) ? s.delete(id) : s.add(id); imp[g] = [...s]; b.setAttribute('aria-pressed', s.has(id)); }
    } else if (b.dataset.tutte) { const g = b.dataset.tutte; imp[g] = g === 'epoche' ? EPOCHE.map(e => e.id) : g === 'paesi' ? PAESI.slice() : REGIONI.slice(); vistaImpostazioni(); }
    else if (b.dataset.nessuna) { imp[b.dataset.nessuna] = []; vistaImpostazioni(); }
    else if (b.dataset.solo) { imp.paesi = [b.dataset.solo]; vistaImpostazioni(); }
    else if (b.id === 'azzera') { if (confirm('Azzerare tutti i progressi in questo browser?')) { stato = { pittori: {}, scuole: {}, presentati: {}, recenti: [], mestiere: {}, giorni: {}, giuste: 0, sbagliate: 0 }; salvaStato(); conteggio(); vistaImpostazioni(); } return; }
    else return;
    salva(K_IMP, imp); aggiorna(); impCambiate = true;
  };
}
let impCambiate = false;

// ---------- pittori e scheda ----------
function vistaPittori() {
  const el = $('#pittori'); ricalcola();
  el.innerHTML = `<div class="pagina"><h1>Pittori</h1><p class="nota">Quelli delle tue impostazioni (${POOL_LARGO.length.toLocaleString('it-IT')}). Tocca un nome per la scheda.</p>
  <input class="cerca" type="search" placeholder="Cerca un pittore o una scuola" aria-label="Cerca"><div class="elenco"></div></div>`;
  const lista = $('.elenco', el);
  const mostra = q => {
    const f = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const qq = f(q || '');
    const ps = POOL_LARGO.filter(p => !qq || f(p.n).includes(qq) || f((S[p.s] || {}).n || '').includes(qq)).sort((a, b) => f(a.n).localeCompare(f(b.n)));
    let h = '', ult = '';
    for (const p of ps.slice(0, 1500)) { const l = f(p.n)[0].toUpperCase(); if (l !== ult) { h += `<div class="lettera">${l}</div>`; ult = l; } h += `<button data-scheda="${p.id}"><span>${esc(p.n)}</span><span>${esc((S[p.s] || {}).n || '')} · ${esc(anni(p))}</span></button>`; }
    lista.innerHTML = h || '<p class="nota">Nessuno.</p>';
  };
  mostra('');
  $('.cerca', el).addEventListener('input', e => mostra(e.target.value));
}
async function vistaScheda(pid) {
  const p = P[pid]; if (!p) return;
  const el = $('#scheda');
  el.innerHTML = `<div class="pagina"><button class="indietro" data-indietro="1">‹ Indietro</button><div id="corpo"></div></div>`;
  const corpo = $('#corpo', el);
  let h = `<div class="etichetta">${esc((S[p.s] || {}).n || '')} · ${esc(NOMI_LIV[p.l])}${p.sez === 'P' ? ' · protetto' : ''}</div>` + bloccoPittore(p, null);
  if (p.chi) h += `<p class="testo-lungo">${esc(p.chi)}</p>`;
  if (p.trucchi && p.trucchi.length) h += `<div class="blocco"><div class="etichetta">I trucchi degli storici</div><ul>${p.trucchi.map(t => `<li>${esc(t.t)}${t.chi ? ' (' + esc(t.chi) + ')' : ''}${t.fonte ? ` <a class="fonte" href="${esc(t.fonte)}" target="_blank" rel="noopener">fonte</a>` : ''}</li>`).join('')}</ul></div>`;
  if (p.fasi && p.fasi.length) h += `<div class="blocco"><div class="etichetta">Le fasi</div>${p.fasi.map(f => `<p><b>${f.da}–${f.a} · ${esc(f.nome)}</b><br>${esc(f.testo || '')}</p>`).join('')}</div>`;
  const rete = [...(p.ma || []).map(x => ['maestro', x]), ...(p.al || []).map(x => ['allievo', x])].filter(([, x]) => P[x]);
  if (rete.length) h += `<div class="blocco"><div class="etichetta">Maestri e allievi</div><p>${rete.map(([k, x]) => `${k} <button class="link" data-scheda="${x}">${esc(P[x].n)}</button>`).join(' · ')}</p></div>`;
  h += `<div id="vita"></div><div class="blocco"><div class="etichetta">Opere (${(OP[pid] || []).length})</div><div class="opere-griglia" id="og"></div></div>`;
  if ((DIS[pid] || []).length) h += `<div class="blocco"><div class="etichetta">Disegni</div><div class="opere-griglia" id="dg"></div></div>`;
  corpo.innerHTML = h;
  const og = $('#og', corpo);
  (OP[pid] || []).slice(0, 60).forEach(o => { const c = document.createElement('div'); c.className = 'cella'; c.title = didascalia(o); c.appendChild(img(o, 330)); og.appendChild(c); });
  const dg = $('#dg', corpo);
  if (dg) (DIS[pid] || []).slice(0, 18).forEach(o => { const c = document.createElement('div'); c.className = 'cella'; c.title = didascalia(o); c.appendChild(img(o, 330)); dg.appendChild(c); });
  vai('scheda', pid);
  try {
    if (!SCHEDE) SCHEDE = await fetch('data/schede.json').then(r => r.json());
    const v = SCHEDE[pid]; if (!v) return;
    let t = '';
    if (v.formazione) t += `<div class="blocco"><div class="etichetta">Formazione</div><p>${esc(v.formazione)}</p></div>`;
    if (v.luoghi && v.luoghi.length) t += `<div class="blocco"><div class="etichetta">Dove ha lavorato</div><ul>${v.luoghi.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
    if (v.viaggi) t += `<div class="blocco"><div class="etichetta">Viaggi</div><p>${esc(v.viaggi)}</p></div>`;
    if (v.produzione) t += `<div class="blocco"><div class="etichetta">Produzione</div><p>${esc(v.produzione)}</p></div>`;
    if (v.record || v.fascia || v.nota) t += `<div class="blocco"><div class="etichetta">Mercato</div>${v.record ? `<p><b>Record:</b> ${esc(v.record)}${v.fonteRecord ? ` <a class="fonte" href="${esc(v.fonteRecord)}" target="_blank" rel="noopener">fonte</a>` : ''}</p>` : ''}${v.fascia ? `<p>${esc(v.fascia)}</p>` : ''}${v.nota ? `<p>${esc(v.nota)}</p>` : ''}</div>`;
    if (v.fonti && v.fonti.length) t += `<p class="fonte">Fonti: ${v.fonti.map((u, i) => `<a href="${esc(u)}" target="_blank" rel="noopener">${i + 1}</a>`).join(' · ')}</p>`;
    $('#vita', corpo).innerHTML = t;
  } catch (e) { /* senza scheda lunga */ }
}

function vistaInfo() {
  $('#info').innerHTML = `<div class="pagina"><h1>Fonti e crediti</h1>
  <p class="testo-lungo">Occhio è un quiz per imparare a riconoscere i pittori: un'opera alla volta, con le scuole, i maestri e i segni per distinguerli. ${D.pittori.length.toLocaleString('it-IT')} pittori, soprattutto italiani dal Duecento all'Ottocento; i maggiori stranieri e una parte del Novecento.</p>
  <h2>Le immagini</h2>
  <p>Le immagini della sezione «Opere libere» vengono da <a href="https://commons.wikimedia.org" target="_blank" rel="noopener">Wikimedia Commons</a>: sono opere in pubblico dominio fotografate e pubblicate con licenze libere (pubblico dominio, CC0, CC BY, CC BY-SA), che ne permettono anche l'uso commerciale citando autore e licenza. Sotto ogni risposta c'è il credito della foto, con il link alla pagina del file.</p>
  <div class="avviso">Le opere dei musei statali italiani sono beni culturali: per riprodurle a fini di lucro il Codice dei beni culturali (artt. 107–108) chiede un'autorizzazione e un canone. L'uso per studio e senza scopo di lucro è libero.</div>
  <p>La sezione «Completa» aggiunge gli artisti protetti dal diritto d'autore (morti dopo il 1955 o viventi): le loro immagini sono a bassa risoluzione, prese da Wikipedia, mostrate solo a scopo di studio e di discussione, senza scopo di lucro (art. 70, comma 1-bis, legge 633/1941). © gli artisti e gli aventi diritto. Chi è titolare dei diritti su un'immagine e vuole che venga tolta può chiederlo al titolare del sito: verrà tolta subito.</p>
  <h2>I testi e le attribuzioni</h2>
  <p>Le schede dei pittori si basano sul Dizionario Biografico degli Italiani (Treccani), su Wikipedia e sulla letteratura storico-artistica; i «trucchi» riportano lo studioso e la fonte. Le opere e le loro attribuzioni vengono da <a href="https://www.wikidata.org" target="_blank" rel="noopener">Wikidata</a> e Commons, filtrate: via le opere «attribuite», di bottega, di cerchia, le collaborazioni, i file che nominano un altro artista. Qualche errore può restare: se ne trovi uno, segnalalo.</p>
  <h2>I tuoi dati</h2>
  <p>Nessun account, nessun tracciamento, nessun cookie. Progressi e impostazioni restano nel tuo browser. Le immagini e i crediti delle foto vengono caricati direttamente da Wikimedia (Commons e Wikipedia).</p>
  <div class="pulsanti"><button class="pulsante" data-vai="feed">Torna al quiz</button></div></div>`;
}

// ---------- navigazione ----------
let storia = [];
function vai(v, arg) {
  document.querySelectorAll('.vista').forEach(x => x.classList.toggle('attiva', x.id === v));
  if (v === 'impostazioni') vistaImpostazioni();
  if (v === 'pittori') vistaPittori();
  if (v === 'info') vistaInfo();
  if (v === 'feed' && impCambiate) { impCambiate = false; avviaFeed(); }
  if (v !== 'scheda') window.scrollTo(0, v === 'feed' ? posFeed : 0);
  else window.scrollTo(0, 0);
  storia.push(v);
}
let posFeed = 0;
document.addEventListener('click', ev => {
  const b = ev.target.closest('[data-vai],[data-scheda],[data-indietro]'); if (!b) return;
  if ($('#feed').classList.contains('attiva')) posFeed = window.scrollY;
  if (b.dataset.scheda) { vistaScheda(b.dataset.scheda); return; }
  if (b.dataset.indietro) { storia.pop(); const prima = storia.pop() || 'feed'; vai(prima === 'scheda' ? 'feed' : prima); return; }
  if (b.dataset.riavvia) impCambiate = true;
  vai(b.dataset.vai);
});

// ---------- avvio ----------
carica().then(() => {
  $('#carica').hidden = true; conteggio(); avviaFeed();
}).catch(e => { $('#carica').textContent = 'Non riesco a caricare i dati. Riprova tra poco.'; console.error(e); });
})();
