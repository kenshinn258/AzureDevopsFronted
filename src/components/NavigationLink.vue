<template>
  <router-link v-bind="$attrs" #="{ navigate, href }" custom>
    <a class="flex items-center space-x-1" :class="linkClass" :href="href" @click="navigate">
      <slot />
    </a>
  </router-link>
</template>

<script setup>
defineProps({
  linkClass: {
    type: [String, Object],
    default: () => undefined,
  },
})
</script>
