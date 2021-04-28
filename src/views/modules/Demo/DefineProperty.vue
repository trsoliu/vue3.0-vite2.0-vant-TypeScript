
<template>
  <div class="demo-box">
    <h4>defineProperty</h4>
    <input id="input" />
    <div id="defineProperty">hello defineProperty</div>
  </div>
</template>

<script setup> 
import { onMounted } from 'vue'
// //1.单个属性绑定
// //模拟 Vue 中的 data 选项 
// let data = {
//   msg: 'hello',
// }
// // 模拟 Vue 的实例 
// let vm = {}
// //数据劫持：当访问或者设置 vm 中的成员的时候，做一些干预操作 
// Object.defineProperty(vm, 'msg', {
//   // 可枚举（可遍历） 
//   enumerable: true,
//   // 可配置（可以使用 delete 删除，可以通过 defineProperty 重新定义） 
//   configurable: true,
//   // 当获取值的时候执行 
//   get () {
//     console.log('get: ', data.msg)
//     return data.msg
//   },
//   // 当设置值的时候执行 
//   set (newValue) {
//     console.log('set: ', newValue)
//     if (newValue === data.msg) {
//       return
//     }
//     data.msg = newValue
//     // 数据更改，更新 DOM 的值 
//     document.querySelector('#defineProperty').textContent = data.msg
//   }
// })
// //页面结构加载完
// onMounted(() => {
//   //检测对象的变化。
//   const input = document.getElementById('input');
//   //当输入框数据发生改变时，数据跟着改变
//   input.oninput = function () {
//     vm.msg = this.value;
//   }
//   // 初始化绑定和更新视图
//   console.log(data.msg, 21)
//   vm.msg = 11;
//   console.log("vm1:", vm)
// })


// //2.单个对象及对象下属性绑定
// // 模拟 Vue 中的 data 选项 
// let data = {
//   msg: 'hello',
//   count: 10
// }
// // 模拟 Vue 的实例 
// let vm={}
// function proxyData (obj) {
//   // 遍历 obj 对象的所有属性
//   Object.keys(obj).forEach(key => {
//     console.log("obj:", obj)
//     // 把 obj 中的属性，转换成 vm 的 setter/setter
//     Object.defineProperty(vm, key, {
//       enumerable: true,
//       configurable: true,
//       get () {
//         console.log('get: ', key, obj[key])
//         return obj[key]
//       },
//       set (newValue) {
//         console.log('set: ', key, newValue)
//         if (newValue === obj[key]) {
//           return
//         }
//         obj[key] = newValue
//         // 数据更改，更新 DOM 的值
//         document.querySelector('#defineProperty').textContent = obj[key]
//       }
//     })
//   })
// }
// //执行绑定
// proxyData(data)
// //页面结构加载完
// onMounted(() => {
//   //检测对象的变化。
//   const input = document.getElementById('input');
//   //当输入框数据发生改变时，数据跟着改变
//   input.oninput = function () {
//     vm.msg = this.value;
//   }
//   // 初始化绑定和更新视图
//   console.log(data.msg,21)
//   vm.msg = 11;
//   console.log("vm2:", vm)
// })


//3.多层级子属性绑定
//模拟 Vue 中的 data 选项 
let data = {
  valueObj: {
    value: 'hello'
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
        age: 20
      }
    }
  }
}
function ProxyData (obj) {
  // debugger
  //循环获取对象属性名称
  for (let key of Object.keys(obj)) {
    //当获取属性对应值是对象时，递归解析下去
    if (typeof obj[key] === 'object') {
      obj[key] = new ProxyData(obj[key]);
    }
    // 使用Object,definPropert的set检测数据的改变，入参：当前对象，当前属性。
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get () {
        console.log('get-key:', key);
        return obj[key];
      },
      set (newVal) {
        console.log('set-key:' + key);
        console.log('newVal:', newVal);
        if (newVal === obj[key]) {
          return true;
        }
        obj[key] = newVal;
        document.querySelector('#defineProperty') ? document.querySelector('#defineProperty').textContent = vm.valueObj.value : '';
      }
    })
  }
}
// 模拟 Vue 的实例 
const vm = new ProxyData(data);
onMounted(() => {
  //检测对象的变化。
  const input = document.getElementById('input');
  //当输入框数据发生改变时，数据跟着改变
  input.oninput = function () {
    console.log("this.value:", this.value, vm)
    vm.valueObj.value = this.value;
  }
  console.log("data3:", vm)
})

</script>
