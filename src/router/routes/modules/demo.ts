import { RouteRecordRaw } from 'vue-router'
import DemoLayout from '@/layout/DemoLayout.vue'
import DemoIndex from "@/views/constants/DemoIndex.vue";
const DefineProperty = () => import("@/views/modules/Demo/DefineProperty.vue");
const Proxy = () => import("@/views/modules/Demo/Proxy.vue");
const ReactiveRef = () => import("@/views/modules/Demo/ReactiveRef.vue"); 
// Composition API ----------------
const Setup = () => import("@/views/modules/Demo/Setup.vue");
const Provide = () => import("@/views/modules/Demo/Provide.vue");
const Inject = () => import("@/views/modules/Demo/Inject.vue");
const LifecycleHooks = () => import("@/views/modules/Demo/LifecycleHooks.vue");
const GetCurrentInstance = () => import("@/views/modules/Demo/GetCurrentInstance.vue");
// Reactiving API ----------------
const Reactive = () => import("@/views/modules/Demo/Reactive.vue");
const IsReactive = () => import("@/views/modules/Demo/IsReactive.vue");
const Ref = () => import("@/views/modules/Demo/Ref.vue");
const IsRef = () => import("@/views/modules/Demo/IsRef.vue");
const ToRefs = () => import("@/views/modules/Demo/ToRefs.vue");
const Computed = () => import("@/views/modules/Demo/Computed.vue");
const WatchEffetc = () => import("@/views/modules/Demo/WatchEffetc.vue");
const WatchReactive = () => import("@/views/modules/Demo/WatchReactive.vue");
const WatchRef = () => import("@/views/modules/Demo/WatchRef.vue");
const WatchMult = () => import("@/views/modules/Demo/WatchMult.vue");
const WatchStop = () => import("@/views/modules/Demo/WatchStop.vue");
// Built-In Components ----------------
const Teleport = () => import("@/views/modules/Demo/Teleport.vue");

const DemoRoutes: Array<RouteRecordRaw> = [
  {
    path: "/demoindex",
    name: "DemoIndex",
    component: DemoIndex,
    meta: {
      title: "首页",
    },
  },
  {
    path: '/',
    component: DemoLayout,
    redirect: '/demoindex',
    meta: {
      title: '',
    },
    children:[
    {
      path: "defineProperty",
      name: "defineProperty",
      component: DefineProperty,
      meta: {
        title: "DefineProperty",
      },
    },
    {
      path: "proxy",
      name: "proxy",
      component: Proxy,
      meta: {
        title: "Proxy",
      },
    },
    {
      path: "reactiveref",
      name: "reactiveref",
      component: ReactiveRef,
      meta: {
        title: "ReactiveRef",
      },
    },
    {
      path: "setup",
      name: "setup",
      component: Setup,
      meta: {
        title: "Setup",
      },
    },
    {
      path: "provide",
      name: "provide",
      component: Provide,
      meta: {
        title: "Provide",
      },
    },
    {
      path: "inject",
      name: "inject",
      component: Inject,
      meta: {
        title: "Inject",
      },
    },
    {
      path: "lifecycleHooks",
      name: "lifecycleHooks",
      component: LifecycleHooks,
      meta: {
        title: "LifecycleHooks",
      },
    },
    {
      path: "getCurrentInstance",
      name: "getCurrentInstance",
      component: GetCurrentInstance,
      meta: {
        title: "GetCurrentInstance",
      },
    },
    {
      path: "reactive",
      name: "reactive",
      component: Reactive,
      meta: {
        title: "Reactive",
      },
    },
    {
      path: "isreactive",
      name: "isreactive",
      component: IsReactive,
      meta: {
        title: "IsReactive",
      },
    },
    {
      path: "ref",
      name: "ref",
      component: Ref,
      meta: {
        title: "Ref",
      },
    },
    {
      path: "isref",
      name: "isref",
      component: IsRef,
      meta: {
        title: "IsRef",
      },
    },
    {
      path: "torefs",
      name: "torefs",
      component: ToRefs,
      meta: {
        title: "ToRefs",
      },
    },
    {
      path: "computed",
      name: "computed",
      component: Computed,
      meta: {
        title: "Computed",
      },
    },
    {
      path: "watchEffetc",
      name: "watchEffetc",
      component: WatchEffetc,
      meta: {
        title: "WatchEffetc",
      },
    },
    {
      path: "watchReactive",
      name: "watchReactive",
      component: WatchReactive,
      meta: {
        title: "WatchReactive",
      },
    },
    {
      path: "watchRef",
      name: "watchRef",
      component: WatchRef,
      meta: {
        title: "WatchRef",
      },
    },
    {
      path: "watchMult",
      name: "watchMult",
      component: WatchMult,
      meta: {
        title: "WatchMult",
      },
    },
    {
      path: "watchStop",
      name: "watchStop",
      component: WatchStop,
      meta: {
        title: "WatchStop",
      },
    },
    {
      path: "teleport",
      name: "teleport",
      component: Teleport,
      meta: {
        title: "Teleport",
      },
    }]
  },
]

export default DemoRoutes
