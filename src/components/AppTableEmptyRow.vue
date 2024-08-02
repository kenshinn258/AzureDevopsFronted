<template>
  <tr empty>
    <td :colspan="maxcols" style="text-align: center; height: 40px">
      <n-empty class="my-4" :description="text" />
    </td>
  </tr>
</template>

<script setup>
import { useCurrentElement } from '@vueuse/core'

const props = defineProps({
  text: {
    type: String,
    default: () => '查無資料',
  },
})

const elRef = useCurrentElement()
const maxcols = computed(() => {
  const el = elRef.value
  let max = 1
  if (el) {
    for (const tr of el.closest('table').querySelectorAll('tr:not([empty])')) {
      let cols = 0
      for (const t of tr.querySelectorAll('th, td')) {
        cols += t.colSpan
      }
      max = Math.max(max, cols)
    }
  }
  return max
})
</script>
