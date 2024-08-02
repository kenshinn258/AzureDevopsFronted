<template>
  <n-data-table v-bind="bindProps">
    <template #empty>
      <n-empty :description="emptyMessage" />
    </template>
  </n-data-table>
</template>

<script setup>
import { Text } from 'vue'
import { isFunction, isNil } from 'lodash-es'

const props = defineProps({
  emptyMessage: {
    type: String,
    default: () => '無資料',
  },
})

const slots = useSlots()
const attrs = useAttrs()
const bindProps = computed(() => {
  const tableProps = {
    renderCell: (value, rowData, column) => {
      if (isFunction(slots[`cell(${column.key})`])) {
        return h(slots[`cell(${column.key})`], { value, rowData, column })
      }
      const unit = column.unit || ''
      return h(
        Text,
        isFunction(column.displayText)
          ? column.displayText(rowData)
          : isNil(value)
            ? (column.defaultText ?? '')
            : `${value}${unit}`,
      )
    },
    striped: true,
    ...attrs,
  }
  return tableProps
})
</script>

<style scoped>
:deep(.n-data-table-th__title) {
  @apply whitespace-pre text-center break-keep;
}
:deep(.n-data-table-td) {
  @apply whitespace-pre-wrap;
}
:deep(.n-data-table-td--last-row.n-data-table-td--summary) {
  @apply !bg-primary-05 !text-left;
}
</style>
