# AI Powered Portfolio Website

Production-ready portfolio for **Sourav Sarker Suvra** with dual-write backend foundation (localStorage + optional Supabase), lead pipeline, and AI agent readiness.

Live site (original): https://my-personal-blog-ivory.vercel.app/

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + Framer Motion
- React Router
- Dual-write storage (`src/lib/storage.ts`) — works offline; persists to Supabase when keys are set
- Vercel-ready (`vercel.json`)

## Backend (new)

| Path | Purpose |
|------|---------|
| `src/lib/storage.ts` | Dual-write: localStorage always + Supabase when env present |
| `src/lib/backend-types.ts` | Shared types (Inquiry, AgentRun, etc.) |
| `src/lib/ai-backend-hook.ts` | Persist agent / studio AI runs |
| `backend/sql/001_schema.sql` | Supabase schema + RLS |
| `backend/docs/BACKEND_SETUP.md` | Full setup guide |
| `backend/docs/INTEGRATION_CHECKLIST.md` | Step-by-step checklist |

### Quick backend enable

1. Create a free [Supabase](https://supabase.com) project.
2. Run `backend/sql/001_schema.sql` in the SQL Editor.
3. Add env vars (see `.env.example.backend`):

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # server only
```

Without keys the site behaves exactly as before (localStorage only).

## Features

- Dark / light theme
- Responsive design
- Blog with search & filtering
- Brain games
- Template designs gallery
- Contact / lead form (ready for dual-write)
- SEO helpers & structured data

## Development

```bash
git clone https://github.com/Souravsuvro/AI-Powered-Portfolio-Website.git
cd AI-Powered-Portfolio-Website
npm install
npm run dev
```

## Full source

This repository contains the backend foundation. To include the complete UI from the original portfolio:

```bash
git clone https://github.com/Souravsuvro/my-personal-blog.git tmp-portfolio
cp -r tmp-portfolio/src tmp-portfolio/public tmp-portfolio/package.json tmp-portfolio/vite.config.ts tmp-portfolio/tailwind.config.js tmp-portfolio/index.html tmp-portfolio/tsconfig*.json tmp-portfolio/vercel.json .
# keep the new src/lib/* backend files
npm install
```

Or connect both repos and merge as needed. **my-personal-blog was left completely unchanged.**

## Deploy

Push to `main` and connect the repo to Vercel. Add the Supabase env vars in the Vercel project settings when you are ready for durable persistence.
