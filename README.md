# Naaddaar Kathampam — website

Monorepo: **`web/`** (Astro static site) + **`studio/`** (Sanity admin panel).
Free stack: Astro · Sanity · Cloudflare Pages · GitHub. Full plan in `docs/naaddaar-build-deploy-plan.md`.

## What's already built

- All 11 public pages + a 404, bilingual (Tamil-first), styled to the brand, with the real logo.
- A working **language toggle** (அ / அ‑A / A), responsive nav (6 primary + "More"), hero countdown, gallery, contact form.
- The complete **Sanity content model** (all schemas from plan §5): bilingual `locale*` fields, singletons, orderable collections, `event.programme[]`, `sponsor.tier` reference.
- Runs **immediately from local placeholder content** (`web/src/data/content.ts`) — no Sanity project needed to see the site.

> **v1 i18n note:** this build renders both languages and switches them with a client-side toggle (identical UX to the approved prototype). SEO-friendly split routing (`/` + `/en/…`) is a documented future enhancement — see plan §14.

## Prerequisites

Node.js 20 LTS+, npm, Git. (Sanity CLI `npm i -g sanity` only if you deploy the Studio.) Full list in plan §0.

## Run locally

```bash
npm install            # installs web + studio workspaces
npm run dev            # Astro site → http://localhost:4321
npm run studio         # Sanity Studio (after studio is configured) → http://localhost:3333
```

Only need the site? `npm install --workspace web && npm run dev`.

## Environment variables

Copy `.env.example` → `.env` (and `studio/.env.example` → `studio/.env`). All optional to *run*; needed to go live.

| Var | Where | Purpose |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | web / Cloudflare | Read content from Sanity (blank = use local placeholder content) |
| `PUBLIC_SANITY_DATASET` | web / Cloudflare | Usually `production` |
| `PUBLIC_WEB3FORMS_KEY` | web / Cloudflare | Contact-form key (recipient email is set in the Web3Forms dashboard, **not** here) |
| `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` | studio | Your Sanity project |

## Connect the CMS (when ready)

1. `cd studio && npx sanity init` (create/link a project), set `studio/.env`.
2. `npm run studio`, add content, deploy it: `npx sanity deploy` (→ `*.sanity.studio`).
3. In `web/.env` set `PUBLIC_SANITY_PROJECT_ID` + dataset.
4. Fill the fetch/map in `web/src/lib/getContent.ts` (GROQ is ready in `web/src/lib/queries.ts`). Until then the site uses local content as a safe fallback.

## Deploy (Cloudflare Pages)

- Push to a GitHub **Organization** repo.
- Cloudflare Pages → connect the repo. Build command `npm run build`, **build output `web/dist`**, root `/`.
- Add the env vars above in Pages settings.
- Content auto-rebuild: Sanity webhook → Cloudflare Deploy Hook (fire on create/update/**delete**, published docs only). See plan §7.
- Custom domain + HTTPS + email: plan §8. Going-live checklist: plan §9.

## Editors

Non-technical committee members use the Sanity Studio — see `docs/editor-guide.md`. On Sanity's free plan, trusted editors are **Administrators** (keep the list short; back up with `sanity dataset export`). Plan §5/§11.
