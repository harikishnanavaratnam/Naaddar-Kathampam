# Naaddaar Kathampam — Build, Deployment & Go-Live Plan (v2)
### நாட்டார் கதம்பம் — கட்டமைப்பு, வெளியீடு மற்றும் நேரடி வெளியீட்டுத் திட்டம்

**Prepared for:** Naaddaar Kathampam (NGO / community cultural org)
**Model:** Developer-built once, volunteer-edited afterward — free hosting/software, one small yearly domain cost.
**Chosen stack:** Astro (frontend) · Sanity (CMS/admin panel) · Cloudflare Pages (hosting) · GitHub Org (code) · custom domain.
**Version:** v2 — corrected against a technical review verifying platform limits as of **22 Sep 2026**. See changelog at the end.

> **Editing-roles decision (important):** Sanity's **Free** plan provides only **Administrator** and **Viewer** roles — a scoped "Editor" role requires the paid Growth plan. To stay at $0, this plan gives the **2–4 trusted committee editors Administrator access** and compensates with strict governance and backups (below). This is a deliberate trade-off: it keeps the site free, at the cost of formal permission separation. If true role separation later becomes important, the options are Sanity **Growth** (~$15/editor/month) or switching to a git-based CMS (Keystatic/Decap).

---

## 0. Prerequisites for implementation

Have these in place before Phase 0, grouped so each can go to the right person.

**Developer machine:** Node.js 20 LTS or newer, npm (or pnpm), Git, VS Code, a modern browser, Sanity CLI (`npm i -g sanity`). Wrangler optional (Pages deploys from GitHub).

**Free accounts (all under the shared org email):** org Gmail; GitHub **Organization** (2FA on, 2+ owners); Sanity; Cloudflare; Web3Forms/Formspree; Bitwarden; a domain registrar account (**needs a payment method**).

**Builder skills:** JavaScript/TypeScript, Astro (components/routing/i18n), GROQ basics, Git/GitHub flow, basic DNS, CSS.

**Assets/content:** optimised web logo (done); colour vector SVG still outstanding (print/large-scale only, not blocking); the prototype as reference; the bilingual copy already written. Programme, Rules, gallery, timeline and bios come later via admins.

**Confirm before starting:** domain name chosen + availability/price checked (**the only hard blocker and only cost**); the 2–4 editors' emails (Sanity) + GitHub usernames; the contact-form recipient inbox; the repo location.

Everything except the domain is free and ~30–45 min to set up; the whole site can be built and previewed on a free `*.pages.dev` URL before the domain is bought.

---

## 1. Principles

- **Free to run.** Every component is free at community-org scale. The **only** cost is the domain name (a modest yearly fee — see §8/§11). No hosting, CMS, or SSL bills.
- **Build once, edit afterward.** You (developer) build and deploy. Committee members then add news, photos, events, bios and reorder lists in **Sanity Studio** — no code, no developer needed for content.
- **Frame first, content by admins.** Ship the working frame (all pages, design, admin panel) and let admins populate content through their control panel, using the dynamic/placeholder templates already designed (brief §6).
- **Bilingual, Tamil-first.** Every text field is a paired Tamil + English input; the site renders Tamil-first.
- **Static & resilient.** The public site is pre-built static files on Cloudflare's edge — fast on cheap phones, no live database to attack, and it scales well under traffic spikes.

---

## 2. Architecture at a glance

```
   ┌─────────────┐   edit content    ┌──────────────────┐
   │  Committee  │ ────────────────▶ │  Sanity Studio   │   (the admin
   │  (admins)   │   in browser      │  admin panel     │    control panel)
   └─────────────┘                   └───────┬──────────┘
                                             │ publish → content saved
                                             ▼
                                   ┌────────────────────┐
                                   │  Sanity Content     │  (hosted content store,
                                   │  Lake  — PUBLIC data │   public dataset — free tier)
                                   └───────┬─────────────┘
        you (developer)                    │ webhook on publish/delete
             │ git push                     ▼
             ▼                    ┌────────────────────┐   build   ┌───────────────┐
      ┌────────────┐   deploy     │  Cloudflare Pages  │ ───────▶  │  Static site  │
      │  GitHub Org │ ───────────▶ │  (build + host)    │           │  at your domain│
      │  repo       │              └────────────────────┘           └───────┬───────┘
      └────────────┘                                                        │
   contact form ─▶ Web3Forms/Formspree (free) ─▶ org inbox                   ▼
                                                              ┌────────────────────────┐
                                                              │  Visitors (phone/web)  │
                                                              └────────────────────────┘
```

