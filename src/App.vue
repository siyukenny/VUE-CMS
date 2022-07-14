<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view /> -->

  <div class="app">
    <!-- localization -->
    <el-config-provider :locale="lang">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import ja from "element-plus/lib/locale/lang/ja"
import en from "element-plus/lib/locale/lang/en"

const lang = ref(en)
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
}
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
