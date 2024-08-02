<template>
  <n-input v-model:value="valueModel" :allow-input="allowInput" v-bind="$attrs">
    <template v-for="(slotName, slotIndex) in slotNames" :key="slotIndex" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </n-input>
</template>

<script setup>
const props = defineProps({
  tel: {
    type: Boolean,
    default: () => false,
  },
  ext: {
    type: Boolean,
    default: () => false,
  },
  upper: {
    type: Boolean,
    default: () => false,
  },
  lower: {
    type: Boolean,
    default: () => false,
  },
})

const valueModel = defineModel('value', {
  type: [String, Number],
})
const slots = useSlots()
const slotNames = computed(() => Object.keys(slots))

watchEffect(() => {
  const value = toValue(valueModel)
  if (props.upper) {
    valueModel.value = value?.toUpperCase()
  }
  if (props.lower) {
    valueModel.value = value?.toLowerCase()
  }
})

const allowInput = value => {
  if (props.tel) {
    return !value || /^[\d-]+$/.test(value)
  } else if (props.ext) {
    return !value || /^\d+$/.test(value)
  }
  return true
}
</script>
