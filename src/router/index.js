import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/store/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const noNeedTokeList = ['/login', '/forgotPassword', '/resetPassword', '/register']
router.beforeEach((to, from) => {
  if (to.fullPath === '/') {
    return router.push("/login")
  }
  // if (to?.meta?.auth) {
    const authStore = useAuthStore()
    if (!authStore.isLogin) {
      if (!noNeedTokeList.find(e => e === to.path) || to.fullPath === '/resetPassword') {
        return router.push("/")
      // } else if (pwExpiresDays.value <= 0 && token.value && to.name != "PwChg") {
      //   return router.push("/main/PwChg");
      } else {
        return true
      }
    }
  // }
})
export default router
