<template>
    <input v-bind="$attrs" type="number" v-model.number:value="value" class="input-count focus:outline-none" :class="{
        'text-[14px] px-[10px] py-[7px]': medium && !tiny,
        'text-[12px] px-[10px] py-[1px]': tiny,
    }" />
</template>
<script setup>
const value = defineModel("value", {
    type: Number,
    default: () => 0,
});

const props = defineProps({
    tiny: {
        type: Boolean,
        default: () => false,
    },
    medium: {
        type: Boolean,
        default: () => true,
    },
});
</script>
<style scoped lang="postcss">
.input-count {
    border: 1px solid rgb(239, 239, 245);
    border-radius: 3px;

    &:focus {
        border: 1px solid #368FA3;
        outline: none;
        box-shadow: 0 0 0 2px rgba(54, 143, 163, 0.2);
    }
}

.input-count:disabled {
    background-color: rgb(250, 250, 252);
    @apply cursor-not-allowed;
}
/* remove arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.n-form-item-blank--error .input-count {
  border-color: theme('colors.red.02');
  border-width: 1px;
  &:focus {
        border-color: theme('colors.red.02');
        outline: none;
        box-shadow: 0 0 0 2px rgba(223, 101, 96, 0.2)
    }
}
</style>