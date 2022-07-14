<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :pageName="contentTableConfig.pageUrlName"
      @newDataBtnClick="handleNewDataBtnClick"
      @editBtnClick="handleEditBtnClick"
    />
    <page-modal ref="pageModalRef" :modalFormConfig="modalFormConfigRef" />
  </div>
</template>

<script setup lang="ts">
// search-form,content-table的配置
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalFormConfig } from "./config/modal.config"

import { useSearchPageContent } from "@/hooks/useSearchPageContent"
import { useModifyPageContent } from "@/hooks/useModifyPageContent"

import { useStore } from "@/store"
import { computed } from "vue"

const [pageContentRef, handleResetClick, handleSearchClick] =
  useSearchPageContent()

// 1. determine whether "password" field need to be hidden
const newDataBtnCallback = () => {
  const passwordItem = modalFormConfig.formItems.find(
    (item) => item.field === "password"
  )
  passwordItem!.isHidden = false
}
const editBtnCallback = () => {
  const passwordItem = modalFormConfig.formItems.find(
    (item) => item.field === "password"
  )
  passwordItem!.isHidden = true
}

// 2 dynamically add DepartmentList & RoleList into modalConfig
const store = useStore()
// department & role List maynot ready when User page setup. So,
// use computed() to run the function inside everytime the store.state Updated
const modalFormConfigRef = computed(() => {
  // set department list
  const departmentItem = modalFormConfig.formItems.find(
    (formItem) => formItem.field === "departmentId"
  )
  // 只有map支持return新数组
  departmentItem!.options = store.state.entireDepartmentList.map((item) => {
    return { title: item.name, value: item.id }
  })

  // set role list
  const roleItem = modalFormConfig.formItems.find(
    (formItem) => formItem.field === "roleId"
  )
  roleItem!.options = store.state.entireRoleList.map((item) => {
    return { title: item.name, value: item.id }
  })
  return modalFormConfig
})

// 3. use hook, get common variables and function
const [pageModalRef, handleNewDataBtnClick, handleEditBtnClick] =
  useModifyPageContent(newDataBtnCallback, editBtnCallback)
</script>

<style scoped></style>
