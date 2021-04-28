import { State } from "./types";


export const state: State = {
   //search_type
  tabs: [{
    title:'视频',
    type:'video'
  },{
    title:'番剧',
    type:'media_bangumi'
  },{
    title:'影视',
    type:'media_ft'
  },{
    title:'直播间及主播',
    type:'live'
  },{
    title:'直播间',
    type:'live_room'
  },{
    title:'主播',
    type:'live_user'
  },{
    title:'专栏',
    type:'article'
  },{
    title:'话题',
    type:'topic'
  },{
    title:'用户',
    type:'bili_user'
  },{
    title:'相簿',
    type:'photo'
  }],
  tabCurIndex: 0,
  searchList: {},
  bvId: "",
  searchDetails: {},
};
