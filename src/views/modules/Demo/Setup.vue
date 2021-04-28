<template>
  <div class="demo-box">
    <h4>Setup</h4>
    <div>{{ state.valueObj.count }}</div>
    <button @click="plus">+</button>
    <button @click="minus">-</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup(props, context) {
    //context.attrs
    //context.slots
    //context.emit
    console.log('context.attrs:', context.attrs)
    console.log('context.slots:', context.slots)
    console.log('context.emit:', context.emit)
    const state = reactive({
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
    console.log('state:', state)
    const plus = () => {
      state.valueObj.count++
    }
    const minus = () => {
      state.valueObj.count--
    }
    return {
      state,
      plus,
      minus,
    }
  },
})
</script>
