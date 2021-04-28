<template>
  <div class="demoLayout">
    <van-nav-bar
      title="vue3.0 "
      left-text="返回"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
import { NavBar } from 'vant'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'demoLayout',
  components: {
    [NavBar.name]: NavBar,
  },
  setup() {
    const { replace } = useRouter()
    const onClickLeft = () => {
      replace({
        path:'./demoindex'
      })
    }
    return {
      onClickLeft,
    }
  },
})
</script>

<style lang="less" scoped>
.demoLayout {
  width: 100%;
  padding-top: 50px;
  background: #fff;
}
</style>
