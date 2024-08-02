<template>
  <div class="flex flex-col">
    <n-form-item ref="formItemRef" v-bind="mergeAttrs">
      <template v-if="isShowPlainValue">
        <slot name="plainValue" v-bind="{ plainValue }">
          <app-form-plain-text>
            {{ plainValue }}
          </app-form-plain-text>
        </slot>
      </template>
      <template v-else>
        <slot />
      </template>
    </n-form-item>
    <slot v-if="!isShowPlainValue" name="notice" />
  </div>
</template>

<script setup>
import { get, omit } from 'lodash-es'
import { useCurrentElement } from '@vueuse/core'
import { FORM_KEY, FORM_ITEM_MAP_KEY } from './keys'
import { watchEffect } from 'vue'

const props = defineProps({
  readonly: {
    type: Boolean,
    default: () => undefined,
  },
  format: {
    type: Function,
    default: null,
  },
})
const formItemRef = shallowRef()
const attrs = useAttrs()
const appFormProvide = inject(FORM_KEY, undefined, true)
const appFormItemMap = inject(FORM_ITEM_MAP_KEY, undefined, true)
const pathKey = ref()
const el = useCurrentElement()
appFormItemMap?.set(pathKey, el)
watchEffect(() => {
  pathKey.value = attrs.path ?? attrs.rulePath
})
onBeforeUnmount(() => {
  appFormItemMap?.delete(pathKey)
})

const mergeAttrs = computed(() => {
  const result = { ...omit(attrs, ['class']) }
  result.requireMarkPlacement = 'left'
  if (isShowPlainValue.value === true) {
    result.showFeedback = false
    result.showRequireMark = false
  }
  return result
})

const isShowPlainValue = computed(() => {
  if (props.readonly !== undefined) {
    return props.readonly
  }
  return appFormProvide?.readonly
})

const plainValue = computed(() => {
  const value = get(appFormProvide?.model, attrs.path)
  if (props.format) {
    return props.format(value, appFormProvide?.model)
  }
  return value
})

defineExpose({
  validate(options) {
    return formItemRef.value?.validate(options)
  },
})
</script>

<style scoped>
:deep(.n-form-item) .n-form-item-label {
  --n-label-font-size: 1rem;
  background-color: var(--app-form-card-label-bg-color);
}
:deep(.n-form-item-blank):not(.n-form-item-blank--error) + .n-form-item-feedback-wrapper {
  display: none;
}
</style>
