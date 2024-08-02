<template>
  <n-card class="w-full py-2" :class="{ 'lg:max-w-5xl': !full, 'mx-auto': center }">
    <app-loading :loading="loading">
      <n-form ref="formRef" label-placement="left" :show-require-mark="false" class="flex flex-col" v-bind="$attrs">
        <slot />
        <template v-if="slots.action">
          <!-- <hr class="h-px my-4 bg-blue-100" /> -->
          <div class="flex flex-wrap items-center justify-center space-x-4 my-4 pt-4">
            <slot name="action" />
          </div>
        </template>
      </n-form>

      <slot name="description" />
    </app-loading>
  </n-card>
</template>

<script setup>
import { forEach, get, isArray, keys, set } from 'lodash-es'
import { FORM_ITEM_MAP_KEY, FORM_KEY } from './keys'

const props = defineProps({
  readonly: {
    type: Boolean,
    default: () => false,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  full: {
    type: Boolean,
    default: () => false,
  },
  center: {
    type: Boolean,
    default: () => false,
  },
})

const attrs = useAttrs()
const slots = useSlots()
const formRef = shallowRef()
const appFormProvide = reactive({
  showPlainText: undefined,
  model: undefined,
})
const appFormItemMap = new Map()
watchEffect(() => {
  appFormProvide.readonly = props.readonly
  appFormProvide.model = attrs.model
})
provide(FORM_KEY, appFormProvide)
provide(FORM_ITEM_MAP_KEY, appFormItemMap)
const scrollIntoItem = pathKey => {
  for (const [mapKey, mapValue] of appFormItemMap.entries()) {
    if (mapKey.value === pathKey) {
      mapValue?.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      })
      return
    }
  }
}
onBeforeUnmount(() => {
  appFormItemMap.clear()
})

defineExpose({
  validate(validateCallback, shouldRuleBeApplied) {
    return formRef.value?.validate(validateCallback, shouldRuleBeApplied).catch(errors => {
      if (isArray(errors) && errors.length > 0) {
        scrollIntoItem(errors[0]?.[0]?.field)
      }
      return Promise.reject(errors)
    })
  },
  restoreValidation() {
    return formRef.value?.restoreValidation()
  },
  resetFormModel(initializationValue) {
    const initValue = toValue(initializationValue)
    if (isArray(attrs.model)) {
      attrs.model.splice(0, attrs.model.length, ...initValue)
    } else {
      forEach(keys(attrs.model), key => {
        set(attrs.model, key, get(initValue, key, null))
      })
    }
    this.restoreValidation()
  },
})
</script>
