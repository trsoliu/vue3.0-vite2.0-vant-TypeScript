import { State, ActionTypes, MutationTypes } from './types'
import { Mutations } from './mutations'
import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { login } from '@/api/user'
import { Params } from '@/api/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [ActionTypes.LOGIN]({ commit }: AugmentedActionContext, params?: any): Promise<any>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.LOGIN]({ commit }, params: Params) {
    const res = await login(params)
    const data = res.data.data
    commit(MutationTypes.LOGIN, data)
    return data
  },
}