**In words:** Admins edit in Sanity → publish (or delete) → a webhook triggers Cloudflare to rebuild the static site → live at your domain in ~1–2 min. You touch GitHub only for *design/feature* changes. The contact form posts to a free form service that emails your inbox — it does **not** go through Sanity.

---

## 3. The stack — role and real cost/limits

| Layer | Tool | Role | Cost / current free limits (verify at build) |
|---|---|---|---|
| Frontend | **Astro** | Builds the static bilingual site from components + Sanity content; native i18n. | Free (open-source) |
| CMS / admin | **Sanity** | The admin control panel: structured content, drag-reorder, paired Tamil/English fields, image uploads, draft/publish. | **Free plan** (as of 22 Sep 2026): up to **20 seats**, roles **Administrator + Viewer only**, **2 public datasets**, **10,000 documents**, **100 GB assets**, **100 GB/mo bandwidth**. Editor role = paid Growth. |
| Hosting / CDN | **Cloudflare Pages** | Builds + serves globally, free SSL, custom domain, auto-deploy from GitHub, preview URLs. | Free tier: unlimited static requests/bandwidth; build-count/concurrency caps apply — verify current numbers. |
| Code / CI trigger | **GitHub (Organization)** | Stores code; each push triggers a Cloudflare deploy; PR previews. | Free; org supports mandatory 2FA. |
| Domain | Registrar (e.g. Cloudflare Registrar) | Web address, e.g. `naaddaarkathampam.org`. | **Yearly fee — the only cost.** Depends on TLD/registry; **check availability + renewal price before buying.** |
| Contact form | **Web3Forms or Formspree (free tier)** | Receives the form POST and emails it to your inbox. A Cloudflare Pages Function is only an endpoint — it does **not** send email itself (Cloudflare's email *sending* is a paid Workers feature). | Free tier |
| Inbound email | **Cloudflare Email Routing** | Forwards `info@naaddaarkathampam.org` → a personal/shared inbox. **Inbound forwarding only — not for sending.** | Free |
| Analytics (optional) | **Cloudflare Web Analytics** | Visitor stats; privacy-focused, does not use cookies. | Free |

**On the limits:** for a community org these ceilings (10k documents, 100 GB assets/bandwidth) are almost certainly ample — but the plan states them as real numbers, not "unlimited." The one to actually watch is **asset bandwidth** if the gallery grows; keep videos as **YouTube embeds** so they never touch Sanity's quota.

---

## 4. Accounts & governance (all free, ~30–45 min)

Governance is where small-org sites live or die. Set this up deliberately:

1. **Shared org email** (e.g. `naaddaarkathampam@gmail.com`) — used as the **billing/recovery/contact** address on the accounts below. It is *not* the normal login identity for GitHub (see below).
2. **GitHub Organization**, not a personal repo. Each committee member/developer signs in with **their own personal GitHub account**; add them to the org with appropriate repo roles. Set **2+ organization owners** (continuity if one leaves) and **require 2FA org-wide** (GitHub Free supports this).
3. **Sanity** project — owner on the org email; invite the 2–4 trusted editors as **Administrators** (Free-tier limitation; keep this list short and trusted).
4. **Cloudflare** account — Pages hosting + (recommended) the domain, owned by the org email.
5. **Domain** — register after checking availability and renewal price.
6. **Contact-form service** (Web3Forms/Formspree) — free account; its access key lives in Cloudflare env vars, not in code or Sanity.
7. **Shared password manager** (Bitwarden free) owned by the org, with 2+ trusted members — holds every login. Losing the sole admin login is the #1 way NGO sites get orphaned.

---

## 5. Content model — the heart of the admin panel

Each design block (brief §3) becomes a Sanity **schema**, of two kinds:

- **Singletons** — one-of pages/settings edited in place.
- **Collections** — repeatable, reorderable lists.

**The 11 public pages** and how each is powered:

| # | Public page | Powered by |
|---|---|---|
| 1 | Home / முகப்பு | `home` (singleton) |
| 2 | About / பற்றி | `about` (singleton) + `timelineEntry[]` (collection) |
| 3 | Event Details / நிகழ்வு | `event` (**collection**, one doc per year; `isCurrent` flag) |
| 4 | Programme / நிரல் | programme rows **embedded inside the current `event`** (see below) |
| 5 | Participation & Registration / பங்கேற்பு | `participation` (singleton, rich text) |
| 6 | Rules & Guidelines / விதிமுறைகள் | `rules` (singleton, rich text) |
| 7 | Sponsors / அனுசரணை | `sponsor` (collection) + `sponsorTier` (collection) |
| 8 | Organising Committee / குழு | `committeeMember` (collection) |
| 9 | Gallery / படங்கள் | `galleryItem` (collection) |
| 10 | News & Updates / செய்திகள் | `newsPost` (collection) |
| 11 | Contact / தொடர்பு | `contact` (singleton) |
| — | Global (header/footer/nav) | `siteSettings` (singleton) |

**Bilingual rule:** every text field is an object `{ ta, en }`, rendered as two side-by-side inputs (Tamil first), via reusable `localeString` / `localeText` / `localeBlock` types.

### Schemas

| Schema | Type | Key fields (text = Tamil + English) | Admin can |
|---|---|---|---|
| `siteSettings` | singleton | logo, nav labels, footer, social links, public phone, toggle labels | edit |
| `home` | singleton | hero tagline, intro, quick links, references to featured news/gallery | edit |
| `about` | singleton | intro; founder (photo, name, bio); `timelineEntry[]` | edit |
| `timelineEntry` | collection | year, title, description, photo, **orderRank** | add / edit / reorder / delete |
| `event` | **collection** | name, date/time, venue, map, description, poster, PDF, **`isCurrent`**, **`programme[]`** | add per year, re-edit |
| ↳ `programme[]` | array *in* `event` | `{ time, item, performer, stage }` per row, drag-reorder | add / reorder / delete |
| `participation` | singleton | rich text (who/how/categories) | edit |
| `rules` | singleton | rich text | edit |
| `sponsorTier` | collection | tier name, **orderRank** | create tiers |
| `sponsor` | collection | name, logo, link, **`tier` → reference(`sponsorTier`)**, **orderRank** | add / edit / reorder |
| `committeeMember` | collection | photo, name, role, **orderRank** | add / edit / reorder |
| `galleryItem` | collection | image *or* YouTube URL, caption, album/category, optional `event` ref/year, **orderRank** | upload / caption / reorder |
| `newsPost` | collection | title, body, image, date, category, **draft/publish** | write / publish |
| `contact` | singleton | public phone, socials, address/map | edit |

**Corrected relationships (from review):**
- **Programme belongs to an event.** Programme rows are an **array embedded inside each `event` document** — so the 2026 programme lives on the 2026 event, 2027 on the 2027 event, with no ambiguity. (Alternative: a standalone `programmeRow` collection each with `event → reference(event)`; embedding is simpler and matches the design.) The Programme *page* renders the `programme[]` of the event flagged `isCurrent`.
- **Sponsor tier is a reference**, `sponsor.tier → reference(sponsorTier)`, not a free-text field — so tiers stay consistent and reorderable.

**Ordering:** use the `orderRankField` (drag-and-drop) plugin on every collection.

**Roles (Sanity Free reality):** the plan uses **Administrator** for the 2–4 trusted editors (Free tier has no scoped Editor). Mitigations: keep the editor list short and trusted; take regular dataset-export backups (§11); document what not to touch. Upgrade path to real separation = Growth plan or a git CMS, if ever needed.

**Private config stays out of Sanity.** Sanity Free datasets are **public**, so put nothing sensitive there. Public phone/address are fine; the **contact-form recipient email is NOT stored in Sanity** — it lives in a **Cloudflare environment variable / the form-service config**. Clean split: Sanity = public content; Cloudflare secrets = technical config.

**Images:** uploaded to Sanity's asset CDN, served responsively via Astro; gallery **videos are YouTube embeds** to protect the asset-bandwidth quota.

---

## 6. Build phases (developer runbook)

**Best-case estimate for an experienced developer working from the finished prototype: ~3–5 focused days of build**, but treat this as a *development estimate, not a firm schedule* — the real scope (11 pages, bilingual routing, full CMS schema, image handling, event/programme relations, gallery, form, SEO, deploy hooks, DNS, mobile QA, editor training) realistically spreads over 2–4 part-time weeks including review and content loading.

**Phase 0 — Setup.** Accounts + governance (§4). `npm create astro@latest`; add `@astrojs/sitemap`, i18n (ta default, `prefixDefaultLocale:false`), Sanity client, image handling. GitHub Org repo → connect Cloudflare Pages (build `npm run build`, output `dist/`). Confirm empty site deploys to `*.pages.dev`.

**Phase 1 — Design system.** Port tokens from the prototype (colours, fonts Catamaran/Playfair/Noto Sans Tamil/Inter, ribbon divider, cards, buttons) + the real logo.

**Phase 2 — Content model.** Build Sanity Studio: `locale*` types, all schemas (§5) including embedded `programme[]` and the `sponsorTier` reference, ordering plugin, the two roles. Deploy Studio (free at `*.sanity.studio` or under `admin.naaddaarkathampam.org`). Seed sample docs.

**Phase 3 — Pages wired to content.** Reusable Astro components + the 11 pages querying Sanity (GROQ). Nav = 6 primary + "More" dropdown. Language toggle wired to i18n.

**Phase 4 — Bilingual + polish.** i18n routing (`/` Tamil, `/en/…`), persistent toggle, hreflang, tasteful motion (as prototype; Framer Motion only inside React islands if wanted).

**Phase 5 — Forms, SEO, extras.** Contact form → Web3Forms/Formspree → org inbox, honeypot + the recipient key in Cloudflare env var. Sitemap, per-page bilingual meta/OG, favicon, robots.txt, Cloudflare Web Analytics.

**Phase 6 — QA.** Real cheap Android + desktop; both languages; Lighthouse ≥ 90; keyboard/focus; forms; and specifically test **publish → rebuild** *and* **delete/unpublish → rebuild** (§7).

**Phases 7–9 — deploy pipeline, domain/go-live, handover/training (below).**

---

## 7. Deployment pipeline (CI/CD)

Two automatic triggers:

1. **Code:** `git push` → Cloudflare Pages builds + deploys; each branch/PR gets a preview URL; `main` = live.
2. **Content:** Sanity **publish or delete** → Sanity **webhook** → Cloudflare **Deploy Hook** → rebuild → live in ~1–2 min.

**Webhook must be set up correctly (review fix):**
- Trigger on **create, update, and delete** for the relevant published document types — **including delete/unpublish**, so that removing a news post or committee member actually drops it from the static site (otherwise stale content lingers).
- **Filter to published documents only**; do **not** trigger on drafts (avoids needless rebuilds and draft leakage). Keep the filter as narrow as the document types that affect the site.
- Setup: Cloudflare Pages → *Deploy hooks* → create hook, copy URL → Sanity → *API → Webhooks* → point at that URL with the events/filter above.

**Environments:** a `production` dataset for the live site; optionally a `staging` dataset + preview branch for rehearsals (not required for launch).

---

## 8. Domain, DNS, HTTPS & email

1. **Register** the name (`.org` suits an NGO; consider also `.com`/`.lk`). **Check availability and the current renewal price first** — pricing varies by TLD/registry, so treat any figure as an estimate. Buying via Cloudflare Registrar keeps DNS with hosting at cost price.
2. **Point at Pages:** Cloudflare Pages → *Custom domains* → add apex + `www`; Cloudflare issues **free Universal SSL**.
3. **Canonical redirect** `www` ↔ apex.
4. **Inbound email (free):** Cloudflare **Email Routing** forwards `info@naaddaarkathampam.org` → the shared inbox. This is **forwarding of incoming mail only** — outbound/transactional sending (e.g. form confirmations) is handled by the form service (Web3Forms/Formspree), not by Email Routing.
5. **Hardening:** force HTTPS. Cloudflare provides **free DDoS protection and the Free Managed WAF Ruleset** by default (this is a subset of the paid WAF, but a solid baseline for a static site).

---

## 9. Going-live checklist

- [ ] Both languages on every page; toggle persists; Tamil-first.
- [ ] All 11 pages reachable; nav (6 + More) + mobile ☰ work.
- [ ] **Publish → rebuild** *and* **delete/unpublish → rebuild** both verified end-to-end.
- [ ] Editor list is 2–4 trusted Administrators; 2+ GitHub org owners; org-wide 2FA on.
- [ ] Contact form delivers to org inbox; recipient key in Cloudflare env var (not Sanity); honeypot on.
- [ ] Real logo everywhere; favicon; OG image looks right pasted into WhatsApp/Facebook.
- [ ] Sitemap + robots.txt; hreflang; bilingual titles/descriptions.
- [ ] Lighthouse ≥ 90 mobile perf + a11y.
- [ ] Branded 404.
- [ ] Analytics recording.
- [ ] All logins in the shared org password manager; domain **auto-renew ON**.
- [ ] YouTube gallery embeds work; images responsive/compressed.

Then add the custom domain, confirm HTTPS, announce.

---

## 10. Admin/editor workflow & training

One-page guide + a recorded 30-min screen-share covering: logging into the Studio; adding a **news post** (both languages, image, date → Publish → live in ~2 min); adding **event details** for the year (fill fields, tick `isCurrent`, upload poster/PDF); adding/reordering **committee, sponsors, gallery, programme rows** by dragging. Keep the recording in the shared drive so the next volunteer self-onboards. Note: because editors are Administrators, the training should be explicit about **what not to change** (project settings, schema, datasets).

---

## 11. Maintenance, backups & running cost

- **Running cost:** free hosting/software + **the domain's yearly fee** (the only line item; set auto-renew on the org's payment method, not a volunteer's personal card).
- **Backups:** code is in GitHub. Content lives in Sanity — export periodically with `sanity dataset export` (includes documents + asset binaries) and keep the file in the shared drive. A scheduled GitHub Action (free) can automate a monthly export; for a slowly-changing site, a manual quarterly reminder is also fine. **Backups double as the safety net** for the everyone-is-Administrator model.
- **Updates:** dependency bumps every few months (`npm update`, redeploy). Static site = minimal attack surface, no WordPress-style patching treadmill.
- **Availability (accurate framing):** the static architecture greatly reduces server-side failure and scales well for traffic spikes, but **it is not zero-downtime** — availability still depends on Cloudflare, DNS, deployments, and third-party services (Sanity, the form service). Bad builds, DNS/domain issues, or a Cloudflare incident can still cause an outage.
- **The real risk is people, not tech:** logins concentrated in one person. Mitigations are all above — org email owns accounts, 2+ owners, shared password manager, domain auto-renew, recorded training.

---

## 12. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Everyone-is-Administrator (Sanity Free) lets an editor change settings/schema | Medium | Keep editors to 2–4 trusted people; training on what not to touch; regular dataset-export backups; upgrade to Growth/git-CMS if separation becomes essential |
| Single volunteer holds all logins, then leaves | High for NGOs | Org email owns accounts; 2+ GitHub org owners; shared password manager |
| Domain lapses | Medium | Auto-renew on; org payment method; calendar reminder |
| Asset bandwidth on Sanity Free | Low–Med | Videos via YouTube; compress on upload; Cloudflare caches served assets |
| Stale content after delete | Medium | Webhook fires on delete/unpublish → rebuild (verified in QA) |
| Free tiers change terms | Low | Components are swappable (Keystatic/Decap could replace Sanity; Netlify could replace Cloudflare) |
| Outage from Cloudflare/DNS/build/third-party | Low–Med | Preview deploys before promoting; keep last-good build; monitor; don't promise 100% uptime |

---

## 13. Immediate next steps

1. **You:** check domain availability + renewal price, then register; create the free accounts + governance (§4).
2. **You / me:** scaffold the starter repo — Astro project, `locale*` types, all §5 schemas (embedded `programme[]`, `sponsorTier` reference), base components ported from the prototype — so you begin at Phase 2/3.
3. **Committee:** gather content admins will enter — programme, rules text, gallery photos, full history timeline, bios.

> Want me to generate the **starter repo** next (Astro + the corrected Sanity schemas + base components)? That turns this plan into a running frame you can deploy.

---

## 14. Repository directory structure

A single Git repo (monorepo) with two packages: **`web/`** (the Astro site Cloudflare Pages builds) and **`studio/`** (the Sanity admin panel, deployed separately with `sanity deploy`). This keeps code and content-model versioned together while deploying independently.

```
naaddaar-kathampam/
├─ README.md                     # setup, env vars, deploy notes
├─ .gitignore
├─ .env.example                  # documents required env vars (no secrets committed)
├─ package.json                  # npm workspaces root: ["web","studio"]
│
├─ web/                          # ── Astro frontend → deployed by Cloudflare Pages ──
│  ├─ astro.config.mjs           # integrations + i18n (ta = default, prefixDefaultLocale:false; en = /en/…)
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ public/                    # served as-is (no build step)
│  │  ├─ favicon.svg
│  │  ├─ logo.webp               # optimised logo (the 140 KB web version)
│  │  ├─ og-default.jpg          # social-share image
│  │  └─ robots.txt
│  └─ src/
│     ├─ styles/
│     │  ├─ tokens.css           # locked palette + type scale (the design system)
│     │  └─ global.css
│     ├─ lib/
│     │  ├─ sanity.ts            # Sanity client (projectId, dataset, useCdn)
│     │  ├─ queries.ts           # GROQ queries per page / collection
│     │  ├─ image.ts             # @sanity/image-url responsive-image helper
│     │  └─ i18n.ts              # locale config + t(field, lang) for {ta,en}
│     ├─ layouts/
│     │  └─ Base.astro           # <head>, fonts, theme, Header + Footer, SEO slot
│     ├─ components/
│     │  ├─ Header.astro         # nav (6 primary + "More" dropdown)
│     │  ├─ Footer.astro
│     │  ├─ LanguageToggle.astro # அ / அ-A / A
│     │  ├─ SEO.astro            # per-page meta/OG + hreflang (ta ↔ en)
│     │  ├─ Hero.astro
│     │  ├─ RibbonDivider.astro
│     │  ├─ Card.astro
│     │  ├─ QuickLinks.astro
│     │  ├─ Countdown.astro
│     │  ├─ Timeline.astro       # about — timelineEntry[]
│     │  ├─ ScheduleTable.astro  # programme — event.programme[]
│     │  ├─ SponsorTiers.astro   # sponsors grouped by sponsorTier
│     │  ├─ CommitteeGrid.astro
│     │  ├─ GalleryGrid.astro    # images + YouTube embeds + lightbox
│     │  ├─ NewsCard.astro
│     │  └─ ContactForm.astro    # POSTs to Web3Forms/Formspree (key from env)
│     ├─ page-sections/          # one component per page's body (lang-agnostic)
│     │  ├─ HomePage.astro       # …so the /en mirror reuses these, no markup duplication
│     │  ├─ AboutPage.astro
│     │  ├─ EventPage.astro
│     │  ├─ ProgrammePage.astro
│     │  ├─ ParticipationPage.astro
│     │  ├─ RulesPage.astro
│     │  ├─ SponsorsPage.astro
│     │  ├─ CommitteePage.astro
│     │  ├─ GalleryPage.astro
│     │  ├─ NewsListPage.astro
│     │  ├─ NewsPostPage.astro
│     │  └─ ContactPage.astro
│     └─ pages/                  # routes — thin wrappers that pass lang to page-sections/
│        ├─ index.astro          # Home            (Tamil, no prefix)
│        ├─ about.astro
│        ├─ event.astro
│        ├─ programme.astro
│        ├─ participation.astro
│        ├─ rules.astro
│        ├─ sponsors.astro
│        ├─ committee.astro
│        ├─ gallery.astro
│        ├─ news/
│        │  ├─ index.astro
│        │  └─ [slug].astro      # single news post
│        ├─ contact.astro
│        ├─ 404.astro
│        └─ en/                  # English mirror (each file is a 2-line wrapper → lang="en")
│           ├─ index.astro
│           ├─ about.astro
│           ├─ … (same set as above)
│           └─ news/{index,[slug]}.astro
│
├─ studio/                       # ── Sanity Studio (the admin control panel) ──
│  ├─ sanity.config.ts           # projectId, dataset, plugins (orderRank, vision)
│  ├─ sanity.cli.ts
│  ├─ package.json
│  ├─ structure/
│  │  └─ deskStructure.ts        # pin singletons; collections shown as orderable lists
│  └─ schemas/
│     ├─ index.ts                # schema registry
│     ├─ objects/
│     │  ├─ localeString.ts      # { ta, en } — the bilingual field primitives
│     │  ├─ localeText.ts
│     │  ├─ localeBlock.ts       # bilingual rich text
│     │  ├─ programmeRow.ts      # embedded in event.programme[]
│     │  └─ link.ts
│     ├─ singletons/
│     │  ├─ siteSettings.ts      # logo, nav labels, footer, socials, phone
│     │  ├─ home.ts
│     │  ├─ about.ts             # + timelineEntry[]
│     │  ├─ participation.ts
│     │  ├─ rules.ts
│     │  └─ contact.ts           # public phone/socials/address only (NO recipient email)
│     └─ collections/
│        ├─ timelineEntry.ts     # orderRank
│        ├─ event.ts             # date/venue/poster/PDF + isCurrent + programme[]
│        ├─ sponsorTier.ts       # orderRank
│        ├─ sponsor.ts           # tier → reference(sponsorTier), orderRank
│        ├─ committeeMember.ts   # orderRank
│        ├─ galleryItem.ts       # image | youtubeUrl, album, year, orderRank
│        └─ newsPost.ts          # draft/publish, date, category
│
└─ docs/
   ├─ naaddaar-build-deploy-plan.md   # this document
   ├─ design-brief-v2.md
   └─ editor-guide.md                 # one-page admin/editor training (§10)
```

**Environment variables** (in `.env.example`, real values set in Cloudflare Pages → Settings → Environment variables — never committed):

```
PUBLIC_SANITY_PROJECT_ID=xxxxxxxx      # public (read-only content)
PUBLIC_SANITY_DATASET=production
PUBLIC_WEB3FORMS_KEY=xxxxxxxx          # form access key; recipient email is set in the Web3Forms dashboard, not here
# Cloudflare "Deploy hook" URL is stored in Sanity's webhook config, not in the repo
```

**Two notes on the layout:**
- **No translated-markup duplication.** The real page bodies live once in `src/page-sections/`; the `pages/` and `pages/en/` files are thin route wrappers that just pass `lang="ta"` or `lang="en"`. Translated *content* comes from Sanity's `{ta,en}` fields, so you never maintain two copies of a layout.
- **`web/` is the Cloudflare Pages build root** (build `npm run build`, output `web/dist`); **`studio/` deploys separately** to `*.sanity.studio` (or `admin.naaddaarkathampam.org`) and is never part of the public site bundle.

---

## Changelog — v2 (corrections from technical review, 22 Sep 2026)

1. **Sanity roles corrected** — Free = Administrator + Viewer only (no scoped Editor). Resolution: trusted editors as Administrators + governance/backups; noted Growth/git-CMS upgrade paths.
2. **Real limits stated** — 20 seats, 2 public datasets, 10,000 documents, 100 GB assets, 100 GB/mo bandwidth (not "unlimited").
3. **Content model made consistent** — `event` is a collection; `participation` powers the Registration page; all 11 public pages listed explicitly.
4. **Programme tied to event** — programme rows embedded in each `event` (alt: reference); `sponsor.tier` is now a reference to `sponsorTier`.
5. **Webhook corrected** — fires on create/update/**delete**, published-docs only, narrow filter, no draft triggers; delete/unpublish → rebuild.
6. **Contact form architecture fixed** — form → Web3Forms/Formspree → inbox; a Pages Function is only an endpoint, Cloudflare email *sending* is paid.
7. **Email row corrected** — Cloudflare Email Routing = inbound forwarding only, not transactional sending.
8. **Private config out of Sanity** — form-recipient email in Cloudflare env var; Sanity dataset is public, public content only.
9. **GitHub ownership** — Organization + individual accounts + 2+ owners + mandatory 2FA; org email as billing/recovery only.
10. **"Can't go down" softened** — availability depends on Cloudflare/DNS/deploys/third-parties; not zero-downtime.
11. **WAF wording** — "free DDoS protection + Free Managed WAF Ruleset," not the full paid WAF.
12. **Analytics wording** — "privacy-focused, no cookies"; dropped the jurisdiction-specific cookie-banner legal claim.
13. **Domain cost** — estimate only; check availability + current renewal price before purchase.
14. **Timeline** — 3–5 days framed as best-case development effort, not a firm schedule.
15. **Added §14 repository directory structure** — Astro `web/` + Sanity `studio/` monorepo mapped to the §5 schemas, with env-var and no-duplication notes.
