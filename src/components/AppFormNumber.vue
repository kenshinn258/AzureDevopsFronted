<template>
  <n-input-number
    class="w-full"
    :class="props.class"
    :show-button="false"
    :default-value="0"
    :parse="value => parseInt(value) || 0"
    :min="0"
    :max="999999999"
    :disabled="props.disabled"
    v-bind="$attrs"
    @focus="handleFocus"
  >
    <template v-if="prefix" #prefix>
      <span class="mr-2">{{ prefix }}</span>
    </template>
    <template v-if="suffix" #suffix>
      <span class="ml-2">{{ suffix }}</span>
    </template>
    <template v-for="(slotName, slotIndex) in slotNames" :key="slotIndex" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </n-input-number>
</template>

<script setup>
const props = defineProps({
  prefix: {
    type: String,
    default: () => undefined,
  },
  suffix: {
    type: String,
    default: () => undefined,
  },
  class: {
    type: String,
    default: () => '',
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
})

const slots = useSlots()
const slotNames = computed(() => {
  return Object.keys(slots).filter(
    key => key !== (props.prefix ? 'prefix' : '') && key !== (props.suffix ? 'suffix' : ''),
  )
})
const handleFocus = event => {
  if (event.target.value === '0') {
    setTimeout(() => {
      event.target.select()
    }, 10)
  }
}
</script>
