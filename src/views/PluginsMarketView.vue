<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'
import { fetchPlugins, pickDescription, type MarketPluginResult } from '../api/plugins'
import IconGlyph from '../components/ui/IconGlyph.vue'

const { t } = useI18n()

const loading = ref(true)
const error = ref('')
const all = ref<MarketPluginResult[]>([])
const query = ref('')

onMounted(async () => {
  try {
    all.value = await fetchPlugins()
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return all.value
  return all.value.filter(({ plugin }) => {
    const desc = pickDescription(plugin).toLowerCase()
    const support = Array.isArray(plugin.support_versions)
      ? plugin.support_versions.join(' ')
      : plugin.support_versions ?? ''
    return (
      plugin.id.toLowerCase().includes(q) ||
      plugin.name.toLowerCase().includes(q) ||
      desc.includes(q) ||
      support.toLowerCase().includes(q)
    )
  })
})

/** Card click target: homepage first, else repository. Empty = not clickable. */
function cardLink(result: MarketPluginResult): string {
  const urls = result.plugin.urls
  return urls?.homepage ?? urls?.repository ?? ''
}

/** Stop button clicks from bubbling to the card link. */
function stop(e: MouseEvent) {
  e.stopPropagation()
}
</script>

<template>
  <div class="market">
    <div class="container">
      <header class="market-head">
        <p class="eyebrow">{{ t('market.eyebrow') }}</p>
        <h1 class="market-title">{{ t('market.title') }}</h1>
        <p class="market-lead">{{ t('market.lead') }}</p>

        <div class="search-wrap">
          <IconGlyph name="search" :size="18" :stroke="1.8" class="search-icon" />
          <input
            v-model="query"
            type="search"
            class="search-input"
            :placeholder="t('market.searchPlaceholder')"
            :aria-label="t('market.searchPlaceholder')"
          />
          <kbd v-if="query" class="search-clear" role="button" tabindex="0" @click="query = ''">
            ✕
          </kbd>
        </div>
      </header>

      <div v-if="loading" class="market-state">
        <div class="spinner" aria-hidden="true"></div>
        <p>{{ t('market.loading') }}</p>
      </div>

      <div v-else-if="error" class="market-state market-state--error">
        <IconGlyph name="alert" :size="26" :stroke="1.8" />
        <p>{{ t('market.error') }}</p>
        <code class="error-msg">{{ error }}</code>
      </div>

      <div v-else-if="filtered.length === 0" class="market-state">
        <IconGlyph name="search" :size="26" :stroke="1.8" />
        <p>{{ t('market.empty') }}</p>
      </div>

      <div v-else class="market-grid">
        <a
          v-for="result in filtered"
          :key="result.plugin.id"
          class="card"
          :class="{ 'card--static': !cardLink(result) }"
          :href="cardLink(result) || undefined"
          :target="cardLink(result) ? '_blank' : undefined"
          :rel="cardLink(result) ? 'noopener' : undefined"
        >
          <div class="card-top">
            <div class="card-icon" aria-hidden="true">
              <IconGlyph name="box" :size="20" :stroke="1.8" />
            </div>
            <div class="card-id">
              <h2 class="card-name">{{ result.plugin.name }}</h2>
              <code class="card-pkg">{{ result.plugin.id }}</code>
            </div>
            <IconGlyph v-if="cardLink(result)" name="external" :size="15" :stroke="1.8" class="card-ext" />
          </div>

          <p v-if="pickDescription(result.plugin)" class="card-desc">
            {{ pickDescription(result.plugin) }}
          </p>

          <div class="card-meta">
            <span v-if="result.plugin.support_versions" class="chip" :title="t('market.supportTitle')">
              {{ t('market.supports') }}
              <code>{{ Array.isArray(result.plugin.support_versions) ? result.plugin.support_versions.join(', ') : result.plugin.support_versions }}</code>
            </span>
            <span
              v-for="rel in result.plugin.relationship ?? []"
              :key="rel.type + rel.id"
              class="chip"
              :class="rel.type === 'dependency' ? 'chip--dep' : 'chip--conflict'"
              :title="`${rel.type} ${rel.id} ${rel.versions}`"
            >
              {{ rel.type === 'dependency' ? t('market.depends') : t('market.conflicts') }}
              <code>{{ rel.id }}</code>
            </span>
          </div>

          <div v-if="result.plugin.urls" class="card-links" @click="stop">
            <a
              v-if="result.plugin.urls.repository"
              class="btn btn--ghost btn--sm"
              :href="result.plugin.urls.repository"
              target="_blank"
              rel="noopener"
            >
              <IconGlyph name="github" :size="14" :stroke="2" />
              {{ t('market.repo') }}
            </a>
            <a
              v-if="result.plugin.urls.issues"
              class="btn btn--ghost btn--sm"
              :href="result.plugin.urls.issues"
              target="_blank"
              rel="noopener"
            >
              <IconGlyph name="alert" :size="14" :stroke="2" />
              {{ t('market.issues') }}
            </a>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.market {
  padding: calc(var(--nav-h) + var(--sp-8)) 0 var(--sp-10);
  min-height: 60vh;
}

.market-head {
  max-width: 720px;
}

.market-title {
  font-size: var(--fs-h1);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-1);
  margin-top: var(--sp-3);
}

