<template>
  <div v-if="!appFormProvide?.readonly" class="flex flex-col lg:flex-row lg:space-x-4">
    <app-form-item :path="passcodePath" :rule-path="passcodeRulePath">
      <n-input
        v-model:value="passcodeModel"
        type="password"
        show-password-on="mousedown"
        placeholder="請輸入密碼"
        :input-props="{
          autocomplete: 'off',
        }"
      />
    </app-form-item>
    <app-form-item :path="confirmPath" :rule-path="confirmRulePath">
      <n-input
        v-model:value="confirmModel"
        type="password"
        show-password-on="mousedown"
        placeholder="請再次輸入密碼"
        :input-props="{
          autocomplete: 'off',
        }"
      />
    </app-form-item>
  </div>
</template>
<script setup>
import { FORM_KEY } from './keys'

const props = defineProps({
  passcodePath: {
    type: String,
    default: () => undefined,
  },
  passcodeRulePath: {
    type: String,
    default: () => undefined,
  },
  confirmPath: {
    type: String,
    default: () => undefined,
  },
  confirmRulePath: {
    type: String,
    default: () => undefined,
  },
})
const passcodeModel = defineModel('passcodeValue', {
  type: String,
})
const confirmModel = defineModel('confirmValue', {
  type: String,
})
const appFormProvide = inject(FORM_KEY)
</script>
