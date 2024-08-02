<template>
  <n-upload
    class="app-upload"
    :headers="headers"
    v-bind="$attrs"
    @error="handleUploadError"
    @change="val => $emit('change', val)"
  >
    <template v-for="(slotKey, slotIndex) in slotKeys" :key="slotIndex" #[slotKey]>
      <slot :name="slotKey"></slot>
    </template>
  </n-upload>
</template>

<script setup>
import { get } from 'lodash-es'
import { useAuthStore } from '@/store/auth'
import { failure } from '@/utils/toast'

defineEmits(['change'])
const slotKeys = Object.keys(useSlots())
const authStore = useAuthStore()
const headers = computed(() => {
  return {
    Authorization: `Bearer ${authStore.token}`,
  }
})
const handleUploadError = ({ file, event }) => {
  const { name } = file
  failure(`上傳 ${name} 發生 ${get(event, [('target', 'response', 'message')], '錯誤')}`)
}
</script>

<style>
.app-upload .n-upload-trigger {
  width: 100%;
}
.n-form-item-blank--error .app-upload {
  border-color: theme('colors.red.02');
  border-width: 1px;
  border-radius: var(--n-border-radius);
}
</style>
