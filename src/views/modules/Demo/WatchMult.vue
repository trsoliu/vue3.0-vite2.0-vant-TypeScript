<template>
  <div class="demo-box">
    <h4>watch-mult</h4>
    <!-- <div>refState:{{ refState }}</div> -->
    <div>oldVal:{{ watchState.oldVal }}</div>
    <br />
    <div>newVal:{{ watchState.newVal }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用reactive声明的数据源
    const reactiveState = reactive({
      valueObj: {
        count: 100,
        value: 'hello',
      },
      msg: 'hello proxy',
      count: 10,
      obj: {
        name: '李大爷',
        age: 80,
        children: {
          name: '李四',
          age: 50,
          children: {
            name: '李小四',
            age: 20,
          },
        },
      },
    })
    const watchState = reactive<any>({
      oldVal: [],
      newVal: [],
    })
    //2.监听用ref声明的数据源
    const refState = ref<number>(99)
    // 监听多数据源
    watch(
      [() => reactiveState.valueObj.count, refState],
      (newVal: any, oldVal: any) => {
        console.log('oldVal:', oldVal) //[proxy(reactiveState-oldVal),99]
        watchState.oldVal = oldVal
        console.log('newVal:', newVal) //[proxy(reactiveState-newVal),201]
        watchState.newVal = newVal
      },
      { deep: true }
    )
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() =>
      console.log('reactiveState.valueObj.count:', reactiveState.valueObj.count)
    )
    watchEffect(() => console.log('refState.value:', refState.value))
    setTimeout(() => {
      // 修改 reactiveState.valueObj.count 和 refState 时会触发watch 的回调, 打印变更前后的值
      reactiveState.valueObj.count = 101
      refState.value = 201
    }, 2000)

    return {
      reactiveState,
      refState,
      watchState,
    }
  },
})
</script>
