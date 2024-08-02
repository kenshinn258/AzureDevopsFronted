<template>
  <n-input :allow-input="value => !value || /^\d+$/.test(value)" v-bind="$attrs">
    <template v-for="(slotName, slotIndex) in slotNames" :key="slotIndex" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </n-input>
</template>

<script setup>
const slots = useSlots()
const slotNames = computed(() => Object.keys(slots))
</script>
