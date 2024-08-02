<template>
  <app-form-item :path="schoolCodePath" :rule-path="schoolCodeRulePath" :rule="schoolCodeRule">
    <n-select
      v-model:value="schoolCodeModel"
      :options="schoolOptions"
      :loading="isFetching"
      placeholder="請選擇學校"
      filterable
      :filter="(pattern, option) => option?.label?.includes(pattern)"
    />
  </app-form-item>
  <app-form-item
    v-if="isManualSchoolName"
    :path="schoolNamePath"
    :rule-path="schoolNameRulePath"
    :rule="schoolNameRule"
  >
    <n-input-group>
      <n-input v-model:value="schoolNameModel" />
      <span class="text-gray-06 pl-4 break-keep self-center">
        (請輸入其它國{{ schoolCodeModel === 'SCHZ99' ? '內' : '外' }}校名)
      </span>
    </n-input-group>
  </app-form-item>
</template>

<script setup>
import { find } from 'lodash-es'
import { lookupSchoolOptions } from '@/utils/preload'

const props = defineProps({
  schoolCodePath: {
    type: String,
    default: () => undefined,
  },
  schoolCodeRulePath: {
    type: String,
    default: () => undefined,
  },
  schoolCodeRule: {
    type: Object,
    default: () => undefined,
  },
  schoolNamePath: {
    type: String,
    default: () => undefined,
  },
  schoolNameRulePath: {
    type: String,
    default: () => undefined,
  },
  schoolNameRule: {
    type: Object,
    default: () => undefined,
  },
})

const schoolCodeModel = defineModel('schoolCodeValue', {
  type: String,
})
const schoolNameModel = defineModel('schoolNameValue', {
  type: String,
})
const { isFetching, data: schoolOptions } = lookupSchoolOptions()
const isManualSchoolName = computed(() => ['SCHZ99', ''].includes(schoolCodeModel.value))

watchEffect(() => {
  schoolNameModel.value = toValue(isManualSchoolName)
    ? ''
    : find(toValue(schoolOptions), item => item.value === toValue(schoolCodeModel))?.label ?? ''
})
</script>
