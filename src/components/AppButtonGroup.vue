<template>
  <div
    class="flex flex-wrap gap-2"
    :class="{
      'flex-col': vertical,
      'text-center items-center justify-center': center && !(left || right),
      'text-left items-start justify-start': left,
      'text-right items-end justify-end': right,
    }"
  >
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  center: {
    type: Boolean,
    default: () => true,
  },
  left: {
    type: Boolean,
    default: () => false,
  },
  right: {
    type: Boolean,
    default: () => false,
  },
  vertical: {
    type: Boolean,
    default: () => false,
  },
})
</script>
