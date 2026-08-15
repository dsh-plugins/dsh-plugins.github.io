<script setup lang="ts">
/**
 * Brand mark: gradient squircle tile + tilted plug glyph.
 * The tilt ("plugging in") is the brand's core motion metaphor.
 */
withDefaults(
  defineProps<{
    size?: number | string
  }>(),
  { size: 34 },
)
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="dsh-mark-grad" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#5B7FE5" />
        <stop offset="0.55" stop-color="#7C5CE0" />
        <stop offset="1" stop-color="#8B5CF6" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="58" height="58" rx="16" fill="url(#dsh-mark-grad)" />
    <rect
      x="3.5"
      y="3.5"
      width="57"
      height="57"
      rx="15.5"
      stroke="oklch(1 0 0 / 0.28)"
      stroke-width="1"
    />
    <!-- tilted plug: the act of plugging in -->
    <g transform="translate(32 33) rotate(-42) translate(-12 -12)">
      <path
        d="M12 22v-5"
        stroke="#fff"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <path
        d="M9 8V2"
        stroke="#fff"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <path
        d="M15 8V2"
        stroke="#fff"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <path
        d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"
        stroke="#fff"
        stroke-width="2.4"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>
