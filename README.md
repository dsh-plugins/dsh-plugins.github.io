# dsh-plugins.github.io

Official website for the [dsh-plugins](https://github.com/dsh-plugins) organization —
open-source plugins for [DeepSeek Harness](https://deepseek-harness.github.io/deepseek-harness/).

🌐 **https://dsh-plug.in** (GitHub Pages + custom domain)

## Stack

- [Vite](https://vite.dev/) 7 · [Vue](https://vuejs.org/) 3.5 · TypeScript 5.9
- No UI framework — hand-rolled design system (CSS custom properties)
- Hand-rolled i18n (zh-CN primary / en), persisted in `localStorage`

## Development

```bash
pnpm install     # pnpm 11+; builds approved via pnpm-workspace.yaml
pnpm dev         # http://localhost:5173
pnpm build       # vue-tsc type-check + vite build → dist/
pnpm preview     # serve the production build
```

> `?preview=1` renders every scroll-reveal section immediately (used for
> screenshots / design reviews).

## Project structure

```
├── public/                 # copied verbatim into dist/
│   ├── CNAME               # dsh-plug.in (custom domain)
│   ├── .nojekyll           # skip GitHub Pages Jekyll processing
│   ├── favicon-32.png       # favicon 32px (org avatar)
│   ├── favicon-180.png      # favicon / apple-touch-icon 180px
│   ├── logo-avatar.png      # navbar brand mark (org avatar)
│   ├── org-avatar.png       # org avatar source (460×460)
│   ├── logo.svg             # brand mark (full)
│   └── og.png               # Open Graph banner (1200×630)
├── scripts/og/             # OG banner sources + regeneration
│   ├── og.html             # composed banner (art + type)
│   ├── og-bg.jpg           # cropped/compressed art (1200×630)
│   └── art-source.png      # original AI art (1792×1024)
├── src/
│   ├── styles/             # tokens.css (design system) + base.css
│   ├── i18n/               # zh.ts / en.ts / index.ts (reactive lang)
│   ├── data/plugins.ts     # plugin metadata (sourced from the GitHub org)
│   └── components/         # sections + ui/ primitives
└── index.html              # meta + Open Graph/Twitter tags
```

## Deployment

The site is served by GitHub Pages from the `main` branch root:

1. `pnpm build` and commit `dist/` **contents** to the repo root
   (or use a Pages workflow with `vite build` → deploy `dist/`).
2. The `CNAME` file (`dsh-plug.in`) is committed at the root so Pages
   publishes the custom domain.
3. Point `dsh-plug.in` at the Pages host per GitHub's custom-domain docs,
   then enable **Enforce HTTPS**.

Content is generated from the live GitHub org (repos, versions, licenses) —
update `src/data/plugins.ts` and the i18n dictionaries as plugins evolve.

## Automated feeds

Two workflows keep the static API snapshots fresh. Both write with
`GITHUB_TOKEN`, which does not cascade into `deploy.yml`, so each workflow
performs its own Pages deploy.

| Feed | URL | Source | Trigger |
| --- | --- | --- | --- |
| Plugin market | `/api/plugins.json` | `dsh-plugin-market` repo | `repository_dispatch`, manual |
| DSH news | `/api/news.md` | hand-maintained gist | hourly cron (`sync-news.yml`) |

The news feed mirrors
[DSH_NEWS.md](https://gist.github.com/Gu-ZT/f08daa33afb82f4b375e604039b92742#file-dsh_news-md)
into `public/api/news.md`. `scripts/sync-news.mjs` downloads the gist, rejects
responses that are empty, oversized, not UTF-8, or missing the expected
Markdown headings, and normalizes line endings. When the content is unchanged
the script reports `changed=false`, and the workflow skips the commit, build
and deploy entirely.

```bash
node scripts/sync-news.mjs   # run locally to preview the snapshot
```

## Regenerating the OG banner

```powershell
# 1. update scripts/og/og.html with new copy
# 2. re-render with headless Edge:
msedge --headless=new --disable-gpu --force-device-scale-factor=1 `
  --window-size=1200,630 --virtual-time-budget=6000 `
  --user-data-dir="$env:TEMP\edge-og" `
  --screenshot="public/og.png" "file:///…/scripts/og/og.html"
```

## License

Site content © 2026 dsh-plugins organization. The plugins themselves are
licensed separately (see `src/data/plugins.ts`): LGPL-3.0, BSD-3-Clause,
MIT and GPL-3.0.
