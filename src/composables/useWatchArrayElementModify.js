import { cloneDeep, concat, forEach, get, isEqualWith, map, reduce, set, unset } from 'lodash-es'
import { watchDebounced } from '@vueuse/core'

const isEqualCustomizer = (value, other) => {
  const ignoreValues = ['', null, undefined]
  if (ignoreValues.includes(value) && ['', null, undefined].includes(other)) {
    return true
  }
}
export const useWatchArrayElementModify = (
  array,
  toKeyValue = item => item?.id,
  modifyFlageName = 'isModify',
  ignorePaths = [],
) => {
  const model = ref([])
  const omitPaths = concat(ignorePaths, modifyFlageName)
  const snapshot = shallowRef(null)
  const resetArray = newValue => {
    model.value = []
    snapshot.value = []
    const resolveValue = cloneDeep(toValue(newValue ?? array))
    nextTick(() => {
      model.value = resolveValue
    })
  }
  watchDebounced(
    model,
    () => {
      snapshot.value = map(toValue(model), item => {
        const value = cloneDeep(item)
        forEach(omitPaths, path => unset(value, path) || true)
        return value
      })
    },
    { deep: true, debounce: 500, maxWait: 1000 },
  )
  watchPostEffect(() => {
    resetArray()
  })
  watch(snapshot, (newValue, oldValue) => {
    if (newValue?.length === oldValue?.length) {
      const oldValueIndex = reduce(
        oldValue,
        (acc, item) => {
          acc[toKeyValue(item)] = item
          return acc
        },
        {},
      )
      forEach(newValue, (item, index) => {
        const key = toKeyValue(item)
        const modifyPath = [index, modifyFlageName]
        if (get(model.value, modifyPath) !== true && !isEqualWith(item, oldValueIndex[key], isEqualCustomizer)) {
          set(model.value, modifyPath, true)
        }
      })
    }
  })
  return {
    model,
    resetArray,
  }
}
