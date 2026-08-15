/* ============================================================
   dsh-plugins · English copy
   ============================================================ */

import type { Dict } from './zh'

export const en: Dict = {
  nav: {
    plugins: 'Plugins',
    features: 'Features',
    install: 'Install',
    ecosystem: 'Ecosystem',
    about: 'About',
    github: 'GitHub Org',
    lang: '中文',
    langTitle: '切换到中文',
  },

  hero: {
    status: 'Deep diving...',
    eyebrow: 'open source · for DeepSeek Harness',
    titleA: 'Plug into',
    titleB: 'plugins that route every job to the right model',
    sub: 'dsh-plugins is an open-source plugin organization for DeepSeek Harness (DSH). We build small, sharp plugins around the model seam and the web UI: auxiliary model routing, vision understanding, context compaction, an animated status buddy. Plug in, zero core changes.',
    ctaPlugins: 'Browse plugins',
    ctaGithub: 'GitHub Org',
    terminal: {
      tabAux: 'dsh-auxiliary',
      tabBuddy: 'dsh-thought-buddy',
      prompt: 'dsh',
      cmdAux: 'dsh plugin add @dsh-plugin/dsh-auxiliary',
      cmdBuddy: 'dsh plugin add @dsh-plugin/dsh-thought-buddy',
      line1: '✓ plugin installed · routes registered',
      line2: '✓ 3 public repos · zero core changes',
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
    lead: 'Every plugin does exactly one thing, thoroughly: auxiliary re-routes model work, thought-buddy gives waiting a face.',
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
      tag: 'JavaScript · BSD-3-Clause',
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
  },

  features: {
    eyebrow: 'auxiliary deep-dive',
    title: 'Every job, on the right model',
    lead: 'All of auxiliary rests on one pattern: recognize a call by its official marker, silently re-route it inside the llm/stream waterfall. Routes never interfere, and only activate when enabled with a complete provider/model pair.',
    how: 'How it works',
    howText: 'Each route is a resident, pure pass-through listener — it only swaps provider/model and re-enters the seam when its own call category hits (purpose: compaction / session-title, or the approval contract). Everything else passes through untouched. The main session is never rerouted; the core is never modified.',
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
        desc: 'Both plugins are published to the npm org scope, installable from GitHub source or local file/link.',
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
      { icon: 'check', title: 'Open licenses', desc: 'LGPL-3.0 and BSD-3-Clause — fork, improve, redistribute.' },
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
