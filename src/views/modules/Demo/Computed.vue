<template>
  <div class="demo-box">
    <h4>Computed</h4>
    <div>count:{{ count }}</div>
    <button @click="plus">+</button>
    <button @click="minus">-</button>
    <div>readonlyNum:{{ readonlyNum }}</div>
    <!-- <button @click="plus2">+</button>
    <button @click="minus2">-</button> -->
    <div>computedNum:{{computedNum}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,computed } from 'vue'
export default defineComponent({
  setup() {
    const count = ref<number>(99)
    const num = ref<number>(99)
    const number = ref<number>(99)
    console.log('count:', count)
    const plus = () => {
      count.value++
    }
    const minus = () => {
      count.value--
    }
    
    // 1.创建只读的计算属性
    // 根据 num 的值，创建一个响应式的计算属性 readonlyCount,它会根据依赖的 ref 自动计算并返回一个新的 ref
    const readonlyNum = computed(() => num.value+1) 
    console.log('readonlyNum:', readonlyNum.value) //readonlyNum: 100
    // const plus2 = () => {
    //   readonlyNum.value++ //Cannot assign to 'value' because it is a read-only property.
    // }
    // const minus2 = () => {
    //   readonlyNum.value-- //Cannot assign to 'value' because it is a read-only property.
    // }


    // 2.通过set()、get()方法创建一个可读可写的计算属性
    // 根据 num 的值，创建一个响应式的计算属性 computedNum,它会根据依赖的 ref 自动计算并返回一个新的 ref
    const computedNum=computed({
      get:()=>{
        return number.value+10 
      },
      set:val=>{
         setTimeout(()=>{
           number.value=val-1
         },2000)
      }
    })
    console.log("computedNum1:",computedNum.value) //109
    // 为计算属性赋值的操作，会触发 set 函数, num.value 的值会被更新为201
    computedNum.value=202
    // 此处触发 get 函数，computedNum.value的值被更新为201+10=>211
    console.log("computedNum2:",computedNum.value) //211
    return {
      count,
      readonlyNum,
      plus,
      minus,
      // plus2,
      // minus2,
      computedNum,
    }
  },
})
</script>
