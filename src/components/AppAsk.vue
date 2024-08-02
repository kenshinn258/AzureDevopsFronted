<template>
  <n-popconfirm
    positive-text="確定"
    negative-text="取消"
    :positive-button-props="{ color: buttonColorStore.primary.bg }"
    @positive-click="handlePositiveClick"
    @negative-click="handlenNegativeClick"
    v-bind="bindPopconfirmObject"
  >
    <template #icon>
      <n-icon class="text-red-02">
        <icon-fa-question />
      </n-icon>
    </template>
    <template #trigger>
      <slot v-bind="bindTriggerObject" />
    </template>
    <span class="text-base">{{ askMessage }}</span>
  </n-popconfirm>
</template>

<script setup>
const props = defineProps({
  askMessage: {
    type: String,
    default: () => null,
  },
})
const emit = defineEmits(['positive-click', 'negative-click'])

const attrs = useAttrs()
const manualShow = ref(false)
const buttonColorStore = useAppButtonColorStore()
const isManual = computed(() => attrs?.trigger === 'manual')
const bindPopconfirmObject = computed(() => {
  const customAttrs = {}
  if (toValue(isManual)) {
    customAttrs.show = toValue(manualShow)
  }
  return { ...attrs, ...customAttrs }
})
const bindTriggerObject = computed(() => {
  const customAttrs = {}
  if (toValue(isManual)) {
    customAttrs.manualTrigger = (show = true) => {
      manualShow.value = show
    }
  }
  return customAttrs
})

const handlePositiveClick = () => {
  manualShow.value = false
  emit('positive-click')
}
const handlenNegativeClick = () => {
  manualShow.value = false
  emit('negative-click')
}
</script>
