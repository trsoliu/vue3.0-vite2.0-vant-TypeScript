// import { ActionTypes } from './modules/bilibili/types';
import { State as BilibiliState } from './modules/bilibili/types'
import { State as UserState } from './modules/user/types'

export interface RootState {
  // bilibili(SEARCHDETAILS: ActionTypes, bilibili: any): {}|PromiseLike<{}>;
  bilibili:BilibiliState,
  user: UserState
}
