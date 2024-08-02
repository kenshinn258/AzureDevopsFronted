<template>
  <n-tabs class="app-tabs" type="segment" :animated="false" v-bind="$attrs">
    <template v-for="(slotKey, slotIndex) in slotKeys" :key="slotIndex" #[slotKey]>
      <slot :name="slotKey"></slot>
    </template>
  </n-tabs>
</template>

<script setup>
const slotKeys = Object.keys(useSlots());
</script>

<style>
.app-tabs.n-tabs .n-tabs-rail {
  background-color: transparent;
  padding: 12px 3px;
}
.app-tabs.n-tabs .n-tabs-rail .n-tabs-tab-wrapper {
  padding: 0;
  border: 1px solid #598b70;
  border-radius: 5px;
  flex-grow: 0;
}
.app-tabs.n-tabs .n-tabs-tab .n-tabs-tab__label {
  margin: 0 12px;
}
.app-tabs.n-tabs .n-tabs-rail .n-tabs-tab-wrapper .n-tabs-tab.n-tabs-tab--active {
  box-shadow: unset;
  color: #ffffff;
  background-color: #598b70;
}
.app-tabs.n-tabs .n-tabs-nav--segment-type.n-tabs-nav--top.n-tabs-nav .n-tabs-rail {
  border-bottom: 2px solid #f8f8f8;
}
.app-tabs.n-tabs .n-tabs-rail > :not([hidden]) ~ :not([hidden]) {
  margin-right: 8px;
  margin-left: 8px;
}
</style>
