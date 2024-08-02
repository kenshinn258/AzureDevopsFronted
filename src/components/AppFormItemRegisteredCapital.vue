<template>
  <app-form-item
    label="是否有登記資本額"
    :path="haveRegisteredPath"
    :rule-path="haveRegisteredRulePath"
  >
    <n-radio-group
      v-model:value="haveRegisteredModel"
      @update:value="
        (value) => {
          if (value === '2') {
            registeredCapitalModel = 0;
          }
        }
      "
    >
      <div class="inline-flex flex-row space-x-1">
        <n-radio value="1" label="是" />
        <n-radio value="2" label="否" />
      </div>
    </n-radio-group>
  </app-form-item>

  <app-form-item-capital
    v-if="haveRegisteredModel === '1'"
    v-model:capital-value="registeredCapitalModel"
    :capital-path="registeredCapitalPath"
    :capital-rule-path="registeredCapitalRulePath"
  />
</template>

<script setup>
const props = defineProps({
  haveRegisteredPath: {
    type: String,
    default: () => undefined,
  },
  haveRegisteredRulePath: {
    type: String,
    default: () => undefined,
  },
  registeredCapitalPath: {
    type: String,
    default: () => undefined,
  },
  registeredCapitalRulePath: {
    type: String,
    default: () => undefined,
  },
});

const haveRegisteredModel = defineModel("haveRegisteredValue", {
  type: String,
});
const registeredCapitalModel = defineModel("registeredCapitalValue", {
  type: Number,
});
</script>
