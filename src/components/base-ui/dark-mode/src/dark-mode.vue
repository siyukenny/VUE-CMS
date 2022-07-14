<template>
  <button class="toggle-dark-mode" @click="toggleDark()">
    <i-ep-moon v-show="isDark" class="align-middle" />
    <i-ep-sunny v-show="!isDark" class="align-middle" />
    <!-- <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span> -->
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core"

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped lang="scss">
.toggle-dark-mode {
  @apply bg-opacity-0 p-1.5 h-full;
}
</style>
