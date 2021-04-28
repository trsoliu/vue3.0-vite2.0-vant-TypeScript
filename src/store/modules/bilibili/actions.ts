import { State, ActionTypes, MutationTypes } from './types'
import { Mutations } from './mutations'
import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { search , view } from '@/api/bilibili'
import { Params } from '@/api/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [ActionTypes.SEARCHLIST]({ commit }: AugmentedActionContext, params?: any): Promise<any>,
  [ActionTypes.SEARCHDETAILS]({ commit }: AugmentedActionContext, params?: any): Promise<any>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SEARCHLIST]({ commit }, params: Params) {
    const res = await search(params)
    console.log("search:",res)
    const data = res.data.data
    commit(MutationTypes.SEARCHLIST, data)
    return data
  },
  async [ActionTypes.SEARCHDETAILS]({ commit }, params: Params) {
    const res = await view(params)
    console.log("view:",res)
    const data = res.data.data
    commit(MutationTypes.SEARCHDETAILS, data)
    return data
  },
}
