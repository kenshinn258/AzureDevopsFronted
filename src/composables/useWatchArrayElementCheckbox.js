import { filter, forEach, isArray, isBoolean, map, omit } from 'lodash-es'

const defaultConfig = {
  checkedPropName: 'checked',
  defaultValue: false,
}

export const useWatchArrayElementCheckbox = (target, config) => {
  const resolvedConfig = Object.assign({}, defaultConfig, config)
  const arrayRef = toRef(target)

  const handleCheckAll = () => {
    forEach(toValue(arrayRef), item => {
      item.checked = true
    })
  }
  const handleUncheckAll = () => {
    forEach(toValue(arrayRef), item => {
      item.checked = false
    })
  }

  const checkedValues = computed(() =>
    map(filter(toValue(arrayRef), resolvedConfig.checkedPropName), item =>
      omit(item, [resolvedConfig.checkedPropName]),
    ),
  )
  const checkedCount = computed(() => checkedValues.value?.length || 0)
  const groupChecked = computed({
    get() {
      return checkedCount.value > 0 && checkedCount.value === toValue(arrayRef).length
    },
    set(checked) {
      checked ? handleCheckAll() : handleUncheckAll()
    },
  })
  const isGroupIndeterminate = computed(
    () => toValue(arrayRef).length > 0 && checkedCount.value > 0 && checkedCount.value < toValue(arrayRef).length,
  )

  watchEffect(() => {
    const arrayValue = toValue(arrayRef)
    if (isArray(arrayValue)) {
      forEach(arrayValue, item => {
        if (!isBoolean(item[resolvedConfig.checkedPropName])) {
          item[resolvedConfig.checkedPropName] = resolvedConfig.defaultValue
        }
      })
    }
  })

  return {
    arrayRef,
    checkedValues,
    checkedCount,
    groupChecked,
    isGroupIndeterminate,
    handleCheckAll,
    handleUncheckAll,
  }
}
