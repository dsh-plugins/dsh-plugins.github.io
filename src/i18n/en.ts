/* ============================================================
   dsh-plugins · English copy
   ============================================================ */

import type { Dict } from './zh'

export const en: Dict = {
  nav: {
    plugins: 'Plugins',
    market: 'Market',
    features: 'Features',
    install: 'Install',
    ecosystem: 'Ecosystem',
    about: 'About',
    join: 'Join Us',
    github: 'GitHub Org',
    lang: '中文',
    langTitle: '切换到中文',
  },

  market: {
    eyebrow: 'Plugin Market',
    title: 'Plugin Market',
    lead: 'A live catalog aggregated from dsh-plugin-market — search, browse, and click a card to open its homepage (or its repository when there is no homepage).',
    searchPlaceholder: 'Search plugins by name, id or description…',
    loading: 'Loading plugins…',
    error: 'Failed to load plugins',
    empty: 'No plugins match your search',
    supports: 'Supports',
    depends: 'Depends on',
    conflicts: 'Conflicts with',
    repo: 'Repository',
    issues: 'Issues',
    supportTitle: 'Supported dsh versions',
  },

  hero: {
    status: 'Deep diving...',
    eyebrow: 'open source · for DeepSeek Harness',
    titleA: 'Plug into',
    titleB: 'plugins that ride through every DSH upgrade',
    sub: 'dsh-plugins is an open-source plugin organization for DeepSeek Harness (DSH). Built on dsh-loader\'s stable API, we ship small, sharp plugins around the model seam and the Web UI — model routing, command review, code review, animated status buddies. Plug in, and keep working through every DSH upgrade.',
    ctaPlugins: 'Browse plugins',
    ctaGithub: 'GitHub Org',
    terminal: {
      tabAux: 'dsh-auxiliary',
      tabBuddy: 'dsh-thought-buddy',
      prompt: 'dsh',
      cmdAux: 'dsh plugin add @dsh-plugin/dsh-auxiliary',
      cmdBuddy: 'dsh plugin add @dsh-plugin/dsh-thought-buddy',
      line1: '✓ plugin installed · routes registered',
      line2: '✓ 7 open-source plugins · zero core changes',
    },
  },

  stats: {
    plugins: 'Open-source repos',
    packages: 'npm packages',
    routes: 'Model routes',
    deps: 'Runtime deps (buddy)',
  },

  plugins: {
    eyebrow: 'plugins',
    title: 'Plug in. Each one does one thing.',
    lead: 'A toolbox of small, sharp plugins around the model seam and the Web UI — model routing, command review, code review, a sidebar, a compatibility layer. Each one does exactly one thing, thoroughly.',
    viewRepo: 'Repository',
    viewNpm: 'npm',
    version: 'v',
    auxiliary: {
      name: 'dsh-auxiliary',
      tag: 'TypeScript · LGPL-3.0',
      tagline: 'Auxiliary model routing: vision, compaction, approvals, subagents, titles and image generation — each on its own model.',
      desc: 'Layers auxiliary-model capabilities on the DSH LLM seam (ctx.llm). Each feature is an independent, optional route that only fires for its own narrow call category — the main conversation model is never touched.',
      features: [
        { icon: 'eye', title: 'Vision understanding', desc: 'The inspect_image tool: read a local image, ask a vision model' },
        { icon: 'swap', title: 'Image handoff', desc: 'Text-only main models can still send chat images via text references' },
        { icon: 'stack', title: 'Context compaction', desc: 'Summaries run on a dedicated cheap, fast model' },
        { icon: 'shield', title: 'Approval routing', desc: 'A dedicated lightweight model for approve-for-me reviews' },
        { icon: 'fork', title: 'Subagent routing', desc: 'Delegated children share one route to control cost' },
        { icon: 'hash', title: 'Session titles', desc: 'Title-generation calls routed to a fast model' },
        { icon: 'image', title: 'Image generation', desc: 'generate_image talks to an OpenAI-compatible images API' },
        { icon: 'sparkle', title: 'Model capability marks', desc: 'Mark models "allow image input / image generation" in the catalog' },
      ],
    },
    buddy: {
      name: 'dsh-thought-buddy',
      tag: 'TypeScript · BSD-3-Clause',
      tagline: 'A GrokBot-style animated avatar with a synchronized typewriter status line, right in front of "Deep diving...".',
      desc: 'A pure client-side plugin: while the model works, the "Deep diving..." pill grows a tiny Grok-style robot — it blinks, swaps expressions with a springy morph, wanders its gaze and gently bobs. All drawn live as SVG via requestAnimationFrame, zero runtime dependencies.',
      features: [
        { icon: 'robot', title: 'GrokBot avatar', desc: '25 expressions × 2 eyes × 48-point eye rings, springy morphs' },
        { icon: 'type', title: 'Expression-synced typewriter', desc: 'Each expression switch rewrites the status text, char by char' },
        { icon: 'emoji', title: 'Emoji mode', desc: 'Falls back to cycling emoji: 🤿 🫧 🌊 🐙 🔍 🧠 💭' },
        { icon: 'theme', title: 'Theme aware', desc: 'Follows prefers-color-scheme with light & dark palettes' },
        { icon: 'motion', title: 'Reduced motion', desc: 'Respects prefers-reduced-motion, eases breathing and sway' },
      ],
    },
    loader: {
      name: 'dsh-loader',
      tag: 'TypeScript · LGPL-3.0',
      tagline: 'A version-aware runtime compatibility layer: dsh upgrades, plugins keep working.',
      desc: 'A runtime compatibility shim for dsh (DeepSeek Harness) cordis bundle plugins. Through a version-aware adapter registry it decouples third-party plugins from dsh\'s internal service names, module paths, package names and RPC details — when dsh upgrades and breaks internal APIs, you only upgrade dshloader and plugins keep working unchanged.',
      features: [
        { icon: 'route', title: 'Stable API', desc: 'ctx.dshLoader on the host, window.__dshLoader__ in the browser, stable subpaths for package imports' },
        { icon: 'shield', title: 'Service escape hatch', desc: 'ctx.dshLoader.services.get() reaches real cordis services on demand' },
        { icon: 'file', title: 'Zero @deepseek-ai/* deps', desc: 'Every dsh package is reached through the loader\'s stable subpaths' },
        { icon: 'hash', title: 'Version aware', desc: 'Adapts per version, absorbing internal renames (httpServer → webServer)' },
        { icon: 'zap', title: 'Upgrade-proof', desc: 'A dsh upgrade only needs a dshloader upgrade — plugins stay untouched' },
      ],
    },
    approve: {
      name: 'dsh-approve-for-me',
      tag: 'JavaScript · MIT',
      tagline: 'Codex-style auto-review of commands plus an "Approve For Me" sandbox option, with a live review status bar in the Web GUI.',
      desc: 'An all-in-one package (host + browser UI): it registers an approval answerer that auto-resolves command-approval prompts by mode — rule auto / full-auto / deny never, a lightweight-model review of permission escalations, and adds the approve-for-me and strict-review permission presets to the GUI.',
      features: [
        { icon: 'shield', title: 'Auto-review', desc: 'Rule-based auto, full-auto, and deny-never modes' },
        { icon: 'eye', title: 'Lightweight-model review', desc: 'A review model rules on permission escalations or every tool call (ported from codex guardian)' },
        { icon: 'alert', title: 'Fail closed', desc: 'Timeout / LLM failure / unparseable output → deny by default' },
        { icon: 'check', title: 'Permission presets', desc: 'approve-for-me and strict-review, selectable from the GUI' },
        { icon: 'zap', title: 'Circuit breaker', desc: 'Too many consecutive denials hands control back to a human' },
      ],
    },
    review: {
      name: 'dsh-code-review',
      tag: 'JavaScript · GPL-3.0',
      tagline: 'Turn-by-turn code-change review: Codex-style summary, resizable diff sidebar, guarded undo.',
      desc: 'A community Web plugin that adds a "changes" utility to finished turns: a change summary, a draggable diff sidebar, a workspace-relative file tree, syntax highlighting and guarded undo for safe iteration in a shared workspace.',
      features: [
        { icon: 'git', title: 'Turn-level review', desc: 'See added/removed totals, open a turn, jump between changed files without leaving the chat' },
        { icon: 'file', title: 'Diff & file tree together', desc: 'Unified diff on the left, searchable file tree on the right, draggable persisted divider' },
        { icon: 'edit', title: 'Syntax-aware diffs', desc: 'Shiki tokenizing keeps multiline comments and strings in grammar state' },
        { icon: 'undo', title: 'Guarded undo', desc: 'Snapshots + version guards + before/after chains, refusing ambiguous, stale or active changes' },
        { icon: 'layout', title: 'Large & practical', desc: 'Breaks the 520px cap; collapses navigation on narrow windows' },
      ],
    },
    sidebar: {
      name: 'dsh-better-sidebar-loader',
      tag: 'TypeScript · MIT',
      tagline: 'A VSCode-style right sidebar (explorer/editor/terminal/git/browser) whose host half only goes through ctx.dshLoader.',
      desc: 'A transcription of dsh-better-sidebar onto dshloader\'s stable API: the host half reaches dsh services ONLY through ctx.dshLoader with zero direct service access and zero @deepseek-ai/* runtime imports; the client half reuses the official client unchanged, mounted via dsh.client.inject.',
      features: [
        { icon: 'layout', title: 'VSCode-style sidebar', desc: 'explorer / editor / terminal / git / browser' },
        { icon: 'route', title: 'dshLoader only', desc: 'The host injects only dshLoader, reaching services over its stable API' },
        { icon: 'shield', title: 'Zero runtime imports', desc: 'No @deepseek-ai/* runtime imports; only dsh-loader as a dsh dependency' },
        { icon: 'box', title: 'Client reuse', desc: 'The official client is reused unchanged through dsh.client.inject' },
        { icon: 'zap', title: 'Upgrade-ready', desc: 'Internal service renames don\'t break the plugin (adapter registry)' },
      ],
    },
    stable: {
      name: 'dsh-stable-web-prompt',
      tag: 'JavaScript · MIT',
      tagline: 'Normalizes the port-dependent local URL in the dsh-web-app system prompt and moves it to the end, so changing the port no longer changes the prompt-cache prefix.',
      desc: 'Normalizes the port-dependent local URL in the system prompt and moves it to the end of the prompt block, so changing the web port no longer changes the prompt-cache prefix and the prompt cache stays stable.',
      features: [
        { icon: 'hash', title: 'Stable cache prefix', desc: 'Port changes no longer change the prompt-cache prefix' },
        { icon: 'swap', title: 'Normalize the local URL', desc: 'Normalizes the port-dependent local URL in the system prompt' },
        { icon: 'zap', title: 'Moved to the end', desc: 'Moves that URL to the end of the prompt, isolating its effect on the cache' },
      ],
    },
  },

  features: {
    eyebrow: 'dsh-loader deep-dive',
    title: 'One stable API, through every DSH upgrade',
    lead: 'dsh-loader is the foundation of the org: a version-aware adapter registry that decouples plugins from dsh\'s internal service names, module paths, package names and RPC details. Plugins program only against a stable API, so no matter how dsh changes internally, they keep working.',
    how: 'How it works',
    howText: 'Plugins reach the host only through ctx.dshLoader, the browser only through window.__dshLoader__ and stable subpaths; every call maps to dsh\'s current real services through the version-aware adapter registry. When a dsh upgrade breaks an internal API, you only upgrade dshloader and the plugins work unchanged — zero core changes.',
  },

  install: {
    eyebrow: 'install',
    title: 'Two commands, installed by your agent',
    lead: 'Copy the block below and paste it to your DSH agent (the assistant in the web GUI). The agent performs the install and verification for you — no manual npm or profile editing.',
    steps: [
      { title: 'Copy the command', desc: 'Pick a plugin, hit copy, paste it to your DSH agent.' },
      { title: 'The agent installs', desc: 'It runs dsh plugin add and verifies build artifacts and the bundle patch.' },
      { title: 'Configure & use', desc: 'auxiliary: Settings → Auxiliary Models. buddy: restart dsh web, then refresh.' },
    ],
    copy: 'Copy',
    copied: 'Copied ✓',
    note: 'Note: for auxiliary, configure providers/models in Settings → Models first, then pick routes in Auxiliary Models. thought-buddy is configured entirely through localStorage — no settings page.',
  },

  ecosystem: {
    eyebrow: 'ecosystem',
    title: 'Growing inside the DSH ecosystem',
    lead: 'dsh-plugins is part of the DeepSeek Harness plugin ecosystem. Start from the official docs or the community lists.',
    cards: [
      {
        title: 'DeepSeek Harness',
        desc: 'Official docs and the plugin development guide: the ctx.llm seam, llm/stream waterfall and settings slots.',
        link: 'Official docs',
        href: 'https://deepseek-harness.github.io/deepseek-harness/',
      },
      {
        title: 'awesome-dsh-plugin',
        desc: 'Community-curated list of DeepSeek Harness plugins, featuring dsh-auxiliary and dsh-thought-buddy.',
        link: 'Curated list',
        href: 'https://github.com/awesome-dsh-plugin/awesome-dsh-plugin',
      },
      {
        title: 'npm · @dsh-plugin',
        desc: 'The plugins are published to the npm org scope, installable from GitHub source or local file/link.',
        link: 'View packages',
        href: 'https://www.npmjs.com/org/dsh-plugin',
      },
    ],
  },

  about: {
    eyebrow: 'about',
    title: 'A small, sharp open-source org',
    lead: 'Our beliefs: plugins should plug in immediately, never touch the core, ship bilingual docs and stay openly licensed.',
    points: [
      { icon: 'plug', title: 'Plug & play', desc: 'Install and it works: auxiliary reconfigures live on save, buddy appears on refresh.' },
      { icon: 'shield', title: 'No core changes', desc: 'Everything uses official DSH extension points — seams, waterfalls, slots. Core: untouched.' },
      { icon: 'book', title: 'Bilingual docs', desc: 'Every repo keeps a README plus a Simplified Chinese edition, with config and architecture.' },
      { icon: 'check', title: 'Open licenses', desc: 'LGPL-3.0, BSD-3-Clause, MIT and GPL-3.0 — fork, improve, redistribute.' },
    ],
    maintainer: 'Maintainer',
  },

  cta: {
    title: 'Want to plug into DSH?',
    sub: 'Join the dsh-plugins organization and grow the DeepSeek Harness ecosystem — file an issue, open a PR, or start a new repo.',
    btnGithub: 'Visit GitHub Org',
    btnIssue: 'File an Issue',
  },

  footer: {
    tagline: 'Plug into DeepSeek Harness.',
    colNav: 'Site',
    colLinks: 'Links',
    colLegal: 'Licenses',
    github: 'GitHub Org',
    docs: 'DSH Official Docs',
    awesome: 'Community List',
    npm: 'npm Packages',
    licenseAux: 'dsh-auxiliary · LGPL-3.0',
    licenseBuddy: 'dsh-thought-buddy · BSD-3-Clause',
    disclaimer: 'Not an official DeepSeek product. Not licensed by DeepSeek, nor affiliated with DeepSeek in any way.',
    rights: '© 2026 dsh-plugins organization. All rights reserved.',
  },
}
