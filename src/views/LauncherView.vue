<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'
import IconGlyph from '../components/ui/IconGlyph.vue'
import Reveal from '../components/ui/Reveal.vue'

const { d } = useI18n()

const REPO = 'https://github.com/dsh-plugins/dsh-launcher'
const RELEASES = `${REPO}/releases`

/** Launcher copy bound to the active language. */
const lp = computed(() => d.value.launcher)
</script>

<template>
  <main class="lp">
    <!-- ================= hero ================= -->
    <section class="lp-hero">
      <div class="lp-hero-bg" aria-hidden="true">
        <img class="lp-hero-banner" src="/images/launcher/banner.jpg" alt="" />
        <div class="lp-hero-fade"></div>
      </div>

      <div class="lp-hero-inner container">
        <Reveal>
          <RouterLink class="lp-back" to="/">
            <IconGlyph name="undo" :size="14" :stroke="2" />
            {{ lp.back }}
          </RouterLink>
        </Reveal>

        <Reveal :delay="80">
          <p class="eyebrow">{{ lp.eyebrow }}</p>
          <h1 class="lp-title">
            {{ lp.titleA }}
            <span class="lp-title-grad">{{ lp.titleB }}</span>
          </h1>
          <p class="lp-sub">{{ lp.sub }}</p>
          <p class="lp-lead">{{ lp.lead }}</p>
        </Reveal>

        <Reveal :delay="160">
          <div class="lp-chips">
            <span class="chip chip--brand chip--dot">{{ lp.version }}</span>
            <span class="chip">{{ lp.license }}</span>
            <span class="chip chip--cyan">{{ lp.platforms }}</span>
            <span class="chip lp-chip-stack">{{ lp.stack }}</span>
          </div>
        </Reveal>

        <Reveal :delay="240">
          <div class="lp-actions">
            <a class="btn btn--primary" :href="RELEASES" target="_blank" rel="noopener">
              {{ lp.ctaDownload }}
              <IconGlyph name="external" :size="14" :stroke="2" class="btn-icon" />
            </a>
            <a class="btn btn--ghost" :href="REPO" target="_blank" rel="noopener">
              <IconGlyph name="github" :size="15" :stroke="2" class="btn-icon" />
              {{ lp.ctaRepo }}
            </a>
          </div>
        </Reveal>

        <Reveal :delay="320">
          <figure class="lp-shot">
            <div class="lp-shot-bar" aria-hidden="true">
              <i></i><i></i><i></i>
              <span class="lp-shot-title">dsh-launcher</span>
            </div>
            <img
              class="lp-shot-img"
              src="/images/launcher/screenshot.png"
              :alt="lp.shotAlt"
              loading="lazy"
            />
          </figure>
        </Reveal>
      </div>
    </section>

    <!-- ================= features ================= -->
    <section class="section">
      <div class="container">
        <Reveal>
          <header class="section-head">
            <p class="eyebrow">{{ lp.feat.eyebrow }}</p>
            <h2 class="section-title">{{ lp.feat.title }}</h2>
            <p class="section-lead">{{ lp.feat.lead }}</p>
          </header>
        </Reveal>

        <div class="lp-grid">
          <Reveal v-for="(f, i) in lp.feat.items" :key="f.title" :delay="(i % 4) * 70">
            <article class="lp-card">
              <div class="lp-card-icon">
                <IconGlyph :name="f.icon" :size="20" :stroke="1.75" />
              </div>
              <h3 class="lp-card-title">{{ f.title }}</h3>
              <p class="lp-card-desc">{{ f.desc }}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- ================= dsh_home modes ================= -->
    <section class="section lp-section--alt">
      <div class="container">
        <Reveal>
          <header class="section-head">
            <p class="eyebrow">{{ lp.homes.eyebrow }}</p>
            <h2 class="section-title">{{ lp.homes.title }}</h2>
            <p class="section-lead">{{ lp.homes.lead }}</p>
          </header>
        </Reveal>

        <div class="lp-modes">
          <Reveal v-for="(m, i) in lp.homes.modes" :key="m.title" :delay="i * 90">
            <article class="lp-mode">
              <span class="lp-mode-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="lp-card-icon">
                <IconGlyph :name="m.icon" :size="20" :stroke="1.75" />
              </div>
              <h3 class="lp-card-title">{{ m.title }}</h3>
              <p class="lp-card-desc">{{ m.desc }}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- ================= plugin market ================= -->
    <section class="section">
      <div class="container">
        <Reveal>
          <header class="section-head">
            <p class="eyebrow">{{ lp.market.eyebrow }}</p>
            <h2 class="section-title">{{ lp.market.title }}</h2>
            <p class="section-lead">{{ lp.market.lead }}</p>
          </header>
        </Reveal>

        <div class="lp-channels">
          <Reveal v-for="(c, i) in lp.market.channels" :key="c.badge" :delay="i * 90">
            <article class="lp-channel">
              <span class="lp-channel-badge" :class="`lp-channel-badge--${c.tone}`">{{ c.badge }}</span>
              <div class="lp-channel-body">
                <h3 class="lp-card-title">{{ c.name }}</h3>
                <p class="lp-channel-desc">{{ c.desc }}</p>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal :delay="120">
          <ol class="lp-steps">
            <li v-for="(s, i) in lp.market.steps" :key="s" class="lp-step">
              <span class="lp-step-num">{{ i + 1 }}</span>
              <span class="lp-step-text">{{ s }}</span>
              <IconGlyph
                v-if="i < lp.market.steps.length - 1"
                name="arrow"
                :size="14"
                :stroke="2"
                class="lp-step-arrow"
              />
            </li>
          </ol>
        </Reveal>

        <Reveal :delay="200">
          <p class="lp-note">
            <IconGlyph name="sparkle" :size="14" :stroke="2" />
            {{ lp.market.note }}
          </p>
        </Reveal>
      </div>
    </section>

    <!-- ================= download ================= -->
    <section class="section lp-section--alt">
      <div class="container">
        <Reveal>
          <header class="section-head">
            <p class="eyebrow">{{ lp.download.eyebrow }}</p>
            <h2 class="section-title">{{ lp.download.title }}</h2>
            <p class="section-lead">{{ lp.download.lead }}</p>
          </header>
        </Reveal>

        <div class="lp-dl">
          <Reveal>
            <article class="lp-dl-card">
              <div class="lp-card-icon">
                <IconGlyph name="box" :size="20" :stroke="1.75" />
              </div>
              <h3 class="lp-card-title">{{ lp.download.ctaReleases }}</h3>
              <p class="lp-card-desc">{{ lp.platforms }}</p>
              <div class="lp-dl-actions">
                <a class="btn btn--primary btn--sm" :href="RELEASES" target="_blank" rel="noopener">
                  {{ lp.ctaDownload }}
                  <IconGlyph name="external" :size="13" :stroke="2" class="btn-icon" />
                </a>
                <a class="btn btn--ghost btn--sm" :href="REPO" target="_blank" rel="noopener">
                  <IconGlyph name="github" :size="14" :stroke="2" class="btn-icon" />
                  {{ lp.download.ctaSource }}
                </a>
              </div>
            </article>
          </Reveal>

          <Reveal :delay="100">
            <article class="lp-dl-card">
              <div class="lp-card-icon">
                <IconGlyph name="terminal" :size="20" :stroke="1.75" />
              </div>
              <h3 class="lp-card-title">{{ lp.download.buildTitle }}</h3>
              <p class="lp-card-desc">{{ lp.download.buildNote }}</p>
              <div class="lp-term">
                <p class="lp-term-line"><span class="lp-term-prompt">$</span> pnpm install</p>
                <p class="lp-term-line"><span class="lp-term-prompt">$</span> pnpm tauri build</p>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal :delay="160">
          <p class="lp-note">
            <IconGlyph name="file" :size="14" :stroke="2" />
            {{ lp.download.dataNote }}
          </p>
        </Reveal>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ---------- hero ---------- */

