<script setup lang="ts">
import { useI18n } from '../i18n'
import LogoMark from './ui/LogoMark.vue'
import IconGlyph from './ui/IconGlyph.vue'

const { t } = useI18n()

const navLinks = [
  { key: 'plugins', href: '#plugins' },
  { key: 'features', href: '#features' },
  { key: 'install', href: '#install' },
  { key: 'ecosystem', href: '#ecosystem' },
  { key: 'about', href: '#about' },
] as const

const linkItems = [
  { key: 'github', href: 'https://github.com/dsh-plugins' },
  { key: 'docs', href: 'https://deepseek-harness.github.io/deepseek-harness/' },
  { key: 'awesome', href: 'https://github.com/awesome-dsh-plugin/awesome-dsh-plugin' },
  { key: 'npm', href: 'https://www.npmjs.com/org/dsh-plugin' },
] as const
</script>

<template>
  <footer class="footer">
    <div class="footer-inner container-wide">
      <div class="footer-brand">
        <a class="footer-logo" href="#top">
          <LogoMark :size="30" />
          <span class="footer-name">dsh-plugins</span>
        </a>
        <p class="footer-tagline">{{ t('footer.tagline') }}</p>
        <div class="footer-licenses">
          <span class="chip chip--brand">{{ t('footer.licenseAux') }}</span>
          <span class="chip chip--cyan">{{ t('footer.licenseBuddy') }}</span>
        </div>
      </div>

      <nav class="footer-col" aria-label="Site">
        <h4 class="footer-heading">{{ t('footer.colNav') }}</h4>
        <a v-for="l in navLinks" :key="l.key" class="footer-link" :href="l.href">
          {{ t(`nav.${l.key}`) }}
        </a>
      </nav>

      <nav class="footer-col" aria-label="Links">
        <h4 class="footer-heading">{{ t('footer.colLinks') }}</h4>
        <a v-for="l in linkItems" :key="l.key" class="footer-link" :href="l.href" target="_blank" rel="noopener">
          {{ t(`footer.${l.key}`) }}
          <IconGlyph name="external" :size="11" :stroke="2" />
        </a>
      </nav>
    </div>

    <div class="footer-bottom container-wide">
      <span class="footer-rights">{{ t('footer.rights') }}</span>
      <span class="footer-built">{{ t('footer.builtWith') }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  background: oklch(0.07 0.02 265 / 0.7);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: var(--sp-8);
  padding-block: var(--sp-8) var(--sp-7);
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.footer-name {
  font-weight: 700;
  font-size: 1.02rem;
  color: var(--text-1);
}

.footer-tagline {
  margin-top: var(--sp-4);
  color: var(--text-3);
  font-size: var(--fs-sm);
}

.footer-licenses {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-top: var(--sp-5);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding-top: var(--sp-2);
}

.footer-heading {
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-3);
  font-family: var(--font-mono);
  margin-bottom: var(--sp-2);
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-sm);
  color: var(--text-2);
  width: fit-content;
  transition: color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}

.footer-link:hover {
  color: var(--text-1);
  transform: translateX(2px);
}

.footer-link :deep(svg) {
  color: var(--text-3);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
  padding-block: var(--sp-5);
  border-top: 1px solid var(--border);
  font-size: var(--fs-xs);
  color: var(--text-3);
}

@media (max-width: 760px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: var(--sp-6);
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-2);
  }
}
</style>
