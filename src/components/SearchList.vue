<template>
  <div class="video-list">{{params}}
    <div
      class="box"
      v-for="(item, index) in searchList.result"
      :key="index"
      @click="setVideoBvid(item.bvid)"
    >
      <!-- <img :src="item.pic" alt="" /> -->
      <div class="author">up主：{{ item.author }}</div>
      <div class="title" v-html="item.title"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, watchEffect,watch, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import {
  // ActionTypes as BilibiliActionTypes,
  MutationTypes as BilibiliMutationTypes,
  // GettersTypes as BilibiliGettersTypes,
} from '@/store/modules/bilibili/types'
export default defineComponent({
  name: 'SearchList',
  // props 传入的读取问题需注意
  props: {
    searchList: {
      type: Object,
      required: true,
    },
  },
  setup: (props, ctx) => {
    const params:any = inject('params')
    console.log('params-children:', params)
    const { push } = useRouter()
    const store = useStore()
    //跳转到详情页面
    const setVideoBvid = (bvid: string) => {
      store.commit('bilibili/' + BilibiliMutationTypes.BVID, bvid)
      push({
        path: '/bilibili/details',
      })
    }
    //此时监听reactive params的变化
    watch(()=>params.keyword,(nv,ov)=>{
      console.log(nv,ov)
    })
    return {params,setVideoBvid }
  },
})
</script>

<style lang="less" scoped>
.video-list {
  margin-top: 0px;
  .box {
    padding: 20px 30px;
    border-bottom: 1px solid #999;
    .author {
      font-weight: bold;
    }
    .title {
      font-weight: bold;
    }
  }
}
</style>