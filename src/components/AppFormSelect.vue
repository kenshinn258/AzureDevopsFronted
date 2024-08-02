<template>
  <n-select
    v-model:value="valueModel"
    :disabled="disabled"
    :default-value="resolvedOptions?.[0]?.value"
    :options="resolvedOptions"
    v-bind="$attrs"
  />
</template>

<script setup>
import { isNil, filter as _filter } from 'lodash-es'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: () => false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  filter: {
    type: Function,
    default: () => true,
  },
})

const valueModel = defineModel('value', {
  type: [Array, String, Number],
})
const resolvedOptions = computed(() => _filter(props.options, props.filter))

watchEffect(() => {
  if (props.options?.length > 0) {
    if (props.disabled) {
      valueModel.value = null
    } else if (isNil(valueModel.value)) {
      valueModel.value = props.options?.[0]?.value
    }
  }
})
</script>
