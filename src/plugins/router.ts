import { App } from 'vue'
import router from '@/router'

export function installRouter(app: App): App {
  app.use(router)
  return app
}
