export interface User {
  id: number | string
  username: string
  mobile: string
}

export interface State {
  token: string
  user: User | null
}

export enum MutationTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export enum ActionTypes {
  LOGIN = 'LOGIN',
}