.lp-hero {
  position: relative;
  padding-top: calc(var(--nav-h) + var(--sp-7));
  padding-bottom: var(--sp-8);
  overflow: clip;
}

.lp-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.lp-hero-banner {
  width: 100%;
  height: 560px;
  object-fit: cover;
  object-position: center 30%;
  opacity: 0.32;
}

.lp-hero-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(7 10 18 / 0.55) 0%, rgb(7 10 18 / 0.82) 55%, var(--bg-0) 100%);
}

.lp-hero-inner {
  position: relative;
}

.lp-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: var(--sp-6);
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--text-3);
  transition: color var(--dur-fast) var(--ease-out);
}

.lp-back:hover {
  color: var(--text-1);
}

.lp-title {
  font-size: var(--fs-display);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.lp-title-grad {
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.lp-sub {
  margin-top: var(--sp-3);
  font-size: var(--fs-h3);
  font-weight: 600;
  color: var(--text-1);
}

.lp-lead {
  margin-top: var(--sp-4);
  max-width: 62ch;
  color: var(--text-2);
}

.lp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-top: var(--sp-5);
}

.lp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin-top: var(--sp-6);
}

/* screenshot */

.lp-shot {
  margin: var(--sp-8) 0 0;
  border-radius: var(--r-md);
  overflow: hidden;
  background: var(--bg-1);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-float), var(--glow-brand);
}

