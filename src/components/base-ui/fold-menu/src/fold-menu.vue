<template>
  <button class="fold-menu" @click="toggleFold()">
    <i-ep-fold v-show="isFold" class="align-middle" />
    <i-ep-expand v-show="!isFold" class="align-middle" />
    <!-- <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span> -->
  </button>
</template>

<script setup lang="ts">
import { ref, Ref, inject } from "vue"
// import { useToggle } from "@vueuse/core"

// 截取main.vue组件的isFolded函数
const isFolded = inject("isFolded")

const isFold = ref(false)
// const toggleFold = useToggle(isFold)

const toggleFold = () => {
  // 函数名过多
  // const isFolded = useToggle(isFold)
  // isFolded()
  isFold.value = !isFold.value
  console.log(isFold.value)

  isFolded(isFold)
  console.log(isFold.value)
}
</script>

<style scoped lang="scss">
.fold-menu {
  @apply bg-opacity-0 p-1.5 h-full;
}
</style>
