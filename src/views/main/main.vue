<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 菜单 -->
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>

      <el-container class="page">
        <!-- 头部 -->
        <el-header class="page-header">
          <nav-header />
        </el-header>
        <!-- 主体内容 -->
        <el-main class="page-content">
          <div class="page-info">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store"
import { ref, Ref, provide } from "vue"

const isCollapse = ref(false)

const isFolded = function (foldState: Ref<boolean>) {
  isCollapse.value = foldState.value
}

provide("isFolded", isFolded)

// // 当main加载时，获取entire Department list 和 entire Role list
// const store = useStore()
// store.dispatch("getInitialDataAction")
</script>

<style scoped lang="scss">
.main {
  @apply fixed top-0 left-0 w-full h-full;

  .main-content {
    @apply h-full bg-light-100;

    .el-aside {
      @apply bg-[#001529]
      text-left text-white
      cursor-pointer overscroll-x-none;
      // line-height: 200px;
      transition: width 0.3s linear;
    }
    .page {
      @apply h-full;

      .page-header {
        @apply h-48px p-0 flex;
      }
      .page-content {
        @apply h-[calc(100%-48px)]  bg-blue-gray-100;
        .page-info {
          @apply bg-white text-center rounded-md;
        }
      }
    }
  }
}
</style>
