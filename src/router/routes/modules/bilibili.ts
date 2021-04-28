import { RouteRecordRaw } from 'vue-router'
import BilibiliLayout from '@/layout/BilibiliLayout.vue'

const DoubanRoutes: Array<RouteRecordRaw> = [
  {
    path: '/bilibili',
    component: BilibiliLayout,
    redirect: '/bilibili/list',
    meta: {
      title: 'bilibili 视频',
    },
    children: [
      {
        path: 'list',
        name: 'Bilibili-List',
        component: () => import('@/views/modules/Bilibili/List.vue'),
        meta: {
          title: 'bilibili 搜索',
        },
      },
      {
        path: 'details',
        name: 'Bilibili-Details',
        component: () => import('@/views/modules/Bilibili/Details.vue'),
        meta: {
          title: 'bilibili 详情',
        },
      },
    ],
  },
]

export default DoubanRoutes
