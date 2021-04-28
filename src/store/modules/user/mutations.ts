import { MutationTree } from 'vuex'
import { State, MutationTypes } from './types'
import { clearStore } from '@/utils/user'

export interface Mutations {
  [MutationTypes.LOGIN](state: State, payload: any): void
  [MutationTypes.LOGOUT](state: State): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.LOGIN](state: State, payload: any) {
    // console.log(11199999,payload)
    state.token = payload
    // state.token = payload.token
    // state.user = payload
  },
  [MutationTypes.LOGOUT](state: State) {
    state.token = ''
    state.user = null
    clearStore()
  },
}
