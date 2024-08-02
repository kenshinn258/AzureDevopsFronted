<template>
  <section class="py-4">
    <slot name="title" :title="title">
      <h4 v-if="title?.length > 0" class="text-primary-07 text-wrap">
        {{ title }}
      </h4>
    </slot>
    <slot />
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: () => undefined,
  },
});
</script>
