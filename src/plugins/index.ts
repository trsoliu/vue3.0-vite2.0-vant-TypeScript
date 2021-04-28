import { App } from 'vue'
import { installRouter } from './router'
import { installStore } from './store'
// import { installComponents } from './components'

export function install(app: App): App {
  installRouter(app)
  installStore(app)
  //全局组件注入
  // installComponents(app)
  return app
}
