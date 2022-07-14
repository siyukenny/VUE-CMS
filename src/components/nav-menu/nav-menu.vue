<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-show="!collapse">{{ title }}</span>
    </div>

    <el-menu
      :default-active="defaultActiveMenu"
      class="el-menu-vertical"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- type为1说明有下一级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的下一级【标题】 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <i-ep-monitor />
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单的下一级【内容】 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <template #title>
                  <i v-if="subitem.icon" :class="subitem.icon"></i>
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <!-- type为2说明没有下一级菜单，直接展示 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from "vue"
import { useRouter, useRoute } from "vue-router"

// vuex -ts 兼容=>pinia
// import { useStore } from "vuex"
// 用自己封装的useStore函数解决Vuex的TS兼容问题
import { useStore } from "@/store"
import { mapPathToMenu } from "@/utils/map-to-routes"

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "Vue 3 + TS"
  }
})

// store
const store = useStore()
const userMenus = computed(() => store.state.login.userMenus)

// router
const router = useRouter()
const route = useRoute()
const currentPath = route.path

// menu
const menu = mapPathToMenu(userMenus.value, currentPath)
const defaultActiveMenu = ref(menu.id + "")

// 点击跳转路由
const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? "/not-found"
  })
}
</script>

<style scoped lang="scss">
.nav-menu {
  @apply h-full overflow-x-hidden bg-blue-gray-900;

  .logo {
    @apply flex flex-row justify-start items-center
            h-48px py-12px px-15px;
    img {
      @apply h-full my-0;
    }
    .title {
      @apply text-16px font-weight-700
             mx-10px whitespace-nowrap;
    }
  }
  .el-menu {
    @apply border-r-0;

    ::v-deep .el-sub-menu__title {
      // color: bisque !important;
      // background-color: blue !important;
      @apply text-gray-300 bg-blue-gray-800
      hover:bg-blue-gray-800;
    }
    .el-menu-item {
      @apply pl-50px
       text-gray-300 bg-blue-gray-700
       hover:(text-white font-bold);
    }
    .el-menu-item.is-active {
      @apply bg-blue-900 text-white;
    }
  }
}
</style>
