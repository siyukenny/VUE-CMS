<template>
  <div class="login-phone">
    <!-- el-form顶端统一写表单rules，验证值用prop参数,把phone的值永远传给el-form-->
    <el-form label-width="25%" :rules="rules" :model="phone" inline-message>
      <el-form-item label="Phone" prop="number">
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="Code" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-btn">Get Code</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
// import { rules } from "../config/phone-config"

export default defineComponent({
  setup() {
    // 表单双向绑定数据
    const phone = reactive({
      number: "",
      code: ""
    })

    return {
      phone
      // rules
    }
  }
})
</script>

<style scoped lang="scss">
.get-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
