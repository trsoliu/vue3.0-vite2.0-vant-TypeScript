import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Router } from "vue-router";
// import { store } from '@/store'
// import { MutationTypes as AppMutationTypes } from '@/store/modules/app/types'
import { setTitle } from "@/utils/browser";
// import { getToken } from '@/utils/user'
// import { pathExist } from '@/router/menus'

export function createGuard(router: Router): void {
  // 路由拦截
  router.beforeEach((to, from, next) => {
    console.log("to:", to); // 目标路由信息
    console.log("from:", from); // 当前导航正要离开的路由信息对象
    //页面加载进度
    NProgress.start();
    // const token = getToken();
    // if (!token && to.name !== "login") {
    //   // 拦截并指定跳转路由
    //   next({
    //     name: "login",
    //   });
    // } else {
      // 路由继续
      next();
    // }
    // 返回 false 以取消导航
    // return false 或者 next(false)
  });
  router.beforeResolve( (to, from,next) => {
    console.log(to)
    console.log(from)
    next();
  })
  router.afterEach((to) => {
    NProgress.done();
    // console.log(import.meta.env)
    setTitle(to.meta.title as string, import.meta.env.VITE_APP_TITLE as string);
    // store.commit(AppMutationTypes.SET_LOADING, false)
  });
}
