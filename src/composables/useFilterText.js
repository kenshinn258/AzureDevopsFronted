import { computed, unref } from 'vue'
export const useFilterText = (list, text, searchKeyList) => {
  const searchList = computed(() => unref(list) ?? [])
  const searchText = computed(() => unref(text)?.toLocaleUpperCase() ?? '')
  const searchKeys = computed(() => unref(searchKeyList) ?? [])

  const result = computed(() => {
    if (!searchText.value || !searchKeys.value.length) return searchList.value
    return searchList.value.filter(item => {
      return searchKeys.value.some(key => {
        const targetText = item?.[key]?.toLocaleUpperCase() ?? ''
        if (!targetText) return false
        return targetText.includes(searchText.value)
      })
    })
  })

  return { result }
}
