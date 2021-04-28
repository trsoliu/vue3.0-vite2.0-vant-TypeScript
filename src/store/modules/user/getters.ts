import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { State } from './types'

export type Getters = {
  getToken(state: State): string
  getUsername(state: State): string
}

export const getters: GetterTree<State, RootState> & Getters = {
  getToken(state: State): string {
    return state.token
  },
  getUsername(state: State): string {
    return state.user?.username || ''
  },
}
