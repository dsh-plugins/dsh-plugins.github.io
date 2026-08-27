<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '../i18n'
import LogoMark from './ui/LogoMark.vue'
import IconGlyph from './ui/IconGlyph.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const JOIN_URL =
  'https://github.com/dsh-plugins/.github/issues/new?template=%E5%8A%A0%E5%85%A5%E6%88%91%E4%BB%AC.yml'

const links = [
  { key: 'plugins', target: 'plugins' },
  { key: 'features', target: 'features' },
  { key: 'install', target: 'install' },
  { key: 'ecosystem', target: 'ecosystem' },
  { key: 'about', target: 'about' },
] as const

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

/**
 * Navigate to a section on the home page. If we are already on "/", scroll
 * directly; otherwise go home first, then scroll after the view renders.
 * Hash routing owns "#", so in-page anchors are driven programmatically.
 */
function goToSection(target: string) {
  menuOpen.value = false
  const scroll = () => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
  }
  if (route.path === '/') {
    scroll()
  } else {
    router.push('/').then(() => {
      // Wait one tick for the home view to mount.
      requestAnimationFrame(() => requestAnimationFrame(scroll))
    })
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav-inner container-wide">
      <RouterLink class="brand" to="/" aria-label="dsh-plugins home">
        <LogoMark :size="30" />
        <span class="brand-name">dsh-<span class="brand-name--grad">plugins</span></span>
      </RouterLink>

      <nav class="nav-links" aria-label="Primary">
        <RouterLink to="/plugins" class="nav-link nav-link--market">
          {{ t('nav.market') }}
        </RouterLink>
        <RouterLink to="/launcher" class="nav-link nav-link--market">
          {{ t('nav.launcher') }}
        </RouterLink>
        <a
          v-for="l in links"
          :key="l.key"
          class="nav-link"
          href="#"
          @click.prevent="goToSection(l.target)"
        >
          {{ t(`nav.${l.key}`) }}
        </a>
      </nav>

      <div class="nav-actions">
        <button class="lang-toggle" type="button" :title="t('nav.langTitle')" @click="$emit('toggle-lang')">
          {{ t('nav.lang') }}
        </button>
        <a class="btn btn--ghost btn--sm join-btn" :href="JOIN_URL" target="_blank" rel="noopener">
          {{ t('nav.join') }}
          <IconGlyph name="external" :size="12" :stroke="2" />
        </a>
        <a class="btn btn--ghost btn--sm github-btn" :href="'https://github.com/dsh-plugins'" target="_blank" rel="noopener">
          <IconGlyph name="github" :size="15" :stroke="2" />
          <span>{{ t('nav.github') }}</span>
        </a>
        <button
          class="menu-btn"
          type="button"
          :aria-expanded="menuOpen"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <IconGlyph :name="menuOpen ? 'x' : 'menu'" :size="20" :stroke="2" />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen" class="nav-mobile">
        <RouterLink
          to="/plugins"
          class="nav-mobile-link nav-mobile-link--market"
          @click="menuOpen = false"
        >
          {{ t('nav.market') }}
        </RouterLink>
        <RouterLink
          to="/launcher"
          class="nav-mobile-link nav-mobile-link--market"
          @click="menuOpen = false"
        >
          {{ t('nav.launcher') }}
        </RouterLink>
        <a
          v-for="l in links"
          :key="l.key"
          class="nav-mobile-link"
          href="#"
          @click.prevent="goToSection(l.target)"
        >
          {{ t(`nav.${l.key}`) }}
        </a>
        <a
          class="nav-mobile-link nav-mobile-link--ext"
          :href="JOIN_URL"
          target="_blank"
          rel="noopener"
          @click="menuOpen = false"
        >
          {{ t('nav.join') }} <IconGlyph name="external" :size="14" />
        </a>
        <a
          class="nav-mobile-link nav-mobile-link--ext"
          :href="'https://github.com/dsh-plugins'"
          target="_blank"
          rel="noopener"
          @click="menuOpen = false"
        >
          {{ t('nav.github') }} <IconGlyph name="external" :size="14" />
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 60;
  height: var(--nav-h);
  transition: background-color var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out);
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: oklch(0.1 0.03 265 / 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--border);
}

.nav-inner {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--sp-5);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: none;
  justify-self: start;
}

.brand-name {
  font-weight: 700;
  font-size: 1.02rem;
  letter-spacing: -0.02em;
  color: var(--text-1);
}

.brand-name--grad {
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  justify-self: center;
}

.nav-link {
  position: relative;
  padding: 8px 14px;
  border-radius: var(--r-sm);
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--text-2);
  transition: color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out);
}

.nav-link:hover {
  color: var(--text-1);
  background: oklch(0.28 0.05 265 / 0.45);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  justify-self: end;
}

.lang-toggle {
  height: 34px;
  padding-inline: 12px;
  border-radius: var(--r-full);
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--text-2);
  border: 1px solid var(--border);
  transition: color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out);
}

.lang-toggle:hover {
  color: var(--text-1);
  border-color: var(--border-strong);
  background: var(--surface);
}

.menu-btn {
  display: none;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  color: var(--text-1);
}

.nav-mobile {
  display: none;
  position: absolute;
  top: var(--nav-h);
  inset-inline: 0;
  padding: var(--sp-3);
  background: oklch(0.09 0.03 265 / 0.96);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.nav-mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: var(--r-sm);
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--text-1);
}

.nav-mobile-link:hover {
  background: var(--surface);
}

.nav-mobile-link--ext {
  color: var(--brand-3);
}

@media (max-width: 860px) {
  .nav-inner {
    display: flex;
  }

  .brand {
    justify-self: auto;
  }

  .nav-links {
    display: none;
  }

  .nav-actions {
    justify-self: auto;
    margin-inline-start: auto;
  }

  .github-btn {
    display: none;
  }

  .menu-btn {
    display: inline-flex;
  }

  .nav-mobile {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--dur-med) var(--ease-out), transform var(--dur-med) var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
