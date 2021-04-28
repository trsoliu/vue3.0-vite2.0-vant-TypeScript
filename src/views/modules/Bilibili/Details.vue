<template>
  <van-nav-bar
    :title="'bibili'+title+ '详情 '"
    left-text="返回"
    fixed
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="detail">
    <div class="box" v-if="searchDetails.title">
      <div class="title">{{ searchDetails.title }}</div>
      <div class="author">
        up主：{{searchDetails.owner.name}}（{{searchDetails.owner.mid}}）
      </div>
      <div class="content">描述：{{ searchDetails.desc }}</div>
      <div class="directorty">
        <div class="subtitle">目录</div>
        <a class="dir" v-for="(item,index) in searchDetails.pages" :key="index" href="">
          {{item.part}}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref, reactive, toRefs } from 'vue'
import { NavBar } from 'vant'
import {
  ActionTypes as BilibiliActionTypes,
  GettersTypes as BilibiliGettersTypes,
} from '@/store/modules/bilibili/types'

import { useRouter} from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    [NavBar.name]: NavBar,
  },
  setup() {
    const router =useRouter()
    const onClickLeft=()=>{
      router.go(-1)
    }
    const store = useStore()
    //获取搜索类型标题
    const title=ref(store.state.bilibili.tabs[store.state.bilibili.tabCurIndex].title)
    //获取搜索内容
    const state = reactive({
      searchDetails: {},
    })
    // const bvId = computed(() => store.state.bilibili.bvId)
    console.log(222, store)
    const getSearchDetails = async () => {
      state.searchDetails = await store.dispatch(
        'bilibili/' + BilibiliActionTypes.SEARCHDETAILS,
        {
          // bvId:store.state.bilibili.bvId
          bvId: store.getters['bilibili/' + BilibiliGettersTypes.GETBVID],
        }
      )
      console.log('state:', state.searchDetails)
    }
    getSearchDetails()

    return {
      onClickLeft,
      title,
      ...toRefs(state),
    }
  },
})
</script>
<style lang="less" scoped>
.detail {
  margin-top: 0px;
  .box {
    padding: 20px 30px;
    .title {
      margin-bottom: 20px;
      font-weight: bold;
    }
    .author{
      margin-bottom: 20px;
    }
    .content {
      margin-bottom: 20px;
      color: #666;
    }
    .directorty{
      padding: 20px;
      background: #f9f9f9;
      .subtitle{
        margin-bottom: 20px;
        font-weight: bold;
      }
      .dir{
        padding: 10px;
        display: block;
        color:#ff976a;
      }
    }
  }
}
</style>
