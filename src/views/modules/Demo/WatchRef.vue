<template>
  <div class="demo-box">
    <h4>watch-ref</h4>
    <div>refState:{{ refState }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect, ref } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用ref声明的数据源
    const refState = ref<number>(100)
    watch(
      () => refState,
      (newVal, oldVal) => {
        console.log('oldVal:', oldVal) //100
        console.log('newVal:', newVal) //201
      }
    )
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() => console.log('refState.value:', refState.value))
    setTimeout(() => {
      // 修改 refState 时会触发watch 的回调, 打印变更前后的值
      refState.value = 201
    }, 2000)

    return {
      refState,
    }
  },
})
</script>
