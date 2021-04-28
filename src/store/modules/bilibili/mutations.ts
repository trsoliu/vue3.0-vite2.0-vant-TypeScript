import { MutationTree } from 'vuex'
import { State, MutationTypes } from './types'
// import { clearStore } from '@/utils/user'


export interface Mutations {
  [MutationTypes.TABCURINDEX](state: State, payload: any): void,
  [MutationTypes.SEARCHLIST](state: State, payload: any): void,
  [MutationTypes.BVID](state: State, payload: any): void,
  [MutationTypes.SEARCHDETAILS](state: State, payload: any): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.TABCURINDEX](state: State, payload: number | string) {
    console.log("tabCurIndex:",payload)
    state.tabCurIndex = payload

  },
  [MutationTypes.SEARCHLIST](state: State, payload: object) {
    console.log("searchList:",payload)
    state.searchList = payload
  },
  [MutationTypes.BVID](state: State, payload: string) {
    console.log("bvId:",payload)
    state.bvId = payload
  },
  [MutationTypes.SEARCHDETAILS](state: State, payload: object) {
    console.log("searchDetails:",payload)
    state.searchDetails = payload
  },
  
}
