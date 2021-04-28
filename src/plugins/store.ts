import { App } from 'vue'
import { store, key } from '@/store'

export function installStore(app: App): App {
  app.use(store, key)
  return app
}
