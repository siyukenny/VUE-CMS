<template>
  <div class="page-modal">
    <el-dialog
      v-model="isDialogVisible"
      :title="modalTitle"
      width="30%"
      center
      destroy-on-close
      @closed="resetFormData"
    >
      <basic-form v-bind="modalFormConfig" v-model="formData" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store"
import { ref } from "vue"

// 定义parent component传来的config数据
const props = defineProps({
  modalFormConfig: {
    type: Object,
    required: true
  }
})
// 定义向parent component发送的事件
const emits = defineEmits(["resetBtnClick", "searchBtnClick"])

const isDialogVisible = ref(false)
const modalTitle = ref(`${props.modalFormConfig.pageName}`)

// 绑定可响应式的表单数据,由传来的config的field决定
const formItems = props.modalFormConfig?.formItems ?? []
const formInitData: any = {}
for (const item of formItems) {
  formInitData[item.field] = ""
}
// 此时，改formdata时，formInitData的值也会改变(污染初始化的状态)
// 在page-search组件中，formInitData能保持初始的空值状态
// 是由于一旦input新的值都会从basic-form子组件emit一个新对象给formData赋值
// 但是在page-modal组件中，由于每次创建都会在hook函数中用rowData对formData赋值，
// 所以formInitData也就跟着一起改变
const formData = ref(formInitData)
// 之后一旦input新的值，formData接收了新对象，所以formInitData就不绑定formData了
// 所以每次close dialog要把formData重新绑定formInitData
const resetFormData = () => {
  formData.value = formInitData
  modalTitle.value = props.modalFormConfig.pageName
}

// Btn
const defaultInfo = ref({ id: undefined })

const store = useStore()
const handleConfirmClick = () => {
  isDialogVisible.value = false
  // everytime page-modal is created, in hooks Fns, form
  if (Object.values(formInitData).every((item) => item === "")) {
    // newData Btn
    store.dispatch("system/addPageRowDataAction", {
      pageName: props.modalFormConfig.pageUrlName,
      newData: { ...formData.value }
    })
  } else {
    // Edit Btn
    store.dispatch("system/editPageRowDataAction", {
      pageName: props.modalFormConfig.pageUrlName,
      dataID: defaultInfo.value.id,
      editData: { ...formData.value }
    })
  }
}

// 暴露给parent component 供 template Ref引用
defineExpose({
  isDialogVisible,
  modalTitle,
  formInitData,
  defaultInfo
})
</script>

<style scoped lang="scss">
::v-deep .basic-form {
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
