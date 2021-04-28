<template>
  <div class="demo-box">
    <h4>isReactive</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, isReactive } from 'vue'
export default defineComponent({
  setup() {
    const obj = {
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
    }
    const state=reactive(obj)
    console.log('isReactive(state):', isReactive(state)) // true
    console.log('isReactive(obj):', isReactive(obj)) // false
    return {}
  },
})
</script>
