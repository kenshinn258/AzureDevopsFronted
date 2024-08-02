<template>
  <template v-if="appFormProvide?.readonly">
    <app-form-item-plain-text> {{ telModel }}{{ extModel ? '#' : '' }}{{ extModel }} </app-form-item-plain-text>
  </template>
  <template v-else>
    <div class="flex flex-row">
      <app-form-item class="grow" :path="telPath" :rule-path="telRulePath">
        <n-input
          v-model:value="telModel"
          v-maska
          :placeholder="telPlaceholder"
          :input-props="{
            'data-maska': '0#-####-####',
          }"
          :maxlength="20"
        />
        <template #notice>
          <span>如 02-1234-5678</span>
        </template>
      </app-form-item>
      <app-form-item class="w-[130px] lg:w-1/4" :path="extPath" :rule-path="extRulePath">
        <n-input
          v-model:value="extModel"
          v-maska
          :placeholder="extPlaceholder"
          :input-props="{
            'data-maska': '####',
          }"
          :maxlength="10"
        >
          <template #prefix>
            <span class="mr-2">分機</span>
          </template>
        </n-input>
        <template #notice>
          <span>分機 777</span>
        </template>
      </app-form-item>
    </div>
  </template>
</template>

<script setup>
import { vMaska } from 'maska'
import { FORM_KEY } from './keys'

const props = defineProps({
  telPath: {
    type: String,
    default: () => undefined,
  },
  telRulePath: {
    type: String,
    default: () => undefined,
  },
  telPlaceholder: {
    type: String,
    default: () => '',
  },
  extPath: {
    type: String,
    default: () => undefined,
  },
  extRulePath: {
    type: String,
    default: () => undefined,
  },
  extPlaceholder: {
    type: String,
    default: () => '',
  },
})
const telModel = defineModel('telValue', {
  type: String,
})
const extModel = defineModel('extValue', {
  type: String,
})

const appFormProvide = inject(FORM_KEY)
</script>
