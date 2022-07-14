<template>
  <el-dropdown class="user-info">
    <span class="el-dropdown-link">
      <el-avatar
        size="small"
        src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
      ></el-avatar>
      {{ userName }}
      <i-ep-arrow-down />
    </span>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogoutClick()">
          <i-ep-avatar />Log Out
        </el-dropdown-item>
        <el-dropdown-item divided>
          <i-ep-infoFilled /> User Info
        </el-dropdown-item>
        <el-dropdown-item disabled>
          <i-ep-platform />
          System Management
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import router from "@/router"
import { useStore } from "@/store"
// import { ElMessage } from "element-plus"
import { computed } from "vue"
import localStorage from "@/utils/local-save"

const store = useStore()
const userName = computed(() => store.state.login.userInfo.name)

const handleLogoutClick = () => {
  localStorage.deleteSave("token")
  localStorage.deleteSave("userMenus")
  localStorage.deleteSave("userInfo")
  router.push("/login")
  // ElMessage({
  //   message: "退出登录",
  //   center: true
  // })
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  @apply h-full p-1.5
   flex items-center;
}
svg,
.el-avatar {
  @apply m-1.5;
}
</style>
