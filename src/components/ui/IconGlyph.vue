<script setup lang="ts">
/**
 * Inline SVG icon set (outline, currentColor, lucide-style geometry).
 * Stroke weight matches the surrounding text: 1.5 beside regular text,
 * 2 beside semibold — controlled by the `stroke` prop.
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    stroke?: number
    class?: string
  }>(),
  { size: 16, stroke: 1.5 },
)

const paths: Record<string, string[]> = {
  plug: [
    'M12 22v-5',
    'M9 8V2',
    'M15 8V2',
    'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z',
  ],
  eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  swap: [
    'M17 3l4 4-4 4',
    'M21 7H8',
    'M7 21l-4-4 4-4',
    'M3 17h13',
  ],
  stack: ['m12 2 10 5-10 5L2 7l10-5Z', 'm2 12 10 5 10-5', 'm2 17 10 5 10-5'],
  shield: ['M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z'],
  fork: [
    'M6 3v12',
    'M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    'M18 9a9 9 0 0 1-9 9',
  ],
  hash: ['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3l-2 18'],
  image: [
    'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
    'M8.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
    'm21 15-5-5L5 21',
  ],
  robot: [
    'M12 8V4',
    'M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z',
    'M9 13v.01',
    'M15 13v.01',
  ],
  type: ['M4 7V4h16v3', 'M9 20h6', 'M12 4v16'],
  emoji: [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
    'M8 14s1.5 2 4 2 4-2 4-2',
    'M9 9h.01',
    'M15 9h.01',
  ],
  theme: [
    'M12 3v2',
    'M12 19v2',
    'M3 12h2',
    'M19 12h2',
    'M5.6 5.6l1.4 1.4',
    'M17 17l1.4 1.4',
    'M18.4 5.6 17 7',
    'M7 17l-1.4 1.4',
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  ],
  motion: ['M22 12h-4l-3 9L9 3l-3 9H2'],
  github: [
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    'M9 18c-4.51 2-5-2-7-2',
  ],
  npm: [
    'M4 10h16v4h-8v3h-4v-3H4Z',
  ],
  copy: [
    'M8 8h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1Z',
    'M16 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1',
  ],
  check: ['M20 6 9 17l-5-5'],
  arrow: ['M5 12h14', 'm12 5 7 7-7 7'],
  external: [
    'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    'M15 3h6v6',
    'M10 14 21 3',
  ],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
  book: [
    'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z',
  ],
  box: [
    'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
    'M3.3 7 12 12l8.7-5',
    'M12 22V12',
  ],
  terminal: ['m4 17 6-6-6-6', 'M12 19h8'],
  zap: ['M13 2 3 14h9l-1 8 10-12h-9l1-8Z'],
  chevron: ['m6 9 6 6 6-6'],
  sparkle: [
    'M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3Z',
  ],
  heart: [
    'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
  ],
}

const d = computed(() => paths[props.name] ?? [])

const strokeWidth = computed(() => props.stroke)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="'currentColor'"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    :class="class"
  >
    <path v-for="(p, i) in d" :key="i" :d="p" />
  </svg>
</template>
