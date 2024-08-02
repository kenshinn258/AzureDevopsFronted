import { toValue } from '@vueuse/core'
import { cloneDeep, forEach, get, isNil, map, pick } from 'lodash-es'

const defaultInitialModel = {
  page: 1,
  pageSize: 15,
  // pageCount: 1,
  itemCount: 0,
}
const defaultPaginationModelKeys = Object.keys(defaultInitialModel)

export const usePagination = initialValue => {
  const showPrefix = ref(false)
  const initialModel = Object.assign(
    {},
    {
      prefix: ({ page, pageCount, itemCount }) => {
        if (showPrefix.value) {
          return itemCount > 0 ? `目前顯示第${page}頁，共有${pageCount}頁${itemCount}筆資料 ` : '共有0筆資料'
        }
        return ''
      },
    },
    defaultInitialModel,
    pick(toValue(initialValue), defaultPaginationModelKeys),
  )
  const paginationModel = ref(initialModel)

  const updatePaginationPage = currentPage => {
    paginationModel.value.page = currentPage
  }

  const mergePaginationParameter = parameter => {
    const paginationValue = toValue(paginationModel)
    return Object.assign(
      {},
      {
        page: paginationValue.page,
        size: paginationValue.pageSize,
      },
      toValue(parameter),
    )
  }

  const resetPaginationModel = () => {
    forEach(defaultPaginationModelKeys, key => {
      paginationModel.value[key] = initialModel[key]
    })
  }

  const extractPaginationContent = paginationWrap => {
    const value = toValue(paginationWrap)
    const content = cloneDeep(get(value, 'content'))
    const offset = (value?.offset || 0) + 1
    const list = map(content, (item, index) => {
      const safe = item ?? {}
      safe.$$RowNumber = index + offset
      safe.$$RowIndex = index
      return safe
    })
    showPrefix.value = !isNil(content)
    if (list.length > 0) {
      paginationModel.value.page = value.number
      paginationModel.value.pageSize = value.size
      // paginationModel.value.pageCount = value.totalPages
      paginationModel.value.itemCount = value.total
    } else {
      resetPaginationModel()
    }
    return list
  }

  return {
    paginationModel,
    updatePaginationPage,
    mergePaginationParameter,
    extractPaginationContent,
    resetPaginationModel,
  }
}
