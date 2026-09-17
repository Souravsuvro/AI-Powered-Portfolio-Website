# Backend Integration Checklist

## You do these 2 steps (account required)

### 1. Supabase project + schema
1. https://supabase.com → New project (free tier is fine).
2. Project Settings → API → copy **Project URL** and **anon public** key.
3. Project Settings → API → copy **service_role** key (keep secret).
4. SQL Editor → New query → paste entire contents of `backend/sql/001_schema.sql` → Run.

### 2. Environment variables
- Local: copy `.env.example.backend` values into `.env.local`.
- Vercel: Project → Settings → Environment Variables → add the same three keys for Production + Preview.

---

## Code already in this repo

| File | Role |
|------|------|
| `src/lib/storage.ts` | Dual-write storage |
| `src/lib/backend-types.ts` | Types |
| `src/lib/ai-backend-hook.ts` | Persist agent runs |
| `backend/sql/001_schema.sql` | Schema + RLS |

## Optional: full UI from my-personal-blog

```bash
git clone https://github.com/Souravsuvro/my-personal-blog.git tmp
cp -r tmp/src tmp/public tmp/package.json tmp/vite.config.ts tmp/tailwind.config.js tmp/index.html tmp/tsconfig*.json tmp/vercel.json tmp/postcss.config.js .
# Keep the new src/lib/* backend files if prompted
npm install
npm run dev
```

**my-personal-blog was left completely unchanged.**

## Verify

- [ ] Without env vars → contact form still works (localStorage).
- [ ] With env vars → row appears in Supabase `inquiries`.
- [ ] Rate limiting still protects AI spend.
