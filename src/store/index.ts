import { InjectionKey } from 'vue'
import {
  createStore,
  useStore as baseUseStore,
  Store,
  StoreOptions,
  createLogger,
  Plugin,
  mapState
} from 'vuex'
import { RootState } from './types'
import { user } from './modules/user'
// import { myVuex } from './modules/myVuex'
import { bilibili } from './modules/bilibili'
import createPersistedState from 'vuex-persistedstate'//vuex数据持久化
import { STORAGE_KEY } from '@/enums/const'

export const key: InjectionKey<Store<RootState>> = Symbol('key')

const plugins: Plugin<RootState>[] = [
  //持久化
  createPersistedState({
    key: STORAGE_KEY,
  }),
]
if (import.meta.env.MODE === 'development') {
  //开发环境启用操作logger
  plugins.push(createLogger())
}
// console.log("bilibili",bilibili)
export const storeOptions: StoreOptions<RootState> = {
  plugins,
  modules: {
    // myVuex,
    user,
    bilibili
  },
}

export const store = createStore<RootState>(storeOptions)

export function useStore() {
  console.log("baseUseStore(key):",baseUseStore(key),mapState)
  return baseUseStore(key)
}
