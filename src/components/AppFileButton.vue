<template>
  <div class="flex flex-row space-x-2 w-full app-file-button">
    <app-button class="self-center" v-bind="$attrs" :disabled="prop.disabled" @click="() => open(options)">
      <slot> 選擇檔案 </slot>
    </app-button>
    <slot name="files" :files="fileModel">
      <ol class="grow text-left space-y-2 pt-1 px-1">
        <li v-for="(file, fileIndex) in fileModel" :key="fileIndex" class="flex flex-row">
          <span class="grow">{{ file.name }}</span>
          <n-button circle size="tiny" class="ml-auto self-center" @click="() => handleDelete(fileIndex)">
            <template #icon>
              <n-icon class="text-red-02">
                <icon-fa6-solid-trash />
              </n-icon>
            </template>
          </n-button>
        </li>
      </ol>
    </slot>
  </div>
</template>

<script setup>
import { range, map } from 'lodash-es'
import { useFileDialog } from '@vueuse/core'

const prop = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
})
const fileModel = defineModel('files', {
  type: Array,
})
const { open, onChange } = useFileDialog({
  accept: '*',
  directory: false,
  multiple: true,
  reset: true,
})
onChange(files => {
  fileModel.value = map(range(files?.length ?? 0), index => files[index])
})

const handleDelete = index => {
  toValue(fileModel).splice(index, 1)
  //fileModel.value = toValue(fileModel).splice(index, 1) // hack trigger update
}
</script>

<style scoped>
.n-form-item-blank--error > .app-file-button {
  border-color: theme('colors.red.02');
  border-width: 1px;
}
</style>
