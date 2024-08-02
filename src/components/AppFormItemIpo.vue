<template>
  <div class="flex flex-col lg:flex-row">
    <app-form-item :path="fnTypePath" :rule-path="fnTypeRulePath">
      <n-radio-group
        v-model:value="fnTypeModel"
        @update:value="() => (stockNoModel = null)"
      >
        <div class="inline-flex flex-col lg:flex-row lg:space-x-1">
          <n-radio value="TSE">上市</n-radio>
          <n-radio value="OTC1">上櫃</n-radio>
          <n-radio value="OTC2">興櫃</n-radio>
          <n-radio value="PP">公開發行</n-radio>
          <n-radio value="NO">無</n-radio>
        </div>
      </n-radio-group>
    </app-form-item>
    <app-form-item
      v-if="isRequiredStockNo"
      label="股票代碼"
      :path="stockNoPath"
      :rule-path="stockNoRulePath"
    >
      <n-input v-model:value="stockNoModel" placeholder="請輸入股票代號" />
    </app-form-item>
  </div>
</template>

<script setup>
const props = defineProps({
  fnTypePath: {
    type: String,
    default: () => undefined,
  },
  fnTypeRulePath: {
    type: String,
    default: () => undefined,
  },
  stockNoPath: {
    type: String,
    default: () => undefined,
  },
  stockNoRulePath: {
    type: String,
    default: () => undefined,
  },
});

const fnTypeModel = defineModel("fnTypeValue", {
  type: String,
});
const stockNoModel = defineModel("stockNoValue", {
  type: String,
});

const isRequiredStockNo = computed(() =>
  ["TSE", "OTC1", "OTC2"].includes(fnTypeModel.value)
);
</script>
