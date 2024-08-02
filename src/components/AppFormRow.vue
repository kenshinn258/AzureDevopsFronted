<template>
  <div class="flex flex-col lg:flex-row py-3" :class="{ 'even:bg-gray-02': striped }">
    <div
      v-if="label !== false"
      class="flex-none text-base font-semibold whitespace-pre-line w-full px-4 mb-2 lg:mb-0`"
      :class="[{ 'lg:w-52': !props.small }, { 'lg:w-24': props.small }]"
    >
      <slot :required="isRequired" name="label">
        <div class="min-h-[34px] h-auto box-border content-center">
          <label
            class="break-words"
            :class="{ 'app-form-row-required': required && !appFormProvide?.readonly }"
            @click="() => $emit('click:label')"
          >
            {{ label }}
          </label>
        </div>
      </slot>
    </div>
    <div class="grow flex flex-col px-4" :class="{ 'lg:pl-0': label !== false }">
      <div
        class="flex flex-col gap-2"
        :class="{
          'lg:flex-row': horizontal,
        }"
      >
        <slot />
      </div>
      <slot v-if="!appFormProvide?.readonly" name="notice" />
    </div>
  </div>
</template>

<script setup>
import { FORM_KEY } from "./keys";

const props = defineProps({
  required: {
    type: Boolean,
    default: () => false,
  },
  label: {
    type: [String, Boolean],
    default: () => "",
  },
  striped: {
    type: Boolean,
    default: () => false,
  },
  horizontal: {
    type: Boolean,
    default: () => false,
  },
  small: {
    type: Boolean,
    default: () => false,
  },
});

const emit = defineEmits(["click:label"]);
const slots = useSlots();
const appFormProvide = inject(FORM_KEY, undefined, true);

const isRequired = computed(() => props.required && !appFormProvide?.readonly);
</script>

<style scoped>
.app-form-row-required::after {
  content: "＊";
  color: theme("colors.red.02");
  margin-left: 4px;
  vertical-align: middle;
}
</style>
