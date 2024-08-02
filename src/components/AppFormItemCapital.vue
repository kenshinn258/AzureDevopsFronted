<template>
  <app-form-item :path="capitalPath" :rule-path="capitalRulePath">
    <app-form-number
      v-model:value="capitalModel"
      placeholder="請輸入資本額"
      prefix="新台幣"
      suffix="仟元"
      :max="props.max"
      :class="props.class"
      :disabled="props.disabled"
    />
    <template #notice>
      <span :style="props.style">屬非民間產業及律師事務所、會計師事務所者免填。</span>
    </template>
  </app-form-item>
</template>

<script setup>
const props = defineProps({
  capitalPath: {
    type: String,
    default: () => undefined,
  },
  capitalRulePath: {
    type: String,
    default: () => undefined,
  },
  max: {
    type: Number,
    default: () => 999999999,
  },
  style: {
    type: String,
    default: () => "",
  },
  class: {
    type: String,
    default: () => "",
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
});

const capitalModel = defineModel("capitalValue", {
  type: Number,
});
</script>
