<template>
  <table
    class="app-table"
    :class="{
      striped: striped,
      'single-line': singleLine,
      small: small,
      'app-center': center,
      'th-break-keep': thBreakKeep,
      'td-break-keep': tdBreakKeep,
      'table-fixed': fixed,
      'th-highlight': highlight,
    }"
    v-bind="$attrs"
  >
    <caption
      v-if="subtitle || count >= 0 || !!$slots.caption || !!$slots.subtitle || !!$slots.count"
      class="text-left caption-top"
    >
      <slot :subtitle="subtitle" :count="count" name="caption">
        <div class="flex flex-row font-semibold text-sm">
          <div class="whitespace-pre-wrap grow">
            <slot v-if="subtitle || !!$slots.subtitle" name="subtitle" :subtitle="subtitle">
              {{ subtitle }}
            </slot>
          </div>
          <span class="ml-auto self-end">
            <slot v-if="count || !!$slots.count" name="count" :count="count"> 共&nbsp;{{ count }}&nbsp;筆 </slot>
          </span>
        </div>
      </slot>
    </caption>
    <tbody v-if="loading">
      <tr>
        <td colspan="100%" style="text-align: center; height: 40px">
          <app-loading :loading="loading"></app-loading>
        </td>
      </tr>
    </tbody>
    <slot v-else />
  </table>
  <n-pagination
    v-if="pagination"
    class="mt-4 justify-end"
    :page="pagination.page"
    :page-size="pagination.pageSize"
    :item-count="pagination.itemCount"
    @update:page="page => $emit('update:page', page)"
  />
</template>

<script setup>
const props = defineProps({
  striped: {
    type: Boolean,
    default: () => false,
  },
  singleLine: {
    type: Boolean,
    default: () => false,
  },
  small: {
    type: Boolean,
    default: () => false,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  center: {
    type: Boolean,
    default: () => false,
  },
  autoLayout: {
    type: Boolean,
    default: () => false,
  },
  fixed: {
    type: Boolean,
    default: () => false,
  },
  highlight: {
    type: Boolean,
    default: () => false,
  },
  pagination: {
    type: Object,
    required: false,
    default: () => undefined,
  },
  thBreakKeep: {
    type: Boolean,
    default: () => true,
  },
  tdBreakKeep: {
    type: Boolean,
    default: () => false,
  },
  count: {
    type: Number,
    default: () => undefined,
  },
  subtitle: {
    type: String,
    default: () => undefined,
  },
})

defineEmits(['update:page'])
</script>

<style>
.app-table {
  font-size: theme('fontSize.base');
}
.app-table th {
  text-align: center;
}
.app-table.th-break-keep th {
  @apply break-keep whitespace-pre;
}
.app-table.td-break-keep td {
  @apply break-keep whitespace-pre;
}
.app-table td {
  text-align: left;
}
.app-table.app-center td {
  text-align: center;
}
.app-table .app-center {
  text-align: center;
}
.app-table .app-left {
  text-align: left !important;
}
.app-table .app-right {
  text-align: right !important;
}
.app-table tbody td.app-ellipsis {
  @apply text-ellipsis overflow-hidden whitespace-nowrap;
}
.app-table th {
  color: theme('colors.white');
  white-space: pre-line;
}
.app-table:not(.th-highlight) th {
  background-color: theme('colors.primary.06');
}
.app-table.th-highlight th {
  @apply bg-orange-600;
}
.app-table tfoot th {
  background-color: theme('colors.primary.05');
  color: theme('colors.white');
  white-space: pre-line;
}
.app-table th,
.app-table td {
  padding: 12px 16px;
}
.app-table.small th,
.app-table.small td {
  padding: 4px;
}
.app-table.striped tbody tr:nth-child(even) {
  background-color: theme('colors.gray.08');
}
.app-table.single-line tr:not(:last-child) td {
  border-bottom: 1px solid theme('colors.gray.03');
}
.app-table tr.app-highlight td {
  background-color: theme('colors.red.02');
  color: white;
}
.app-table:not(.single-line) {
  border-collapse: collapse;
  border: 1px solid theme('colors.gray.03');
}
.app-table:not(.single-line) th,
.app-table:not(.single-line) td {
  border: 1px solid theme('colors.gray.03');
}
.app-table th[required]:not(th[required='false'])::before {
  content: '＊';
  color: theme('colors.red.02');
  margin-left: 4px;
  vertical-align: middle;
}
</style>
