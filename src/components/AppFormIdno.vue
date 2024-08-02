<template>
  <n-input v-maska:[maskaOptions] :maxlength="10" v-bind="$attrs" />
</template>

<script setup>
import { vMaska } from 'maska'

const props = defineProps({
  strict: {
    type: Boolean,
    default: () => true,
  },
})

const maskaOptions = {
  mask: props.strict ? 'FS########' : '**********',
  tokens: {
    F: {
      pattern: /[A-Z]/,
    },
    S: {
      pattern: /[1,2]/,
    },
  },
  preProcess: value => value?.toUpperCase(),
}
</script>
