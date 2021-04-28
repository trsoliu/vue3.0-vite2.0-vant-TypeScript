<template>
  <div class="demo-box">
    <h4>toRefs</h4>
    <div>name:{{name}}</div>
    <div>state.name:{{state.name}}</div>
    <div>age:{{age}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      name: '张三',
    })
    const age = ref(18)

    return {
      ...toRefs(state),
      state,
      age
    }
  },
})
</script>
