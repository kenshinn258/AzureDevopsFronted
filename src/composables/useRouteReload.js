import { createGlobalState } from '@vueuse/core'

const useGlobalState = createGlobalState(() => {
  const loaded = ref(true)
  return { loaded }
})

export const useRouteReload = () => {
  const { loaded } = useGlobalState()

  const reload = () => {
    loaded.value = false
    nextTick(() => {
      loaded.value = true
    })
  }

  onBeforeRouteUpdate((to, from) => {
    reload()
  })

  return { loaded, reload }
}
