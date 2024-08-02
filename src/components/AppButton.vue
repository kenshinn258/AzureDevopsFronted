<template>
  <button
    type="button"
    class="btn"
    :class="{
      'btn-tiny': tiny,
      'btn-sm': small,
      'btn-lg': large,
      'btn-xl': xl,
      'btn-round': round,
      'cursor-not-allowed': disabled,
      'cursor-progress': loading,
      'cursor-pointer': !disabled && !loading,
      'break-keep': breakKeep,
      'w-fit': fit,
      'w-full': !fit,
    }"
    :disabled="isDisabled"
    :style="style"
    v-bind="$attrs"
  >
    <n-icon v-if="loading" class="mr-2">
      <icon-eos-icons-bubble-loading />
    </n-icon>
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  tiny: {
    type: Boolean,
    default: () => false,
  },
  small: {
    type: Boolean,
    default: () => false,
  },
  large: {
    type: Boolean,
    default: () => false,
  },
  xl: {
    type: Boolean,
    default: () => false,
  },
  round: {
    type: Boolean,
    default: () => false,
  },
  secondary: {
    type: Boolean,
    default: () => false,
  },
  tertiary: {
    type: Boolean,
    default: () => false,
  },
  quaternary: {
    type: Boolean,
    default: () => false,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  breakKeep: {
    type: Boolean,
    default: () => true,
  },
  fit: {
    type: Boolean,
    default: () => true,
  },
})
const buttonColorStore = useAppButtonColorStore()

const style = computed(() => {
  const displayColor = props.secondary
    ? buttonColorStore.secondary
    : props.tertiary
      ? buttonColorStore.tertiary
      : props.quaternary
        ? buttonColorStore.quaternary
        : buttonColorStore.primary
  return {
    '--app-btn-color': displayColor.color,
    '--app-btn-bg': displayColor.bg,
    '--app-btn-border-color': displayColor.borderColor,
    '--app-btn-hover-color': displayColor.hoverColor,
    '--app-btn-hover-bg': displayColor.hoverBg,
    '--app-btn-hover-border-color': displayColor.hoverBorderColor,
  }
})

const isDisabled = computed(() => {
  return props.disabled || props.loading
})
</script>

<style scoped>
.btn {
  --app-btn-padding-x: 0.75rem;
  --app-btn-padding-y: 0.375rem;
  --app-btn-font-size: 1rem;
  --app-btn-color: initial;
  --app-btn-bg: transparent;
  --app-btn-border-width: 1px;
  --app-btn-border-color: transparent;
  --app-btn-border-radius: 0.375rem;
  --app-btn-hover-border-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--app-btn-padding-y) var(--app-btn-padding-x);
  font-size: var(--app-btn-font-size);
  font-weight: 400;
  line-height: 1.5;
  color: var(--app-btn-color);
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  border: var(--app-btn-border-width) solid var(--app-btn-border-color);
  border-radius: var(--app-btn-border-radius);
  background-color: var(--app-btn-bg);
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
.n-input-group .btn {
  --app-btn-font-size: 14px;
}
.btn-tiny {
  --app-btn-padding-y: 0.125rem;
  --app-btn-padding-x: 0.25rem;
  --app-btn-font-size: 0.75rem;
  --app-btn-border-radius: 0.125rem;
}
.btn-sm {
  --app-btn-padding-y: 0.25rem;
  --app-btn-padding-x: 0.5rem;
  --app-btn-font-size: 0.875rem;
  --app-btn-border-radius: 0.25rem;
}
.btn-lg {
  --app-btn-padding-y: 0.5rem;
  --app-btn-padding-x: 1rem;
  --app-btn-font-size: 1.25rem;
  --app-btn-border-radius: 0.5rem;
}
.btn-xl {
  --app-btn-padding-y: 0.75rem;
  --app-btn-padding-x: 1.5rem;
  --app-btn-font-size: 1.5rem;
  --app-btn-border-radius: 0.75rem;
}
.btn-round {
  --app-btn-border-radius: 50rem !important;
}
.btn:hover {
  color: var(--app-btn-hover-color);
  background-color: var(--app-btn-hover-bg);
  border-color: var(--app-btn-hover-border-color);
}
.btn:disabled,
.btn.disabled {
  /* color: var(--app-btn-disabled-color); */
  /* pointer-events: none; */
  /* background-color: var(--app-btn-disabled-bg);
  border-color: var(--app-btn-disabled-border-color); */
  opacity: 0.65;
  cursor: not-allowed;
  pointer-events: all !important;
}
</style>
