<template>
  <app-ask :class="popConfirmWidth" :ask-message="askMessage" @positive-click="handlePositiveClick">
    <app-button v-bind="$attrs">
      <slot />
    </app-button>
  </app-ask>
</template>

<script setup>
const props = defineProps({
  askMessage: {
    type: String,
    default: () => '是否進行刪除？',
  },
  popConfirmWidth: {
    type: String,
    default: () => '',
  },
})
const emit = defineEmits(['click'])
const handlePositiveClick = () => {
  emit('click')
}
</script>
