<script setup lang="ts">
/** Scroll-reveal wrapper: fades/slides content in once via IntersectionObserver. */
import { onMounted, ref } from 'vue'

withDefaults(
  defineProps<{
    delay?: number
  }>(),
  { delay: 0 },
)

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const node = el.value
  if (!node) return
  // ?preview=1 renders every section immediately (used for screenshots/reviews)
  if (new URLSearchParams(window.location.search).has('preview')) {
    node.classList.add('is-visible')
    return
  }
  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('is-visible')
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.disconnect()
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  io.observe(node)
})
</script>

<template>
  <div ref="el" class="reveal" :style="{ '--reveal-delay': `${delay}ms` }">
    <slot />
  </div>
</template>
