<template>
  <app-form-item :path="faxPath" :rule-path="faxRulePath">
    <n-input
      v-model:value="faxModel"
      v-maska
      placeholder="請輸入傳真"
      :input-props="{
        'data-maska': '0#-####-####',
      }"
    />
    <template #plainValue>
      <app-form-plain-text>
        {{ faxModel }}
      </app-form-plain-text>
    </template>
    <template #notice>
      <span>如 02-1234-5678</span>
    </template>
  </app-form-item>
</template>

<script setup>
import { vMaska } from "maska";
import { FORM_KEY } from "./keys";

const props = defineProps({
  faxPath: {
    type: String,
    default: () => undefined,
  },
  faxRulePath: {
    type: String,
    default: () => undefined,
  },
});
const faxModel = defineModel("faxValue", {
  type: String,
});

const appFormProvide = inject(FORM_KEY);
</script>