.market-lead {
  margin-top: var(--sp-4);
  color: var(--text-2);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
}

.search-wrap {
  position: relative;
  margin-top: var(--sp-6);
  max-width: 560px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 48px;
  padding: 0 42px 0 44px;
  border-radius: var(--r-full);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-1);
  font-size: var(--fs-body);
  font-family: var(--font-sans);
  outline: none;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}

.search-input::placeholder {
  color: var(--text-3);
}

.search-input:focus {
  border-color: var(--brand-1);
  box-shadow: 0 0 0 3px oklch(0.55 0.16 265 / 0.22);
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: var(--r-full);
  color: var(--text-3);
  background: oklch(0.3 0.05 265 / 0.5);
  font-size: 12px;
  cursor: pointer;
}

.search-clear:hover {
  color: var(--text-1);
  background: oklch(0.38 0.06 265 / 0.6);
}

.market-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
  padding: var(--sp-9) 0;
  color: var(--text-2);
  text-align: center;
}

.market-state--error {
  color: var(--danger);
}

.error-msg {
  max-width: 640px;
  font-size: var(--fs-xs);
  color: var(--text-3);
  word-break: break-all;
}

.spinner {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 3px solid var(--border);
  border-top-color: var(--brand-1);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.market-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--sp-5);
  margin-top: var(--sp-7);
}

.card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  padding: var(--sp-6);
  border-radius: var(--r-lg);
  background: linear-gradient(180deg, oklch(0.16 0.04 265 / 0.85), oklch(0.12 0.03 265 / 0.9));
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  text-decoration: none;
  transition: transform var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-float);
}

.card--static {
  cursor: default;
}

.card--static:hover {
  transform: none;
  border-color: var(--border);
  box-shadow: var(--shadow-card);
}

.card-top {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-4);
}

.card-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: var(--r-md);
  flex: none;
  color: #c7d5ff;
  background: rgb(91 127 229 / 0.16);
  border: 1px solid rgb(91 127 229 / 0.3);
}

.card-id {
  min-width: 0;
  flex: 1;
}

.card-name {
  font-size: var(--fs-h3);
  font-weight: 700;
  color: var(--text-1);
  font-family: var(--font-mono);
  letter-spacing: -0.02em;
  word-break: break-word;
}

.card-pkg {
  display: block;
  margin-top: 4px;
  font-size: var(--fs-xs);
  color: var(--text-3);
  word-break: break-all;
}

.card-ext {
  flex: none;
  color: var(--text-3);
  margin-top: 4px;
}

.card-desc {
  color: var(--text-2);
  font-size: var(--fs-sm);
  line-height: 1.65;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: var(--r-full);
  font-size: var(--fs-xs);
  color: var(--text-2);
  background: oklch(0.24 0.04 265 / 0.6);
  border: 1px solid var(--border);
  max-width: 100%;
}

.chip code {
  font-size: 0.92em;
  color: var(--text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 160px;
}

.chip--dep {
  border-color: rgb(52 211 153 / 0.3);
  color: #9ff0cd;
}

.chip--conflict {
  border-color: rgb(248 113 113 / 0.3);
  color: #fecaca;
}

.card-links {
  display: flex;
  gap: var(--sp-2);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--border);
}

.card-links .btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
