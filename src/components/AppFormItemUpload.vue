<template>
  <app-form-item :path="filePath" :rule-path="fileRulePath" :rule="fileRule">
    <app-form-upload
      ref="uploadRef"
      directory-dnd
      :default-upload="false"
      v-bind="$attrs"
      @change="value => $emit('change', value)"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <icon-fa-solid-upload />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">點擊或拖拉檔案至此進行上傳</n-text>
      </n-upload-dragger>
    </app-form-upload>
    <template #plainValue>
      <slot name="plainValue" />
    </template>
    <template #notice>
      <slot name="notice" />
    </template>
  </app-form-item>
</template>

<script setup>
const props = defineProps({
  filePath: {
    type: String,
    default: () => undefined,
  },
  fileRulePath: {
    type: String,
    default: () => undefined,
  },
  fileRule: {
    type: [Object, Array, Function],
    default: () => undefined,
  },
})

const uploadRef = shallowRef()
defineEmits(['change'])
defineExpose({
  clear() {
    return uploadRef.value?.clear()
  },
  openOpenFileDialog() {
    return uploadRef.value?.openOpenFileDialog()
  },
  submit(fileId) {
    return uploadRef.value?.submit(fileId)
  },
})
</script>
