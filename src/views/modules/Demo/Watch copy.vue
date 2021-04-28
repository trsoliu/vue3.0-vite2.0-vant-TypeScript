<template>
  <div class="demo-box">
    <h4>watch</h4>
    <h5>watch-reactive</h5>
    <div ref="ws">oldVal:{{ reactiveSate.oldVal }}</div>
    <div>newVal:{{ reactiveSate.newVal }}</div>
    <!-- <div>{{ count }}</div>
    <button @click="plus">+</button>
    <button @click="minus">-</button> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  watchEffect,
  reactive,
  ref,
  toRef,
  onMounted,
} from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用reactive声明的数据源
    const reactiveSate = reactive<any>({
      valueObj: {
        count: 100,
        value: 'hello',
      },
      oldVal: 0,
      newVal: 0,
    })
    watch(
      () => reactiveSate.valueObj,
      (newVal, oldVal) => {
        console.log('oldVal:', oldVal) //100
        reactiveSate.oldVal = oldVal
        console.log('newVal:', newVal) //201
        reactiveSate.newVal = newVal
      },
      { deep: true }
    )
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() =>
      console.log('reactiveSate.valueObj.value:', reactiveSate.valueObj.value)
    )
    watchEffect(() =>
      console.log('reactiveSate.valueObj.count:', reactiveSate.valueObj.count)
    )
    setTimeout(() => {
      reactiveSate.valueObj.count = 201
    }, 2000)

    const ws = ref<any>(null)
    onMounted(() => {
      console.log(11111, ws.value)
    })

    return {
      reactiveSate,
      ws,
    }
  },
})
</script>
