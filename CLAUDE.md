# CLAUDE.md - Art Capital Project Instructions

## Project Overview
Art Capital (artcapitaldata.com) is an art market intelligence platform - "Il Bloomberg dell'Arte".
It provides market data, analytics, and performance indices for contemporary art investors and collectors.

## Tech Stack
- **Framework**: Next.js 14+ with TypeScript, App Router
- **Styling**: Tailwind CSS (dark theme: brand-950 navy + accent gold #C9A84C)
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Hosting**: Vercel (Hobby plan, team: art-capitals-projects)
- **Newsletter**: Beehiiv (to be configured)
- **Charts**: Recharts for financial-style price index graphs
- **Icons**: Lucide React

## Key Concepts
- **Art Performance Index (API)**: Score 0-100 per artist
  - Formula: (Momentum x 0.35) + (Market Depth x 0.25) + (Recognition x 0.20) + (Consistency x 0.20)
  - Ratings: Strong Buy (80-100), Buy (60-79), Hold (40-59), Caution (20-39), High Risk (0-19)
- **Price Index**: Normalized historical price chart (base year = 100) using median auction prices
- **Freemium model**: Free, Premium (9.90/mo), Pro (49/mo)

## Project Structure
```
src/
  app/              # Next.js App Router pages
    layout.tsx      # Root layout (metadata, fonts)
    page.tsx        # Landing page (Server Component)
  components/
    layout/
      Header.tsx    # Responsive header with nav
      Footer.tsx    # Footer with links and disclaimer
  lib/
    constants.ts    # Site config, nav links, API weights, pricing tiers
    supabase.ts     # Supabase client (public + service role)
  styles/
    globals.css     # Tailwind + custom components + animations
  types/
    index.ts        # TypeScript types (Artist, ApiScore, PriceIndex, etc.)
supabase/
  schema.sql        # Database schema (tables, RLS, triggers)
```

## Database Tables
1. **artists** - Artist profiles (name, slug, nationality, medium[], movement[])
2. **auction_results** - Sale records (hammer_price, estimate, auction_house, date)
3. **api_scores** - Performance scores (score 0-100, momentum, depth, recognition, consistency)
4. **price_index** - Annual price data for charts (year, median_price, index_value, volume)
5. **exhibitions** + **artist_exhibitions** - Shows and fair participation
6. **newsletter_issues** - Newsletter archive
7. **profiles** - User profiles extending Supabase Auth

## Design System
- **Colors**: Navy dark theme (brand-50 to brand-950), Gold accent (#C9A84C)
- **Fonts**: Inter (body), Playfair Display (headings), JetBrains Mono (numbers)
- **Components**: .card, .card-hover, .badge-buy, .badge-hold, .badge-caution, .btn-primary, .btn-secondary

## Language
- UI text is in **Italian** (the platform targets Italian collectors primarily)
- Code, comments, and variable names are in **English**

## Build Notes
- next.config.js has `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` temporarily
- Page components should be Server Components by default
- Use 'use client' only when needed (interactivity, hooks, browser APIs)
- Do NOT use styled-jsx - put all CSS in globals.css or Tailwind classes

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://artcapitaldata.com
```

## GitHub
- Org: artcapitaldata
- Repo: artcapital-website
- Branch: main
- Auto-deploys to Vercel on push
