<template>
  <div class="login-account">
    <!-- el-form顶端统一写表单rules，验证值用prop参数,把account的值永远传给el-form-->
    <!-- ref用于获取并执行该子组件的函数 -->
    <el-form
      label-width="25%"
      :rules="rules"
      :model="account"
      inline-message
      ref="formRef"
    >
      <el-form-item label="Account" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { useStore } from "vuex"
import { rules } from "../login-panel/config/account-config"
// 为了使用ElForm类型
import { ElForm } from "element-plus"
import localCache from "@/utils/cache"

export default defineComponent({
  setup() {
    const store = useStore()

    // 表单双向绑定数据
    const account = reactive({
      name: localCache.getCache("name") ?? "coderwhy",
      password: localCache.getCache("password") ?? "123456"
    })
    // typeof把ElForm对象转成实例，InstanceType把实例转成类型
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否记住密码
          if (isKeepPassword) {
            localCache.setCache("name", account.name)
            localCache.setCache("password", account.password)
          } else {
            localCache.deleteCache("name")
            localCache.deleteCache("password")
          }
          // 2.进行登录验证
          store.dispatch("login/accountLoginAction", { ...account })
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
