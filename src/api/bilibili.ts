import request from "@/request";
import { Params } from "./types";

// 分类搜索列表
export const search = (params: Params) =>
  //https://github.com/btmood/bilibili-API-collect/blob/master/search/search_request.md
  // https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=vue&page=1&pagesize=20&order=update
  //search_type
  // 视频：video
  // 番剧：media_bangumi
  // 影视：media_ft
  // 直播间及主播：live
  // 直播间：live_room
  // 主播：live_user
  // 专栏：article
  // 话题：topic
  // 用户：bili_user
  // 相簿：photo
  request.get(
    `/web-interface/search/type?search_type=${params.searchType}&keyword=${params.keyword}&page=${params.page}&pagesize=${params.pagesize}`
  );

//详情
export const view = (params: Params) => {
  console.log("view-params:", params);
  return request.get(`/web-interface/view?bvid=${params.bvId}`);
};

// post
// export const movieDetails1 = (params: Params) => request.post("/movie/XXXX", params);
