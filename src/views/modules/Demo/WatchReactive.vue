<template>
  <div class="demo-box">
    <h4>watch-reactive</h4>
    <div>oldVal:{{ reactiveState.oldVal }}</div>
    <div>newVal:{{ reactiveState.newVal }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect, reactive } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用reactive声明的数据源
    const reactiveState = reactive<any>({
      valueObj: {
        count: 100,
        value: 'hello',
      },
      oldVal: 0,
      newVal: 0,
    })
    watch(
      () => reactiveState.valueObj.count,
      (newVal, oldVal) => {
        console.log('oldVal:', oldVal) //100
        reactiveState.oldVal = oldVal
        console.log('newVal:', newVal) //201
        reactiveState.newVal = newVal
      }
    )
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() =>
      console.log('reactiveState.valueObj.value:', reactiveState.valueObj.value)
    )
    watchEffect(() =>
      console.log('reactiveState.valueObj.count:', reactiveState.valueObj.count)
    )
    setTimeout(() => {
      // 修改 reactiveState.valueObj.count 时会触发watch 的回调, 打印变更前后的值
      reactiveState.valueObj.count = 201
    }, 2000)

    return {
      reactiveState,
    }
  },
})
</script>
