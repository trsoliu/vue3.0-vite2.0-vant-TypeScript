<template>
  <div class="demo-box">
    <h4>isRef</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, isRef } from 'vue'
export default defineComponent({
  setup() {
    const name=ref<string>("张三");
    const age:number=18;
    console.log("isRef(name):",isRef(name)); // true
    console.log("isRef(age):",isRef(age)); // false
    return {}
  },
})
</script>
