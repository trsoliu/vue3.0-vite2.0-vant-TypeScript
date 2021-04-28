<template>
  <div class="demo-box">
    <h4>Lifecycle Hooks</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent,onBeforeMount,onMounted, onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onErrorCaptured,onRenderTracked,onRenderTriggered } from 'vue'

export default defineComponent({
  // options API 对象编程
  beforeCreate(){
    console.log('--beforeCreate!')
  },
  created(){
    console.log('--created!')
  },
  beforeMount(){
    console.log('--beforeMount!')
  },
  mounted(){
    console.log('--mounted!')
  },
  beforeUpdate(){
    console.log('--beforeUpdate!')
  },
  updated(){
    console.log('--updated!')
  },
  beforeUnmount(){
    console.log('--beforeUnmount!')
  },
  unmounted(){
    console.log('--unmounted!')
  },
  errorCaptured(){
    console.log('--errorCaptured!')
  },
  renderTracked(){
    console.log('--renderTracked!')
  },
  renderTriggered(){
    console.log('--renderTriggered!')
  },
  //composition API 函数编程
  setup(props, context) {
    console.log("setup!")

    onBeforeMount(()=>{
      console.log('onBeforeMount!')
    })
    onMounted(()=>{
      console.log('onMounted!')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate!')
    })
    onUpdated(() => {
      console.log('onUpdated!')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount!')
    })
    onUnmounted(() => {
      console.log('onUnmounted!')
    })
    onErrorCaptured(() => {
      console.log('onErrorCaptured!')
    })
    onRenderTracked(() => {
      console.log('onRenderTracked!')
    })
    onRenderTriggered(() => {
      console.log('onRenderTriggered!')
    })
    return {
      
    }
  },
})
</script>
