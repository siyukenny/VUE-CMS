<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.name">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { IBreadcrumb } from "../types"

// 父组件传breadcrumbs对象给本组件
const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<IBreadcrumb[]>,
    // 省略{return}
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.breadcrumb {
  @apply h-full p-1.5
   flex items-center;
  ::v-deep .el-breadcrumb__inner,
  ::v-deep .el-breadcrumb__separator {
    @apply text-blue-gray-400;
  }
}
</style>
