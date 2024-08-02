<template>
  <div
    class="border-l-4 border-solid shadow-md rounded-md flex items-center w-fit bg-white"
    aria-live="assertive"
    aria-atomic="true"
    style="max-width: calc(100vw - 32px)"
    :class="{
      'border-green-01': type === 'success',
      'border-red-01': type === 'error',
      'border-blue-01': type === 'info',
    }"
  >
    <div class="flex flex-row max-w-screen-lg p-3">
      <img class="w-6 me-2" :src="icon" alt="" />
      <div class="mx-2 break-words inline-flex flex-col">
        <span
          v-for="(titleValue, itemIndex) in isArray(title) ? title : [title]"
          :key="itemIndex"
          v-clean-html="titleValue"
          class="text-base font-medium"
          :class="{
            'text-green-02': type === 'success',
            'text-red-02': type === 'error',
            'text-blue-02': type === 'info',
          }"
        />
        <span
          v-for="(contentValue, itemIndex) in isArray(content) ? content : [content]"
          :key="itemIndex"
          v-clean-html="contentValue"
          class="text-xs"
        />
        <span v-if="content?.length > 0 && type !== 'error'" class="text-xs ml-auto">(3秒自動關閉)</span>
      </div>
      <button
        type="button"
        class="app-toast-close ml-8 my-auto"
        aria-label="Close"
        @click="() => $emit('close')"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { isArray } from 'lodash-es'
import { buildVueDompurifyHTMLDirective } from 'vue-dompurify-html'
import SuccessIcon from '@/assets/images/icon-toast-success.svg'
import InfoIcon from '@/assets/images/icon-toast-info.svg'
import ErrorIcon from '@/assets/images/icon-toast-error.svg'

const props = defineProps({
  type: {
    type: String,
    default: () => 'success',
  },
  title: {
    type: [String, Array],
    default: () => '',
  },
  content: {
    type: [String, Array],
    default: () => [],
  },
})

defineEmits(['close'])

const vCleanHtml = buildVueDompurifyHTMLDirective()
const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return SuccessIcon
    case 'info':
      return InfoIcon
    case 'error':
      return ErrorIcon
    default:
      return null
  }
})
</script>
<style scoped>
.app-toast-close {
  --app-toast-close-bg: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="32" height="32" viewBox="0 0 1216 1312"%3E%3Cpath fill="%23eaeaea" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68z"%2F%3E%3C%2Fsvg%3E');
  --app-toast-close-opacity: 0.5;
  --app-toast-close-hover-opacity: 0.75;
  --app-toast-close-focus-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  --app-toast-close-focus-opacity: 1;
  --app-toast-close-disabled-opacity: 0.25;
  --app-toast-close-white-filter: invert(1) grayscale(100%) brightness(200%);
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  background: transparent var(--app-toast-close-bg) center/1em auto no-repeat;
  border: 0;
  border-radius: 0.375rem;
  opacity: var(--app-toast-close-opacity);
}
.app-toast-close:hover {
  text-decoration: none;
  opacity: var(--app-toast-close-hover-opacity);
}
.app-toast-close:focus {
  outline: 0;
  box-shadow: var(--app-toast-close-focus-shadow);
  opacity: var(--app-toast-close-focus-opacity);
}
</style>
