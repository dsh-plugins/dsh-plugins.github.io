<script setup lang="ts">
/**
 * DivingBuddy — a tiny animated robot head.
 * A nod to dsh-thought-buddy: blinks, bobs, wanders. Pure CSS + SVG,
 * respects prefers-reduced-motion.
 */
withDefaults(
  defineProps<{
    size?: number | string
  }>(),
  { size: 22 },
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    class="buddy"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="buddy-head" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#7C9BF0" />
        <stop offset="1" stop-color="#8B5CF6" />
      </linearGradient>
    </defs>
    <g class="buddy-body">
      <!-- antenna -->
      <line x1="32" y1="10" x2="32" y2="20" stroke="#7C9BF0" stroke-width="3" stroke-linecap="round" />
      <circle cx="32" cy="8.5" r="3.5" fill="#67E8F9">
        <animate attributeName="opacity" values="1;0.25;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <!-- head -->
      <rect x="10" y="20" width="44" height="34" rx="12" fill="url(#buddy-head)" />
      <!-- eyes -->
      <g class="buddy-eyes">
        <circle cx="24" cy="34" r="4.5" fill="#FDFDFF" />
        <circle cx="40" cy="34" r="4.5" fill="#FDFDFF" />
        <circle class="buddy-pupil" cx="25" cy="35" r="2" fill="#121A2E" />
        <circle class="buddy-pupil" cx="41" cy="35" r="2" fill="#121A2E" />
      </g>
      <!-- mouth -->
      <path d="M24 45c3 2.6 13 2.6 16 0" stroke="#FDFDFF" stroke-width="2.6" stroke-linecap="round" fill="none" />
      <!-- cheek dots -->
      <circle cx="19" cy="41" r="1.6" fill="#FDFDFF" opacity="0.6" />
      <circle cx="45" cy="41" r="1.6" fill="#FDFDFF" opacity="0.6" />
    </g>
  </svg>
</template>

<style scoped>
.buddy-body {
  transform-origin: 32px 52px;
  animation: buddy-bob 1.7s ease-in-out infinite;
}

.buddy-eyes {
  transform-box: fill-box;
  transform-origin: center;
  animation: buddy-blink 4s infinite;
}

@keyframes buddy-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2.2px); }
}

@keyframes buddy-blink {
  0%, 88%, 100% { transform: scaleY(1); }
  92%, 96% { transform: scaleY(0.08); }
}

@media (prefers-reduced-motion: reduce) {
  .buddy-body,
  .buddy-eyes {
    animation: none;
  }
}
</style>
