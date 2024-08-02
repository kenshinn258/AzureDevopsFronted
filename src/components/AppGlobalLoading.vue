<template>
  <n-spin :show="isLoading">
    <slot />
  </n-spin>
</template>

<script setup>
import { useIsFetching, useIsMutating } from '@tanstack/vue-query'
import { get } from 'lodash-es'

const countFetching = useIsFetching({
  predicate: query => get(query.meta, 'includePageLoadingCount', true),
})
const countMutating = useIsMutating()

const isLoading = computed(() => toValue(countFetching) > 0 || toValue(countMutating) > 0)
</script>

<style scoped>
.n-spin-container :deep(.n-spin-body) {
  position: fixed;
}
</style>
