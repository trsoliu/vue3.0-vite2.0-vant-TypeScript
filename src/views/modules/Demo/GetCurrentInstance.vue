<template>
  <div class="demo-box">
    <h4>getCurrentInstance</h4>
    <div ref="gti"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  mounted() {
    console.log('this:', this)
  },
  setup(props, context) {
    const instance: any = getCurrentInstance() //可代替options API 中的 this
    console.log(
      'instance.appContext.config.globalProperties:',
      instance.appContext.config.globalProperties // 读取全局 property
    ) // 访问 globalProperties
    console.log('instance:', instance)
    return {}
  },
})
</script>
