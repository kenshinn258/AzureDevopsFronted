<template>
  <span v-bind="$attrs">{{ text }}</span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: () => "",
  },
});
</script>
