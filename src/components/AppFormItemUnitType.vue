<template>
  <template v-if="!props.readOnly">
    <app-form-item
      :path="pTypePath"
      :rule-path="pTypeRulePath"
      :label="props.label ? '產業類別' : ''"
    >
      <n-select
        v-model:value="pTypeModel"
        :options="industryOptions"
        :loading="isFetching"
        placeholder="請選擇產業類別"
        @update:value="() => (rTypeModel = null)"
        :disabled="props.utype !== '05' && !props.label"
        :style="props.label ? '' : 'width: 200px'"
      />
    </app-form-item>
    <app-form-item
      :path="rTypePath"
      :rule-path="rTypeRulePath"
      :label="props.label ? '適用範圍' : ''"
    >
      <n-select
        v-model:value="rTypeModel"
        :options="rTypeOptions"
        :loading="isFetching"
        placeholder="請選擇適用範圍"
        v-if="
          (pTypeModel === '04' && !props.label && props.utype === '05') || props.label
        "
        :style="props.label ? '' : 'width: 200px'"
      />
    </app-form-item>
    <app-form-item
      v-if="
        !!rType2Path &&
        (props.label ||
          (!props.label && rType2Option?.subOptions.length > 0 && props.utype === '05'))
      "
      :path="rType2Path"
      :rule-path="rType2RulePath"
      :label="props.label ? '服務類別' : ''"
    >
      <n-select
        v-model:value="rType2Model"
        :options="rType2Option?.subOptions"
        :loading="isFetching"
        :placeholder="`${rType2Option ? rType2Option?.label + '，' : ''}請選擇服務類別`"
        :fallback-option="false"
        :style="props.label ? '' : 'width: 200px'"
      />
    </app-form-item>
  </template>
  <div
    v-else
    class="flex"
    :style="`flex-direction: ${props.hasRtype ? 'row' : 'column'}`"
  >
    <app-form-item-plain-text class="px-1">{{
      industryOptions.find((f) => f.value === pTypeModel)?.label
    }}</app-form-item-plain-text>
    <template v-if="props.hasRtype">
      <app-form-item-plain-text class="px-1">{{
        rTypeOptions?.find((f) => f.value === rTypeModel)?.label
      }}</app-form-item-plain-text>
      <app-form-item-plain-text class="px-1">{{
        rType2Option?.subOptions.find((f) => f.value === rType2Model)?.label
      }}</app-form-item-plain-text>
    </template>
    <template v-else>
      <app-form-select v-model:value="rTypeModel" :options="nonRTypeOpts" />
      <!-- 改 call api -->
      <app-link file-id="1241">適用範圍說明</app-link>
      <app-form-select
        v-if="rType2Option?.subOptions.length > 0"
        v-model:value="rType2Model"
        :options="rType2Option?.subOptions"
      />
    </template>
  </div>
</template>

<script setup>
import { lookupIndustryOptions } from "@/utils/preload";

const props = defineProps({
  pTypePath: {
    type: String,
    default: () => "pType",
  },
  pTypeRulePath: {
    type: String,
    default: () => undefined,
  },
  rTypePath: {
    type: String,
    default: () => undefined,
  },
  rTypeRulePath: {
    type: String,
    default: () => undefined,
  },
  rType2Path: {
    type: String,
    default: () => undefined,
  },
  rType2RulePath: {
    type: String,
    default: () => undefined,
  },
  label: {
    type: Boolean,
    default: () => true,
  },
  readOnly: {
    type: Boolean,
    default: () => false,
  },
  hasRtype: {
    type: Boolean,
    default: () => false,
  },
  utype: {
    type: String,
    default: () => "05",
  },
});

const pTypeModel = defineModel("pTypeValue", {
  type: String,
});
const rTypeModel = defineModel("rTypeValue", {
  type: String,
});
const rType2Model = defineModel("rType2Value", {
  type: String,
});
const { isFetching, data: industryOptions } = lookupIndustryOptions();

const rTypeOptions = computed(() => {
  return industryOptions.value?.find((o) => o.value === pTypeModel.value)?.subOptions;
});
const rType2Option = computed(() => {
  return rTypeOptions.value?.find((o) => o.value === rTypeModel.value);
});
const nonRTypeOpts = computed(() => {
  let arr = [{ label: "民間產業單位，請選擇工作範圍適用類別", value: "" }];
  rTypeOptions.value?.forEach((e) => {
    arr.push(e);
  });
  return arr;
});
</script>
