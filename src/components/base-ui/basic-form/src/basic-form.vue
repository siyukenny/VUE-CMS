<template>
  <div class="basic-form">
    <div class="form-header">
      <!-- provide Named slot for customized usage -->
      <slot name="form-header"></slot>
    </div>

    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemLayout"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <!-- 思路一:子组件和父组件各自双向绑定各自的form-data,
              子组件通过watch自己copied后的新的FormData后
              emit新proxy对象给父组件的v-model="formData" -->
                <!-- <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="copiedFormData[`${item.field}`]"
                /> -->

                <!-- formData是proxy对象,所以要这么写 -->

                <!-- 思路二:把子组件v-model拆开成两步:
                把父组件modelValue传进孙组件,
                监听孙组件的值变化,促发emit事件 -->
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>

              <template v-else-if="item.type === 'datepicker'">
                <!-- v-bind 不管绑定的内部数据结构是什么一股脑全绑进来 -->
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="form-footer">
      <!-- provide Named slot for customized usage -->
      <slot name="form-footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue"
import { IFormItem } from "../type"

// 子组件中不要直接修改props里的对象属性
// 违反单向数据流的原则
// 应该改为emit event
const props = defineProps({
  // 双向绑定父组件数据的属性，名字固定
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    // 箭头函数跟上下文的this有关
    default: () => []
  },
  labelWidth: {
    type: String,
    default: "100px"
  },
  itemLayout: {
    type: Object,
    default: () => ({ padding: "10px 40px" })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
})

// emit v-model event
const emit = defineEmits(["update:modelValue"])

// // 思路一:子组件和爷组件各自双向绑定各自的form-data,
// // 子组件通过watch自己copied后的新的FormData,
// // emit新proxy对象给爷组件的v-model="formData"

// // 把爷组件的v-model绑定的数据modelValue,解构放在新对象里
// // 浅拷贝(对第一层拷贝，对第二层保留堆内存引用)
// // 把新对象放在子组件ref可响应式的对象里
// // 此时copiedFormData已经和爷组件的formData不是同一个对象了
// const copiedFormData = ref({ ...props.modelValue })
// // watch可响应式的ref(proxy)对象时,newValue是新的proxy对象,而不是值
// watch(copiedFormData, (newValue) => emit("update:modelValue", newValue), {
//   // 只有deep模式才能监视对象内部的属性变化
//   deep: true
//   // immediate: true
// })

// 思路二:把子组件v-model拆开成两步:
// 把爷组件modelValue传进孙组件,
// 子组件监听孙组件的值变化,emit数据更新后的新modelValue对象给爷组件
const handleValueChange = (value: any, field: string) => {
  // 把爷组件传来的formData对象拷贝一份,替换掉有数据更新的键值对
  emit("update:modelValue", { ...props.modelValue, [field]: value })
  console.log({ ...props.modelValue, [field]: value })
}
</script>