.lp-shot-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding-inline: var(--sp-4);
  background: var(--bg-2);
  border-bottom: 1px solid var(--border);
}

.lp-shot-bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
}

.lp-shot-bar i:nth-child(1) { background: rgb(248 113 113 / 0.7); }
.lp-shot-bar i:nth-child(2) { background: rgb(251 191 36 / 0.7); }
.lp-shot-bar i:nth-child(3) { background: rgb(52 211 153 / 0.7); }

.lp-shot-title {
  margin-inline-start: var(--sp-2);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-3);
}

.lp-shot-img {
  width: 100%;
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
}

/* ---------- cards ---------- */

.lp-section--alt {
  background: linear-gradient(180deg, transparent, rgb(15 22 38 / 0.5) 18%, rgb(15 22 38 / 0.5) 82%, transparent);
}

.lp-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-4);
}

.lp-card,
.lp-mode,
.lp-channel,
.lp-dl-card {
  height: 100%;
  padding: var(--sp-5);
  border-radius: var(--r-md);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  transition: border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}

.lp-card:hover,
.lp-mode:hover,
.lp-channel:hover,
.lp-dl-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.lp-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--r-sm);
  color: var(--brand-3);
  background: rgb(34 211 238 / 0.1);
  border: 1px solid rgb(34 211 238 / 0.22);
  margin-bottom: var(--sp-4);
}

.lp-card-title {
  font-size: calc(var(--fs-body) + 1px);
  font-weight: 650;
  margin-bottom: var(--sp-2);
}

.lp-card-desc {
  font-size: var(--fs-sm);
  color: var(--text-2);
  line-height: 1.55;
}

/* ---------- dsh_home modes ---------- */

.lp-modes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-4);
}

.lp-mode {
  position: relative;
}

.lp-mode-num {
  position: absolute;
  top: var(--sp-4);
  inset-inline-end: var(--sp-5);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-3);
  opacity: 0.75;
}

/* ---------- market ---------- */

.lp-channels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-4);
}

.lp-channel {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-4);
}

.lp-channel-badge {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--r-sm);
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
}

.lp-channel-badge--emerald {
  color: #b9f6dd;
  background: rgb(52 211 153 / 0.13);
  border: 1px solid rgb(52 211 153 / 0.32);
}

.lp-channel-badge--amber {
  color: #ffe3b3;
  background: rgb(251 191 36 / 0.13);
  border: 1px solid rgb(251 191 36 / 0.32);
}

.lp-channel-badge--danger {
  color: #ffc9c9;
  background: rgb(248 113 113 / 0.13);
  border: 1px solid rgb(248 113 113 / 0.32);
}

.lp-channel-desc {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-3);
}

.lp-steps {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin: var(--sp-6) 0 0;
  padding: 0;
  list-style: none;
}

.lp-step {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 10px 16px;
  border-radius: var(--r-full);
  background: var(--surface);
  border: 1px solid var(--border);
  font-size: var(--fs-sm);
  font-weight: 500;
}

.lp-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: 700;
  color: #c7d5ff;
  background: rgb(91 127 229 / 0.16);
  border: 1px solid rgb(91 127 229 / 0.3);
}

.lp-step-arrow {
  color: var(--text-3);
}

.lp-note {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  margin-top: var(--sp-6);
  padding: var(--sp-4) var(--sp-5);
  border-radius: var(--r-sm);
  background: rgb(139 92 246 / 0.08);
  border: 1px solid rgb(139 92 246 / 0.22);
  color: var(--text-2);
  font-size: var(--fs-sm);
}

.lp-note svg {
  flex: none;
  margin-top: 3px;
  color: var(--brand-4);
}

/* ---------- download ---------- */

.lp-dl {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-4);
}

.lp-dl-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin-top: var(--sp-4);
}

.lp-term {
  margin-top: var(--sp-4);
  padding: var(--sp-4);
  border-radius: var(--r-sm);
  background: var(--bg-1);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: var(--fs-code);
}

.lp-term-line {
  color: var(--text-2);
  line-height: 1.7;
  overflow-wrap: break-word;
}

.lp-term-prompt {
  color: var(--brand-3);
  margin-inline-end: var(--sp-2);
}

/* ---------- responsive ---------- */

@media (max-width: 1020px) {
  .lp-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .lp-modes,
  .lp-channels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .lp-grid,
  .lp-dl {
    grid-template-columns: 1fr;
  }

  .lp-chip-stack {
    display: none;
  }

  .lp-hero-banner {
    height: 380px;
  }
}
</style>
