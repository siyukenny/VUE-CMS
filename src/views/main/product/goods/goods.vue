<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :pageName="contentTableConfig.pageUrlName"
    >
      <template #oldPrice="scope">
        <div>{{ "￥" + scope.row.oldPrice }}</div>
      </template>

      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          fit="cover"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
    </page-content>
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
