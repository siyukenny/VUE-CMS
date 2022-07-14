<template>
  <div class="login-panel">
    <div class="title">
      <h1>{{ loginTitle }}</h1>
      <h4>{{ loginSubTitle }}</h4>
    </div>

    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <!-- <el-icon><user-filled /></el-icon> Account -->
            <i-ep-user-filled /> Account
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <!-- <el-icon><iphone /></el-icon> Phone -->
            <i-ep-iphone /> Phone
          </span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">Remenber me</el-checkbox>
      <el-link type="info">Forget password?</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLoginClick">
      Login
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import LoginAccount from "./login-account.vue"
import LoginPhone from "./login-phone.vue"

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  props: {
    loginTitle: {
      type: String,
      default: "CMS Demo"
    },
    loginSubTitle: {
      type: String,
      default: "Admin Login"
    }
  },
  setup() {
    // 定义属性
    const isKeepPassword = ref(true)
    // typeof把LoginAccount对象转成实例，InstanceType把实例转成类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref("account")

    // 定义方法
    const handleLoginClick = () => {
      if (currentTab.value === "account") {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // phoneRef.value?.loginAction(isKeepPassword.value)
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="scss">
.login-panel {
  width: 400px;
  .title {
    @apply text-center  py-5;
    h1 {
      @apply text-2xl font-bold  leading-10 text-blue-gray-600;
    }
    h4 {
      @apply font-semibold  text-blue-gray-500;
    }
  }
  .login-btn {
    width: 100%;
    margin-top: 8px;
  }
  .account-control {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
