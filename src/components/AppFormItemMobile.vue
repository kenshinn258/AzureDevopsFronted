<template>
  <template v-if="appFormProvide?.readonly">
    <app-form-item-plain-text>
      {{ mobileModel }}
    </app-form-item-plain-text>
  </template>
  <template v-else>
    <app-form-item :path="mobilePath" :rule-path="mobileRulePath">
      <n-input
        v-model:value="mobileModel"
        v-maska
        placeholder="請輸入手機"
        :input-props="{
          'data-maska': '09##-######',
        }"
      />
      <template #notice>
        <span>如 0919-123456</span>
      </template>
    </app-form-item>
  </template>
</template>

<script setup>
import { vMaska } from "maska";
import { FORM_KEY } from "./keys";

const props = defineProps({
  mobilePath: {
    type: String,
    default: () => undefined,
  },
  mobileRulePath: {
    type: String,
    default: () => undefined,
  },
});
const mobileModel = defineModel("mobileValue", {
  type: String,
});

const appFormProvide = inject(FORM_KEY);
</script>
