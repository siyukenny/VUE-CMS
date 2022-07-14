<template>
  <div class="page-search">
    <basic-form v-bind="searchFormConfig" v-model="formData">
      <!-- Named Slot setting when used -->
      <template #form-header>
        <h1>Advanced Search</h1>
      </template>
      <template #form-footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><i-ep-Refresh /> Reset
          </el-button>
          <el-button @click="handleSearchClick"
            ><i-ep-search /> Search
          </el-button>
        </div>
      </template>
    </basic-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 定义parent component传来的config数据
const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})
// 定义向parent component发送的事件
const emit = defineEmits(["resetBtnClick", "searchBtnClick"])

// 绑定可响应式的表单数据,由传来的config的field决定
const formItems = props.searchFormConfig?.formItems ?? []
const formInitData: any = {}
for (const item of formItems) {
  formInitData[item.field] = ""
}
// 此时，原本改formdata时，formInitData的值也会改变(污染初始化的状态)
// 但，由于每次input新的值都会从basic-form子组件emit一个新对象给formData赋值
// 所以在page-search组件中，formInitData能保持初始的空值状态
// 但是在page-modal组件中，由于每次创建都会在hook函数中用rowData对formData赋值，
// 所以formInitData也就跟着一起改变
const formData = ref(formInitData)

// reset btn
const handleResetClick = () => {
  // // basic-form_(another-approach)
  // // 思路一:由于proxy对象formData在basic-form子组件被浅拷贝了一份copiedFromData,
  // // 所以只有修改proxy对象.value里对应key的值,才会触发浅拷贝的相同引用的数值同步更新,
  // // 从而实现双向绑定
  // for (const key in formInitData) {
  //   // formData是ref返回的Proxy对象，而formInitData只是普通的对象，所以写法不一样
  //   formData.value[`${key}`] = formInitData[key]
  // }

  formData.value = formInitData
  emit("resetBtnClick")
}

// Search btn
const handleSearchClick = () => {
  // 点击搜索按钮时,把搜索框proxy对象的value对象传给父组件
  emit("searchBtnClick", formData.value)
}
</script>

<style scoped lang="scss">
::v-deep .basic-form {
  @apply py-[25px];
  .form-header,
  .form-footer {
    @apply px-[40px] py-2;
  }
  .el-form-item {
    @apply mb-1;
  }
  .el-select,
  .el-date-editor {
    @apply w-full;
  }
}

h1 {
  @apply text-blue-gray-400 font-bold;
}
.handle-btns {
  @apply text-right;
  .el-button {
    @apply bg-blue-800 text-blue-gray-200;
  }
}
</style>
