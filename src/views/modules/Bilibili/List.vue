<template>
  <van-nav-bar
    title="bibili "
    left-text="返回"
    fixed
    left-arrow
    @click-left="onClickLeft"
    @click-right="getSearch"
  >
    <template #title>
      <van-field
        v-model="params.keyword"
        placeholder="请输入搜索关键词"
        border
        clearable
      />
    </template>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <van-tabs v-model:active="tabCurIndex" @change="changeTab">
    <van-tab v-for="(item, index) in tabs" :title="item.title" :key="index">
      <!-- {{item.title}} -->
    </van-tab>
  </van-tabs>
  <SearchList :searchList="searchList" />
</template>

<script lang="ts">
import { defineComponent, computed, provide, ref, reactive, toRefs } from 'vue'
import { NavBar, Icon, Field, Tab, Tabs } from 'vant'
import SearchList from '@/components/SearchList.vue'
import { useRouter } from 'vue-router'
import {
  ActionTypes as BilibiliActionTypes,
  MutationTypes as BilibiliMutationTypes,
  GettersTypes as BilibiliGettersTypes,
} from '@/store/modules/bilibili/types'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    SearchList,
  },
  setup() {
    const { go } = useRouter()
    const onClickLeft = () => {
      go(-1)
    }
    const store = useStore()
    //获取tabs列表信息
    const tabs = store.state.bilibili.tabs
    const tabCurIndex = store.state.bilibili.tabCurIndex
    // change tab
    const changeTab = (index: number | string) => {
      // console.log('tabCurIndex:', index)
      //设置当前触发的tab 的 index
      store.commit('bilibili/' + BilibiliMutationTypes.TABCURINDEX, index)
      getSearch()
    }
    //获取资源列表
    const params = reactive({
      searchType:
        store.getters['bilibili/' + BilibiliGettersTypes.GETSEARCHTYPE], //获取搜索类型
      keyword: 'vue',
      page: 1,
      pagesize: 10,
    })
    //获取搜索内容
    const state = reactive({
      searchList: {},
    })
    //获取搜索资料列表
    const getSearch = async () => {
      //把当前接口参数向子组件注入
      provide('params', params)
      //重新获取搜索类型
      params.searchType = store.getters['bilibili/' + BilibiliGettersTypes.GETSEARCHTYPE] //获取搜索类型
      state.searchList = await store.dispatch(
        'bilibili/' + BilibiliActionTypes.SEARCHLIST,
        params
      )
      // console.log('state1:', state.searchList)
    }
    getSearch()
    return {
      onClickLeft,
      tabs,
      tabCurIndex,
      changeTab,
      params,
      getSearch,
      ...toRefs(state),
    }
  },
})
</script>
