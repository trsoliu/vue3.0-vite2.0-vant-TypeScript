<template>
  <div class="demo-box">
    <h4>reactive</h4>
    <input id="reactiveInput" />
    <div id="reactive">hello reactive</div>
    <h4>ref</h4>
    <input id="refInput" />
    <div id="ref">hello ref</div>
  </div>
</template>
<script setup> 
import { onMounted } from 'vue'

let reactiveObj = {
  name: '李大爷',
  age: 80,
  children: {
    name: '李四',
    age: 50,
    children: {
      name: '李小四',
      age: 20
    }
  }
}
// reactive
function reactive (obj) {
  // 首先判断obj的类型，proxy代理的是对象
  if (typeof obj === 'object') {
    if (obj instanceof Array) {
      // 如果是数组那么取出数组中的每一个元素，判断每一个元素是否又是对象，如果是对象也需要包装成Proxy
      obj.forEach(item => {
        if (typeof (item, index) === 'object') {
          item[index] = reactive(item)
        }
      })
    } else {
      // 如若是对象 取出对象中的每一个值 判断对象的属性的值是否又是对象，如果是也需要包装成Proxy
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          obj[key] = reactive(obj[key])
        }
      }
    }
  } else {
    console.warn(`传入的内容: ${obj}不是一个对象`)
  }
  return new Proxy(obj, {
    get (obj, key) {
      console.log("获取值")
      return obj[key]
    },
    set (obj, key, newValue) {
      console.log("改变值", obj, key, newValue)
      obj[key] = newValue
      document.querySelector('#reactive') ? document.querySelector('#reactive').textContent = reactiveState.children.children.name : '';
      document.querySelector('#ref') ? document.querySelector('#ref').textContent = refState.value : '';
      return true  // 表示当前操作成功 继续执行下一步
    }
  })
}
// ref
function ref (val) {
  return reactive({ value: val })
}

let reactiveState = reactive(reactiveObj)

console.log(1, reactiveState)
console.log(2, reactiveState.name)
console.log(3, reactiveState.children.name)
console.log(4, reactiveState.children.children.name)
let refState = ref("张三")
console.log("refState:", refState)
onMounted(() => {
  //检测对象的变化。
  const reactiveInput = document.getElementById('reactiveInput');
  const refInput = document.getElementById('refInput');
  console.log("reactiveInput:", reactiveInput)
  //当输入框数据发生改变时，数据跟着改变
  reactiveInput.oninput = function () {
    console.log("this.value:", this.value)
    reactiveState.children.children.name = this.value;
  }
  refInput.oninput = function () {
    refState.value = this.value;
  }
})
</script>
