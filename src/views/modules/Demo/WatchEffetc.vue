<template>
  <div class="demo-box">
    <h4>watchEffetc</h4>
    <div>reactiveState.valueObj.count:{{ reactiveState.valueObj.count }}</div>
    <br />
    <div>reactiveState.msg:{{ reactiveState.msg }}</div>
    <br />
    <div>reactiveState.count:{{ reactiveState.count }}</div>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, reactive } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用reactive声明的数据源
    const reactiveState = reactive({
      valueObj: {
        count: 100,
        value: 'hello',
      },
      msg: 'hello',
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
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() => {
      console.log('reactiveState.valueObj.count:', reactiveState.valueObj.count)
      console.log('reactiveState.valueObj.msg:', reactiveState.msg)
      //reactiveState.valueObj.count 和 reactiveState.msg变化后 都会触发执行监听，并reactiveState.count++
      reactiveState.count++
    })
    setTimeout(() => {
      reactiveState.valueObj.count = 201
    }, 2000)
    setTimeout(() => {
      reactiveState.msg = 'hello watchEffetc'
    }, 3000)
    return {
      reactiveState,
    }
  },
})
</script>
