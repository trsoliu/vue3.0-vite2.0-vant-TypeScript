import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import { createGuard } from './guard'
// console.log(12,routes)
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
      }
    }
  },
})
createGuard(router)

export default router
