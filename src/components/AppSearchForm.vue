<template>
  <n-thing class="bg-white p-2">
    <template #header>
      <slot name="header">
        <h3 class="text-primary-07 text-2xl tracking-[1px] font-bold leading-[1.2]">
          {{ title }}
        </h3>
      </slot>
    </template>
    <template #header-extra>
      <n-button circle :focusable="false" @click="() => (showModel = !showModel)">
        <template #icon>
          <n-icon class="text-primary-07">
            <icon-fa-arrow-circle-down
              :class="{
                'transform rotate-180': showModel,
              }"
            />
          </n-icon>
        </template>
      </n-button>
    </template>
    <n-collapse-transition :show="showModel">
      <slot />
    </n-collapse-transition>
  </n-thing>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: () => "查詢條件設定",
  },
});
const showModel = defineModel("show", {
  type: Boolean,
  default: () => true,
});
</script>
