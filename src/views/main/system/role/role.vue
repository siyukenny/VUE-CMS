<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :pageName="contentTableConfig.pageUrlName"
    />
  </div>
</template>

<script setup lang="ts">
// search-form,content-table的配置
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

import { useSearchPageContent } from "@/hooks/useSearchPageContent"

const [pageContentRef, handleResetClick, handleSearchClick] =
  useSearchPageContent()
</script>

<style scoped></style>
