
export interface State {
  tabs: any,
  tabCurIndex: number | string,
  searchList:object,
  bvId: string,
  searchDetails:object
}

export enum GettersTypes {
  GETSEARCHTYPE ='getSearchType',
  GETBVID = 'getBvId'
}

export enum MutationTypes {
  TABCURINDEX = 'TABCURINDEX',
  SEARCHLIST = 'SEARCHLIST',
  BVID = 'BVID',
  SEARCHDETAILS = 'SEARCHDETAILS',
}

export enum ActionTypes {
  SEARCHLIST = 'SEARCHLIST',
  SEARCHDETAILS = 'SEARCHDETAILS',
}
