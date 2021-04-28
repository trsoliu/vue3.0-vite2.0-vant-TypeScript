// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import { install } from './plugins'
// import 'normalize.less/normalize.less'
const app = createApp(App)
// console.log(app,8,import.meta.env)
install(app).mount('#app')
