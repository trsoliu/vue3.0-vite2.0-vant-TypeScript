import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { State } from './types'

export type Getters = {
  getSearchType(state: State): string 
  getBvId(state: State): string
}

export const getters: GetterTree<State, RootState> & Getters = {
  getSearchType(state: State): string  {
    return state.tabs[state.tabCurIndex].type
  },
  getBvId(state: State): string {
    return state.bvId
  }
}
