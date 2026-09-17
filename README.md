# AI-Powered Portfolio Website

Production-ready portfolio for **Sourav Sarker** — React + Vite + TypeScript + Tailwind, with optional Supabase dual-write backend.

**Live repo:** [github.com/Souravsuvro/AI-Powered-Portfolio-Website](https://github.com/Souravsuvro/AI-Powered-Portfolio-Website)

## Features

- **Home** — Hero, About, Projects, Latest Works, Blog slider, Contact (EmailJS + Calendly), share band
- **Blog** — List + detail pages with SEO, reading progress, related posts
- **Brain Games** — Memory Match, Reaction Time, Math Sprint, Simon Says (scores in localStorage)
- **Templates** — Filterable catalog with code previews
- **SEO** — `robots.txt`, `sitemap.xml`, `llms.txt`, JSON-LD helpers, Open Graph
- **Backend (optional)** — Dual-write: always localStorage; when env vars are set, also Supabase

## Quick start

```bash
npm install
cp .env.example .env   # fill EmailJS / Supabase keys as needed
npm run dev
```

## Environment

See `.env.example` and `.env.example.backend`:

| Variable | Purpose |
|----------|---------|
| `VITE_EMAILJS_*` | Contact form |
| `VITE_SUPABASE_URL` | Optional durable backend |
| `VITE_SUPABASE_ANON_KEY` | Client Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only (API routes) |

## Supabase setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `backend/sql/001_schema.sql` in the SQL Editor
3. Add the three env vars above
4. Deploy — inquiries / agent runs persist when keys are present

Docs: `backend/docs/BACKEND_SETUP.md`

## Deploy (Vercel)

- Connect this repo; `vercel.json` already rewrites SPA routes and preserves `/api/*`
- Add env vars in the Vercel dashboard

## Public assets

Included: `favicon.svg`, `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`.

Large screenshots / videos live under `public/images` and `public/videos` in the original site. Copy them locally if needed:

```bash
# from a clone of my-personal-blog
cp -r public/images public/videos path/to/AI-Powered-Portfolio-Website/public/
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview build |
| `npm run typecheck` | `tsc --noEmit` |

## License

ISC — portfolio code for Sourav Sarker.
