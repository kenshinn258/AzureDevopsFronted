<template>
  <div v-if="loading" class="flex flex-col items-center justify-center w-full py-4">
    <n-spin show :delay="1000" v-bind="$attrs" />
  </div>
  <slot v-else />
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false,
  },
})
</script>
