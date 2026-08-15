<script setup lang="ts">
/**
 * Brand mark: the dsh-plugins GitHub organization avatar.
 */
withDefaults(
  defineProps<{
    size?: number | string
  }>(),
  { size: 34 },
)
</script>

<template>
  <img
    class="logo-mark"
    :width="size"
    :height="size"
    src="/logo-avatar.png"
    alt="dsh-plugins"
    aria-hidden="true"
  />
</template>

<style scoped>
.logo-mark {
  display: block;
  border-radius: 20%;
  flex: none;
}
</style>
