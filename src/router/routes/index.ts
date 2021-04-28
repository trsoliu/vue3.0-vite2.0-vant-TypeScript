import { RouteRecordRaw } from "vue-router";
// import Layout from '@/layout/index.vue'
// import NotFound from '@/views/constants/404.vue'
// import NoAuth from '@/views/constants/403.vue'
import Login from "@/views/constants/Login/Login.vue";

// const Computed = () => import("@/views/modules/Computed.vue");
// const Computed = () => import("@/views/modules/Computed.vue");

// import Redirect from '@/views/constants/Redirect.vue'

const modules = import.meta.globEager("./modules/**/*.ts");
console.log("modules:", modules);
const moduleRoutes: RouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default as RouteRecordRaw[];
  moduleRoutes.push(...mod);
});
console.log(moduleRoutes);

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  ...moduleRoutes,
];
