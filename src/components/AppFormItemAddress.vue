<template>
  <template v-if="appFormProvide?.readonly">
    <app-form-item-plain-text> {{ zipMapping[zipModel] }}{{ addressModel }} </app-form-item-plain-text>
  </template>
  <template v-else>
    <app-form-item class="lg:w-1/4" :path="zipPath" :rule-path="zipRulePath">
      <n-select v-model:value="zipModel" :options="zipOptions" placeholder="請選擇郵遞區號" />
    </app-form-item>
    <app-form-item class="grow" :path="addressPath" :rule-path="addressRulePath">
      <n-input v-model:value="addressModel" placeholder="請輸入地址" />
      <template #notice>
        <slot name="notice">
          <span v-if="showNotice">郵遞區號、縣市、鄉鎮市區名稱不需重複輸入</span>
        </slot>
      </template>
    </app-form-item>
  </template>
</template>

<script setup>
import { computedEager } from '@vueuse/core'
import { lookupZipOptions } from '@/utils/preload'
import { FORM_KEY } from './keys'

defineProps({
  zipPath: {
    type: String,
    default: () => undefined,
  },
  zipRulePath: {
    type: String,
    default: () => undefined,
  },
  addressPath: {
    type: String,
    default: () => undefined,
  },
  addressRulePath: {
    type: String,
    default: () => undefined,
  },
  showNotice: {
    type: Boolean,
    default: () => true,
  },
})
const zipModel = defineModel('zipValue', {
  type: Number,
})
const addressModel = defineModel('addressValue', {
  type: String,
})

const appFormProvide = inject(FORM_KEY)
const { data: zipOptions } = lookupZipOptions()
const zipMapping = computedEager(() => {
  const mapping = {}
  zipOptions.value.forEach(item => {
    mapping[item.value] = item.label
  })
  return mapping
})
</script>
