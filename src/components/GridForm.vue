<template>
  <n-form
    ref="formRef"
    class="px-2"
    label-width="auto"
    require-mark-placement="right-hanging"
    :label-placement="labelPlacement"
    v-bind="$attrs"
  >
    <n-grid :cols="cols" responsive="screen" x-gap="12">
      <slot />
    </n-grid>
  </n-form>
</template>

<script setup>
import { useGlobalStore } from "@/store/global";

const props = defineProps({
  cols: {
    type: String,
    default: () => "24",
  },
});
const formRef = ref();
const globalState = useGlobalStore();
const labelPlacement = computed(() => (globalState.isMatchLG ? "left" : "top"));

const expose = {};

onMounted(() => {
  const entries = Object.entries(formRef.value);
  for (const [methodName, methodFunction] of entries) {
    expose[methodName] = methodFunction;
  }
});
defineExpose(expose);
</script>
