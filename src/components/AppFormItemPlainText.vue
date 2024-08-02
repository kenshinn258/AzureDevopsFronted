<template>
  <app-form-item v-bind="$attrs" :show-feedback="false" readonly>
    <template #plainValue="{ plainValue }">
      <app-form-plain-text>
        <slot> {{ plainValue }} </slot>
      </app-form-plain-text>
    </template>
  </app-form-item>
</template>
