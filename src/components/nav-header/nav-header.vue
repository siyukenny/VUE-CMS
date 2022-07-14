<template>
  <div class="nav-header">
    <div class="header-left">
      <fold-menu />
      <breadcrumb :breadcrumbs="breadcrumbs" />
    </div>

    <div class="header-right">
      <dark-mode />
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store"
import { computed } from "vue"
import { mapPathToBreadcrumbs } from "@/utils/map-to-routes"
import { useRoute } from "vue-router"

// store
const store = useStore()
const breadcrumbs = computed(() => {
  // 在这里写menu的逻辑才会每次刷新重新计算
  const userMenus = store.state.login.userMenus
  const route = useRoute()
  const currentPath = route.path
  return mapPathToBreadcrumbs(userMenus, currentPath)
})
</script>

<style scoped lang="scss">
.nav-header {
  @apply h-full w-full
  flex flex-row justify-between items-center;
  .header-left {
    @apply h-full px-2.5
    flex flex-row;
  }
  .header-right {
    @apply h-full px-2.5
    flex flex-row;
  }
}
</style>
