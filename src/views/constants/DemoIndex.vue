<template>
  <van-nav-bar
    title="vue3.0 "
    fixed
  />
  <div class="list">
    <h4>defineProperty、proxy 及 reactive/ref原理</h4>
    <template v-for="(item, index) in state.dpList" :key="index">
      <router-link :to="item.path">{{ item.name }}</router-link>
    </template>
    <h4>composition API</h4>
    <template v-for="(item, index) in state.compositionAPIList" :key="index">
      <!-- <a :href="item.path">{{ item.name }}</a> -->
      <router-link :to="item.path">{{ item.name }}</router-link>
    </template>
    <h4>reactivity API</h4>
    <template v-for="(item, index) in state.reactivityAPIList" :key="index">
      <router-link :to="item.path">{{ item.name }}</router-link>
    </template>
    <h4>build in components</h4>
    <template v-for="(item, index) in state.buildInComponents" :key="index">
      <router-link :to="item.path">{{ item.name }}</router-link>
    </template>
    <h4>vuex & router</h4>
    <template v-for="(item, index) in state.vuexAndRouter" :key="index">
      <router-link :to="item.path">{{ item.name }}</router-link>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { NavBar } from 'vant'
export default defineComponent({
  name: 'Index',
  components:{
    [NavBar.name]: NavBar,
  },
  setup: () => {
    const count = ref(0)

    const state = reactive<any>({
      dpList: [
        {
          name: 'defineProperty',
          path: './defineProperty',
        },
        {
          name: 'proxy',
          path: './proxy',
        },
        {
          name: 'reactive/ref',
          path: './reactiveref',
        },
      ],
      compositionAPIList: [
        {
          name: 'setup',
          path: './setup',
        },
        {
          name: 'Lifecycle Hooks',
          path: './lifecycleHooks',
        },
        {
          name: 'Provide',
          path: './provide',
        },
        {
          name: 'Inject',
          path: './inject',
        },
        {
          name: 'getCurrentInstance',
          path: './getCurrentInstance',
        },
      ],
      reactivityAPIList: [
        {
          name: 'reactive',
          path: './reactive',
        },
        {
          name: 'isReactive',
          path: './isreactive',
        },
        {
          name: 'ref',
          path: './ref',
        },
        {
          name: 'isRef',
          path: './isref',
        },
        {
          name: 'toRefs',
          path: './torefs',
        },
        {
          name: 'computed',
          path: './computed',
        },
        {
          name: 'watchEffetc',
          path: './watchEffetc',
        },
        {
          name: 'watchReactive',
          path: './watchreactive',
        },
        {
          name: 'watchRef',
          path: './watchref',
        },
        {
          name: 'watchMult',
          path: './watchmult',
        },
        {
          name: 'watchStop',
          path: './watchStop',
        },
      ],
      buildInComponents: [
        {
          name: 'teleport',
          path: './teleport',
        },
      ],
      vuexAndRouter: [
        {
          name: 'bilibili',
          path: '/bilibili/list',
        },
      ],
    })
    return { state }
  },
})
</script>

<style scoped>
.list {
  width: 100%;
  padding: 100px 50px 50px 50px;
  box-sizing: border-box;
}
h4 {
  width: 100%;
  float: left;
}
a {
  float: left;
  padding: 20px;
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
