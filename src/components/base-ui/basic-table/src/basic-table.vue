<template>
  <div class="basic-table">
    <div class="table-header">
      <slot name="table-header">
        <!-- default in slot -->
        <div class="table-title">{{ tableTitle }}</div>
        <div class="table-header-handler">
          <slot name="table-header-handler"></slot>
        </div>
      </slot>
    </div>

    <div class="table-content">
      <!-- selection-change listener in el-element -->
      <!-- https://element-plus.org/zh-CN/component/table.html#%E6%A0%91%E5%BD%A2%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%87%92%E5%8A%A0%E8%BD%BD -->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        v-bind="childrenTreeProps"
      >
        <!-- selection column in el-table -->
        <el-table-column
          v-if="isSelectColumnShown"
          type="selection"
          align="center"
          width="60"
        />
        <!-- index column in el-table -->
        <el-table-column
          v-if="isIndexColumnShown"
          type="index"
          label="Index"
          align="center"
          width="65"
        />

        <!-- template 用于遍历 -->
        <template v-for="propItem in propList" :key="propItem.prop">
          <!-- column的prop为数据，label为表头 -->
          <el-table-column
            v-bind="propItem"
            align="center"
            show-overflow-tooltip
          >
            <!-- 传给el-table的:data，会返回给scop插槽
          返回的是table的row, column, $index 和 store（table 内部的状态管理）的数据 -->
            <!-- https://element-plus.org/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%97%E6%A8%A1%E6%9D%BF          -->
            <template #default="scope">
              <!-- 留有具名插槽Named Slots，供parent component去按slotName插入 -->
              <!-- :row="scope.row"是接收后端发来到store里的行数据 -->
              <slot :name="propItem.slotName" :row="scope.row">
                {{ scope.row[propItem.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <div class="table-footer" v-if="isFooterShown">
      <slot name="table-footer">
        <!-- default in slot: pagination -->
        <el-pagination
          v-model:currentPage="paginationInfo.currentPage"
          :page-size="paginationInfo.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义该component接收parent component的data
const props = defineProps({
  tableTitle: { type: String, default: "" },
  tableData: { type: Array, required: true },
  dataCount: { type: Number, default: 0 },
  propList: { type: Array, required: true },
  childrenTreeProps: {
    type: Object,
    default: () => ({})
  },
  isSelectColumnShown: { type: Boolean, default: false },
  isIndexColumnShown: { type: Boolean, default: false },
  isFooterShown: { type: Boolean, default: true },
  paginationInfo: {
    type: Object,
    default: () => ({ currentPage: 1, pageSize: 10 })
  }
})

// emit event
const emit = defineEmits(["selectionChange", "update:paginationInfo"])
const handleSelectionChange = (value: any) => {
  emit("selectionChange", value)
}
const handleCurrentChange = (currentPage: number) => {
  // paginationInfo是个proxy对象，要解构放入新的值(只要key的名字相对应就可以更新新值)
  emit("update:paginationInfo", { ...props.paginationInfo, currentPage })
}
const handleSizeChange = (pageSize: number) => {
  emit("update:paginationInfo", { ...props.paginationInfo, pageSize })
}
</script>

<style scoped lang="scss">
.table-header {
  @apply flex flex-row justify-between items-center;
}
.table-footer {
  @apply flex justify-end;
}
</style>
