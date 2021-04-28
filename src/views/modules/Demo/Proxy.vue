<template>
  <div class="demo-box">
    <h4>proxy</h4>
    <input id="input" />
    <div id="proxy">hello proxy</div>
  </div>
</template>
<script setup> 
import { onMounted } from 'vue'
// 模拟 Vue 中的 data 选项
let data = {
  msg: 'hello proxy',
  count: 10
}
const vm = new Proxy(data, {
  // 执行代理行为的函数
  // 当访问 vm 的成员会执行
  get (target, key) {
    console.log('get-key-target: ', key, target)
    return target[key]
  },
  // 当设置 vm 的成员会执行
  set (target, key, newValue) {
    console.log('set-key-newValue: ', key, newValue)
    if (target[key] === newValue) {
      return true
    }
    target[key] = newValue
    document.querySelector('#proxy') ? document.querySelector('#proxy').textContent = newValue : '';
    return true
  }
})
console.log(vm)
onMounted(() => {
  //检测对象的变化。
  const input = document.getElementById('input');
  //当输入框数据发生改变时，数据跟着改变
  input.oninput = function () {
    vm.msg = this.value;
  }
})
</script>
