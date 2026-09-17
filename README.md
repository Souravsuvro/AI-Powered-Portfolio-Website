# AI Powered Portfolio Website

Production-ready portfolio for **Sourav Sarker Suvra** with dual-write backend (localStorage + optional Supabase).

- **This repo:** https://github.com/Souravsuvro/AI-Powered-Portfolio-Website
- **Original UI (unchanged):** https://github.com/Souravsuvro/my-personal-blog
- **Live:** https://my-personal-blog-ivory.vercel.app/

## Already in this repository

### Backend (complete)
| Path | Purpose |
|------|---------|
| `src/lib/storage.ts` | Dual-write localStorage + Supabase |
| `src/lib/backend-types.ts` | Types |
| `src/lib/ai-backend-hook.ts` | Persist agent runs |
| `backend/sql/001_schema.sql` | Schema + RLS |
| `backend/docs/` | Setup + checklist |
| `.env.example` | Env template |

### App shell (pushed)
- Config: `package.json`, `vite.config.ts`, `tsconfig*`, `vercel.json`, `postcss.config.js`, `.gitignore`
- Entry: `index.html`, `src/main.tsx`, `src/App.tsx`
- Router: `src/router/AppRouter.tsx`, `ScrollToTop.tsx`
- Layout: `Layout`, `Loader`, `Navbar`, `Footer`
- Contexts: `ThemeContext`, `ScrollContext`
- Pages: `Home`, `NotFound`
- Utils: `formatDate`, `responsiveUtils`, `sitemap-generator`

## Finish full UI (one block)

Large components, blog data, CSS, Tailwind config, and all `public/` assets still need to be copied once from the original repo (**my-personal-blog is not modified**):

```bash
git clone https://github.com/Souravsuvro/AI-Powered-Portfolio-Website.git
cd AI-Powered-Portfolio-Website
git clone --depth 1 https://github.com/Souravsuvro/my-personal-blog.git /tmp/mpb

mkdir -p src/components src/pages src/data public
cp -n /tmp/mpb/src/components/*.tsx src/components/ 2>/dev/null || true
cp -n /tmp/mpb/src/pages/*.tsx src/pages/ 2>/dev/null || true
cp -rn /tmp/mpb/src/data src/
cp /tmp/mpb/src/index.css src/
cp /tmp/mpb/tailwind.config.js .
cp -rn /tmp/mpb/public/* public/

npm install
npm run dev
```

(`cp -n` keeps files already present in this repo, such as Navbar/Footer/Layout.)

## Enable Supabase (optional)

1. Create a free project at https://supabase.com  
2. Run `backend/sql/001_schema.sql` in the SQL Editor  
3. Set:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # server only
```

Without keys the site uses localStorage only.

## Deploy

Connect this repo to Vercel, add env vars when ready, deploy from `main`.
