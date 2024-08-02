<template>
  <n-radio-group v-model:value="valueModel" v-bind="$attrs">
    <slot>
      <n-flex :vertical="vertical">
        <n-radio v-for="item in options" :key="item.value" :value="item.value" :disabled="props.disabled">
          <slot :name="`value(${item.value})`" :label="item.label">
            {{ item.label }}
          </slot>
        </n-radio>
      </n-flex>
    </slot>
  </n-radio-group>
</template>

<script setup>
import { isNil } from 'lodash-es'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  vertical: {
    type: Boolean,
    default: () => false,
  },
  allowEmpty: {
    type: Boolean,
    default: () => false,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
})

const valueModel = defineModel('value', {
  type: [String, Number, Boolean],
})

watchEffect(() => {
  if (props.allowEmpty !== true && props.options?.length > 0) {
    if (props.disabled) {
      valueModel.value = null
    } else if (isNil(valueModel.value)) {
      valueModel.value = props.options?.[0]?.value
    }
  }
})
</script>
