<template>
  <n-menu
    v-bind="$attrs"
    style="--n-item-color-hover: initial; --n-arrow-color: #ffffff; --n-arrow-color-hover: #ffffff"
    :mode="mode"
    :options="menuOptions"
    :render-label="renderMenuLabel"
    :value="null"
  />
</template>

<script setup>
import NavigationMenuItem from './NavigationMenuItem.vue'
import { RouterLink } from 'vue-router/auto'
import { isNil } from 'lodash-es'
import { useGlobalStore } from '@/store/global'

const props = defineProps({
  mode: {
    type: String,
    default: () => 'inline',
  },
  menuOptions: {
    type: Array,
    default: () => [],
  },
})
const globalStore = useGlobalStore()
const renderMenuLabel = menuOption => {
  const createMenuLabel = () =>
    h(NavigationMenuItem, {
      text: menuOption.label,
      class: `${
        globalStore.isMatchLG && menuOption.parentKey !== '__root__' ? 'text-black' : 'text-white'
      } ${menuOption.parentKey === '__root__' ? 'text-lg' : ''}`,
    })
  return isNil(menuOption.href)
    ? createMenuLabel()
    : h(
        RouterLink,
        {
          to: {
            path: menuOption.href,
            query: menuOption.query,
            force: true,
          },
        },
        { default: () => createMenuLabel() },
      )
}
</script>
