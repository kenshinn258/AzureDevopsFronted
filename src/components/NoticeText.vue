<template>
  <div class="flex items-start text-primary-06">
    <n-icon-wrapper class="mx-1 mt-0.5" :color="redColor['02']" :size="16" :border-radius="10">
      <n-icon>
        <icon-bi-exclamation />
      </n-icon>
    </n-icon-wrapper>
    <slot />
  </div>
</template>

<script setup>
import { redColor } from "/color";
</script>
