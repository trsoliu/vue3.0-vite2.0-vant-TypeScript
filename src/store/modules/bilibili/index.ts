import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { State } from './types'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

const namespaced = true

export const bilibili: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
