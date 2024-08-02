<template>
  <app-form-item :label="label" :path="path" :rule-path="rulePath" :rule="rule">
    <n-input-group>
      <app-form-select
        v-model:value="valueModel"
        :options="options"
        :loading="isFetching"
        filterable
        @search="value => (searchText = value)"
        @update:value="handleDisplayDepName"
        v-bind="$attrs"
      />
      <app-button small tertiary :disabled="!valueModel" @click="handleDisplayDepName">...</app-button>
    </n-input-group>
  </app-form-item>
</template>

<script setup>
import { find, filter, map } from 'lodash-es'
import { info } from '@/utils/toast'
import { useCategoryCodeList } from '@/api/ptm031u11'

const props = defineProps({
  path: {
    type: String,
    default: () => undefined,
  },
  rulePath: {
    type: String,
    default: () => undefined,
  },
  rule: {
    type: Object,
    default: () => undefined,
  },
  label: {
    type: String,
    default: () => undefined,
  },
})

const valueModel = defineModel('value', {
  type: String,
})
const searchText = ref('')

const { isFetching, data } = useCategoryCodeList()
const originalOptions = computed(() =>
  map(toValue(data), item => ({ value: item.dcCode, label: item.dcName, name: item.depName })),
)
const options = computed(() => {
  const searchTextValue = toValue(searchText)
  if (searchTextValue) {
    return filter(
      toValue(originalOptions),
      item => item.label.includes(searchTextValue) || item.name.includes(searchTextValue),
    )
  } else {
    return [
      {
        label: '請選擇',
        value: '',
      },
      ...toValue(originalOptions),
    ]
  }
})
const handleDisplayDepName = () => {
  const value = toValue(valueModel)
  if (value) {
    const name = find(toValue(options), { value })?.name
    if (name) {
      info(name)
    }
  }
}
</script>
