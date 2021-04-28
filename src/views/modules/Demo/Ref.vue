<template>
  <div class="demo-box">
    <h4>Ref</h4>
    <div>{{ count }}</div>
    <button @click="plus">+</button>
    <button @click="minus">-</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const count = ref<number>(99)
    console.log('count:', count)
    const plus = () => {
      count.value++
    }
    const minus = () => {
      count.value--
    }
    return {
      count,
      plus,
      minus,
    }
  },
})
</script>
