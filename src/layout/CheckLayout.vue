<template>
  <div class="checkLayout">
    <div class="fixed">
      <div class="tabs">
        <template v-for="(item, index) in tabObj.tabArray" :key="index">
          <div
            class="tab"
            :class="tabObj.tabIndex == index ? 'active' : ''"
            @click="changTab(index)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,reactive } from 'vue'
import { useRouter,useRoute } from 'vue-router'
// import { Tab, Tabs } from 'vant'
// import { useStore } from '@/store'
// // ant-design
// import { SyncOutlined } from '@ant-design/icons-vue'
// // custom components
// import SubMenu from './components/SubMenu/index.vue'
// import UserDropdown from './components/UserDropdown/index.vue'
// import Breadcrumb from './components/Breadcrumb/index.vue'
// import Setting from './components/Setting/index.vue'
// // // hooks
// import useSelectedKeys from '@/hooks/menus/useSelectedKeys'
// import useOpenKeys from '@/hooks/menus/useOpenKeys'
// import useMenuClick from '@/hooks/menus/useMenuClick'
// import { useRefresh } from '@/hooks/usePage'

export default defineComponent({
  name: 'CheckLayout',

  components: {
    // [Tab.name]: Tab,
    // [Tabs.name]: Tabs,
    // [Layout.name]: Layout,
    // [Layout.Sider.name]: Layout.Sider,
    // [Layout.Header.name]: Layout.Header,
    // [Layout.Content.name]: Layout.Content,
    // [Menu.name]: Menu,
    // [Menu.Item.name]: Menu.Item,
    // [Tooltip.name]: Tooltip,
    // SyncOutlined,
    // SubMenu,
    // UserDropdown,
    // Breadcrumb,
    // Setting,
  },

  setup() {
    const { replace } = useRouter()
    const route = useRoute()
    let tabObj = reactive({
      tabIndex: 0,
      tabArray: [
        {
          name: '核销订单',
          path:'/check/order'
        },
        {
          name: '核销记录',
          path:'/check/record'
        },
      ],
    })
    // 初始化加载检查路由地址对应的tab
    if(route.path=='/check/record'){
      tabObj.tabIndex = 1
    }
    const changTab = (i: number) => {
      tabObj.tabIndex = i
      replace({
        path:tabObj.tabArray[i].path
      })
      console.log(tabObj.tabArray[i].path, i)
    }
    return {
      tabObj,
      changTab,
    }
    // const store = useStore()
    // const { openKeys } = useOpenKeys()
    // const { selectedKeys } = useSelectedKeys()
    // const { handleMenuClick } = useMenuClick()
    // const { refreshRoute } = useRefresh()
    // const username = computed(() => store.state.user.user.userName || '')
    // const theme = computed(() => store.state.setting.menu.theme)
    // const headerTheme = computed(() => store.state.setting.header.theme)
    // const state = reactive({
    //   menus: store.state.menus.menus,
    //   collapsed: false,
    //   selectedKeys,
    //   openKeys,
    //   username,
    //   theme,
    //   headerTheme,
    // })
    // return {
    //   ...toRefs(state),
    //   handleMenuClick,
    //   refreshRoute,
    // }
  },
})
</script>

<style lang="less" scoped>
.checkLayout {
  // background: #ff0;
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    .tabs {
      display: flex;
      align-items: center;
      width: 360px;
      height: 68px;
      margin: 30px calc(50vw - 180px);
      padding: 0 6px;
      background: #f0f0f0;
      border-radius: 10px;
      .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 180px;
        height: 56px;
        border-radius: 10px;
        &.active {
          background: #ffffff;
        }
      }
    }
  }
}
</style>
<style lang="less" >
.van-tabs__nav--card {
  margin: 0 !important;
}
</style>
