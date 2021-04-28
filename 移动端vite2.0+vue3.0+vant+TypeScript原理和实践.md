```js

/*
* @Author           trsoliu/trsoliu@gmail.com
* @Contact          wechat:trsoliu
* @Date             2021-04-04
* @LastEditTime:    2021-04-25 23:10:00
* @Description      移动端 vue3.0+vite2.0+vant+TypeScript 原理和实践
* @Link             https://juejin.cn/user/4248168659433607
* @Github demo源码   https://github.com/trsoliu/vue3.0-vite2.0-vant-TypeScript
*/
```

## 前言

本文默认读者具有vue2.0相关知识基础，并有一定的项目实践经验。

### 为什么要学vite？

随着 vue 发展到今天已然是三大主流框架之一，在国内更是备受追捧，成为了找工作的必备技能，伴随着 vue3 的发布，崭新的开发工具 vite2.0 也进入到开发者的视线范围里。

如果说webpack是武学宗师的话，那么vite就是生怀绝技的奇才少年。

更快，更快，更快，这是我最近看到的对 vite2.0 评价最多的词。无疑，vite2.0 极大可能将会成为下一代的打包工具（rollup/parcel/webpack等->vite），在esm+[esbuild](https://esbuild.github.io/)(go)的基础上对基于commonJS+nodejs(js)的webpack进行降维打击，且 vite 拥抱大部分vue同类型框架。
![yyx-vite](https://note.youdao.com/yws/api/personal/file/WEB2757d3a9023f6239039786cf7907da5a?method=download&shareKey=d661b74a35312b9bffef671ee3340044)

## vite与webpack的基本工作过程和原理

### webpack

Webpack Dev Server 在冷启动和热更新时，需要先build—遍，且build的过程耗时巨大。浏览器根据路由按需加载该业务模块下所有的代码。所以 vite 对比使用 vue-cli-service serve 的时候，会有明显感觉快很多。

#### webpack打包过程

```js
1. 识别入口文件（如：index.html）；
2. 逐层识别模块依赖（webpack会对Commonjs、amd或者es6的import形式的模块进行分析，来获取代码的依赖）；
3. 分析代码 => 转换代码 => 编译代码 => 输出代码；
4. 形成代码包；
```

#### webpack原理

```js
1. 先逐级递归识别依赖，构建依赖图谱;
2. 将代码转化成AST抽象语法树;
3. 在AST阶段中去处理代码;
4. 把AST抽象语法树转成浏览器可以识别的代码，然后输出;
```

#### webpack对比vite的优缺点

```js
优点：
1. 生态丰富，成熟度高；
缺点：
1. 随着项目迭代和依赖包增长，抓取和构建应用的开发服务器的启动时间随之增长；
2. 热更新时间也会随着项目大小增大而增长。
```

![vue-cli-service](https://note.youdao.com/yws/api/personal/file/WEB91ffad080e72f67fc6958a0f54e1a430?method=download&shareKey=d661b74a35312b9bffef671ee3340044)
![bundle](https://note.youdao.com/yws/api/personal/file/WEB4cdde6d89ba47dd1605bfa65921acafb?method=download&shareKey=d661b74a35312b9bffef671ee3340044)

### [vite](https://cn.vitejs.dev/)

vite 是一个面向现代浏览器的一个更轻、更快的 Web 应用开发工具。Vite serve （koa）在冷启动和热更新时，内部直接启动了 Web Server，并不会先编译所有的代码文件（对源码和依赖进行区分）。

它基于 ECMASCRIPT 标准原生模块系统 （ES Modules）实现。随着现代浏览器对 import/export 语法的支持，和vite引入了go语言编写的[esbuild](https://esbuild.github.io/)工具，直接极速编译成在浏览器引擎下运行的navtive代码，浏览器可在路由按需加载业务模块后，根据模块代码运行按需加载依赖（实际上让浏览器承担了代码打包的任务）；

2021/20/18号发布[vite2.0](https://zhuanlan.zhihu.com/p/351147547);

#### vite打包过程

development环境下启动serve后不打包，仅使用esbuild来做预构建依赖，production环境下使用rollup来build（参考webpack）。

#### vite原理

```js
//index.html
//在入口文件index.html中声明一个类型为 module 的 script 标签 ，并引入文件“main.js”
<script type="module" src="/src/main.js"></script>
//浏览器就向服务器（vite server 启动3000端口）发起请求，获取入口文件 index.html

//main.js
//通过入口文件请求到http://localhost:3000/src/main.js请求main.js文件。
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')

//浏览器请求到了main.js文件，检测到内部含有import引入的包，又会对其内部的 import 引用发起 HTTP 请求获取模块的内容文件
//如：GET http://localhost:3000/@modules/vue.js
//如：GET http://localhost:3000/src/App.vue
//vite 的主要功能就是通过劫持浏览器的这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再返回给浏览器，vite整个过程中没有对文件进行打包编译，所以其运行速度比原始的webpack开发编译速度快出许多！
```

![vite-interceptors](https://note.youdao.com/yws/api/personal/file/WEBbdb47b4ef3d6091efb26429e5462c6b7?method=download&shareKey=d661b74a35312b9bffef671ee3340044)

#### vite比对webpack的优缺点

```js
优点：
1. 毫秒级服务启动时间（< 300ms）
2. 毫秒级模块热替换时间(HMR) （< 100ms）；
3. 真正的按需编译;

缺点：
1. vite的生态没有webpack丰富；
2. 仅在开发环境使用esbuild，prod环境构建目前使用rollup（esbuild对于css和代码分割等不友好）；
```

![vite-serve](https://note.youdao.com/yws/api/personal/file/WEBd94283e85fd280ae5c73a61f134b5bd2?method=download&shareKey=d661b74a35312b9bffef671ee3340044)

![esm](https://note.youdao.com/yws/api/personal/file/WEB82bb8f2b5e18ec6da5d33f3abb84c0c1?method=download&shareKey=d661b74a35312b9bffef671ee3340044)

## vite2.0开箱

### 安装vite脚手架

```bash
npm install -g create-vite-app
# or1
yarn add -g create-vite-app
```

### 初始化项目

```js
//初始化设置为 vue ts 模版
npm init @vitejs/app <project-name>  --template vue-ts
cnpm install
//重要依赖
cnpm install vuex@next --save
cnpm install vue-router@4 --save
cnpm install vuex-persistedstate --save
cnpm install axios --save
cnpm install less --save
//重置浏览器样式，引入 vant 可以不加
cnpm install normalize.less --save
// 引入第三方 UI 库 vant
cnpm install vant@next --save
//路由加载时的加载进度条
cnpm install nprogress --save
//@vite --------------
//解决找不到模块“path”或其相应的类型声明
cnpm install @types/node --save-dev
cnpm install @vitejs/plugin-vue --save-dev
cnpm install @vitejs/plugin-vue-jsx --save-dev
//解决 less 引入问题，第三方 UI 库样式按需加载
cnpm install vite-plugin-style-import --save-dev
// 自动添加 css 前缀插件
cnpm install autoprefixer --save-dev 
//px2vw
cnpm install postcss-px-to-viewport --save-dev
//浏览器兼容
cnpm install @vitejs/plugin-legacy --save-dev
//打包压缩 参考文档：https://github.com/anncwb/vite-plugin-compression
cnpm install vite-plugin-compression --save-dev

```

### 注意事项

- 1.node版本 >= 12.0.0;
- 2.淘宝镜像cnpm下执行`cnpm init @vitejs/app project-name`
此时默认项目名称为init;
- 3.国内网络环境下yarn、npm、cnpm 还是cnpm快（除私服）;
- 4.Vue.js devtools 使用beta版本/模版中使用的变量，一定要先定义变量，否则页面会出现大量vue warn卡死，需要在浏览器扩展程序中把2.0版本的关掉;

### vite2.0 环境变量与模式

#### 环境变量

vite 在一个特殊的 import.meta.env 对象上暴露环境变量;

```js
//普遍适用的内建变量
//等同于process.env.NODE_ENV
import.meta.env.MODE: {string} 应用运行基于的[模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)。

import.meta.env.BASE_URL: {string} 应用正被部署在的 base URL。它由 [base 配置项](https://cn.vitejs.dev/config/#base)决定。

import.meta.env.PROD: {boolean} 应用是否运行在生产环境

import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD 相反)

import.meta.globEager: {object} 项目文件列表对象 //const modules = import.meta.globEager('./modules/**/*.ts')
```

#### 模式

默认情况下，开发服务器 (serve 命令) 运行在 development （开发）模式，而 build 命令运行在 production （生产）模式。

```bash
# 这意味着当执行 vite build 时，它会自动加载 .env.production 中可能存在的环境变量：
# 在你的应用中，你可以使用 import.meta.env.VITE_APP_TITLE 作为渲染标题。
# .env.production
VITE_APP_TITLE=My App

```

```bash
# 然而重要的是，要理解模式是一个更广泛的概念，而不仅仅是开发和生产。一个典型的例子是，你可能希望有一个 “staging” 模式，它应该具有类似于生产的行为，但环境变量与生产环境略有不同。
# 你可以通过传递 --mode 选项标志来覆盖命令使用的默认模式。例如，如果你想为我们假设的 staging 模式构建应用:
vite build --mode staging
```

```bash
# 为了使应用实现预期行为，我们还需要一个 .env.staging 文件：
# .env.staging
NODE_ENV=production
VITE_APP_TITLE=My App (staging)
```

### vite.config.ts（vite2.0）配置

```js
/*
 * @Description: vite.config.ts vite2.0配置
 * @Version: 2.0
 * @Autor: trsoliu
 * @Date: 2021-04-04
 * @LastEditors: trsoliu
 * @LastEditTime: 2021-04-20
 */
/* eslint-disable prettier/prettier */
// import { defineConfig } from 'vite'
import { UserConfigExport } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import styleImport from "vite-plugin-style-import";
import autoprefixer from "autoprefixer";
import pxtoviewport from "postcss-px-to-viewport";
import legacy from "@vitejs/plugin-legacy";
import viteCompression from "vite-plugin-compression";

// export default defineConfig({})
export default function (meta: any) {
  // console.log(meta,8989)
  // meta:{ mode: 'development', command: 'serve' }
  // process.env.NODE_ENV  === "development" 等同于 meta.mode === "development" 在执行项目中环境变量为 import.meta.env.MODE === "development"
  const resolve = (dir: string) => {
    return path.resolve(__dirname, ".", dir);
  };
  const myPlugin: any = (conf: any) => {
    const virtualFileId = "@my-virtual-file";
    // 钩子
    return {
      name: "my-plugin", // 必须的，将会显示在 warning 和 error 中
      //通用钩子 ---------------------
      options(e) {
        // console.log("options:",e)
      },
      resolveId(id) {
        // console.log("resolveId:",id)
        // if (id === virtualFileId) {
        //   return virtualFileId
        // }
      },
      load(id) {
        // console.log("load1:", id);
        // if (id === virtualFileId) {
        //   return `export const msg = "from virtual file"`;
        // }
      },
      transform(id) {
        // console.log("transform:",id)
        // if (id === virtualFileId) {
        //   return `export const msg = "from virtual file"`
        // }
      },
      config(config) {
        // console.log("config:",config)
      },
      configResolved(resolvedConfig) {
        // 存储最终解析的配置
        // console.log("resolvedConfig:",resolvedConfig)
        // config = resolvedConfig
      },
      //独有钩子 ---------------------
      configureServer(server) {
        // 返回一个在内部中间件安装后被调用的后置钩子
        return () => {
          server.middlewares.use((req, res, next) => {
            // console.log("req:",req,"res:", res)
            // 自定义请求处理...
            next();
          });
        };
      },
      transformIndexHtml(html) {
        // console.log("html:",html)
        // return html.replace(
        //   /<title>(.*?)<\/title>/,
        //   `<title>Title replaced!</title>`
        // );
      },
    };
  };
  const config: UserConfigExport = {
    base: "./", //打包路径，类似vue.config.js的“publicPath: './'”
    css: {
      preprocessorOptions: {
        less: {
          // additionalData:`@import "node_modules/normalize.less/normalize.less";`,
          // @vue/cli中可以使用 style-resources-loader 来注入全局变量，vite目前只找到这种注入方法
          // 下面这个链接讨论了modifyVars.hack究竟是干什么的
          // https://stackoverflow.com/questions/60809336/customizing-ant-designs-theme-what-exactly-is-that-hack-key-in-the-modifyva
          modifyVars: {
            hack: `true; @import "node_modules/normalize.less/normalize.less";`,
            hack1: `true; @import "${resolve('src/assets/styles/common.less')}";`,
            // hack: `true; @import "${resolve('src/styles/antd.less')}";`,
            // hack2: `true; @import "${resolve('src/assets/styles/variables.less')}";`,
            // hack3: `true; @import "${resolve('src/styles/transition/index.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [
          autoprefixer(), //自动前缀
          pxtoviewport({
            //px转viewport
            viewportWidth: 750,
            selectorBlackList: ["van-"],
          }),
        ],
      },
    },
    resolve: {
      //别名
      alias: {
        "@": resolve("src"),
        vue: "vue/dist/vue.esm-bundler.js", // 定义vue的别名，如果使用其他的插件，可能会用到别名
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      myPlugin(),
      styleImport({
        libs: [
          //按需加载vant模块样式
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: (name) => {
              return `vant/es/${name}/style/index`;
            },
          },
        ],
      }),
      //浏览器兼容
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      //压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 1024,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    server: {
      open: "/#/index", //服务器启动时自动在浏览器中打开应用程序
      port: 8888, //设定端口号，默认3000
      https: false, //默认http
      cors: true,//默认启用并允许任何源
      // proxy: {
      //   // 选项写法
      //   '/api': 'http://xxxx'// 代理网址
      // },
      proxy: {
        //https://api.bilibili.com/x/web-interface/search/all/v2?keyword=vue
        "/x": {
          target:'http://api.bilibili.com',
          changeOrigin: true,
          headers: {
            referer: 'http://api.bilibili.com',
            origin: 'http://api.bilibili.com',
          }
        },
        // http://i2.hdslb.com/bfs
        "/bfs": {
          target:'http://i2.hdslb.com',
          changeOrigin: true,
          headers: {
            referer: 'http://api.bilibili.com',
            origin: 'http://api.bilibili.com',
          }
        },
      },
    },
    build: {
      target: "esnext",//设置最终构建的浏览器兼容目标
      // 去除console、debugger
      terserOptions: {
        compress: {
          drop_console: true,
          // drop_debugger: true,
        },
      },
    },
  };
  return config;
}
```

## vue3.0开箱

### vue2 与 vue3 的对比

- ES6 Proxy 比 ES5 defineProperty 监听形式更多和效率更高；
- vue3 使用 TypeScript 开发，天然在开发者使用 TypeScript 更友好；
- vue3 受ReactHook启发，告别对象编程 Options API，开启函数编程 Composition API；
- 更方便的支持了 jsx ；
- vue3 通过 Fragment 管理虚拟根节点和虚拟父级，可在一个.vue文件中创建多个 Template ，即多个根标签，vue2 不支持；
- vue3 对虚拟DOM进行了重写、对模板的编译进行了优化操作。
  
### defineProperty 和 Proxy

defineProperty是代理到静态的值级别,只能重定义属性的读取（get）和设置（set）行为。而 Proxy 是代理到对象级别的，拦截多达 13 种操作，proxy轻松的解决了vue2.0不能操作数组下标的问题。Proxy和defineProperty的一个共同特性，均不支持对象嵌套，需要递归去实现。

#### defineProperty 模拟代码

 ```html
<!--src/views/DefineProperty.vue-->
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

 ```

#### Proxy 模拟代码

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
Proxy深层代理参考下面reactive和ref原理中代码。
Proxy有13种数据劫持的操作，如下：
| 方法                     | 描述                                             |
| ------------------------ | ------------------------------------------------ |
| get                      | 获取某个key的值                                  |
| set                      | 设置某个key的值                                  |
| has                      | 使用in操作符判断某个key是否存在（Boolean）       |
| apply                    | 函数调用，仅在代理对象为function时有效           |
| ownKeys                  | 获取目标对象所有的key                            |
| construct                | 函数通过实例化调用，仅在代理对象为function时有效 |
| isExtensible             | 判断对象是否可扩展                               |
| deleteProperty           | 删除一个属性                                     |
| defineProperty           | 定义一个新的属性                                 |
| getPrototypeOf           | 获取原型对象                                     |
| setPrototypeOf           | 设置原型对象                                     |
| preventExtensions        | 设置对象为不可扩展                               |
| getOwnPropertyDescriptor | 获取一个自由属性的属性描述                       |

```html
<!--src/views/Proxy.vue-->
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

```

### reactive和ref原理

vue2.0是通过Object.defineProperty()来实现对属性的劫持，达到数据驱动的目的;
在vue3.0中，数据响应式监听方法 ref 和 reactive ，则是通过Proxy来实现的；

```html
<!--src/views/ReactiveRef.vue-->
<!--ref和reactive底层实现-->
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

```

### Composition API

#### setup 函数

setup() 函数是 vue3 中，专门为组件提供的新属性。它为我们使用 vue3 的 Composition API 新特性提供了统一的入口, setup 函数会在 beforeCreate 、created 之前执行, vue3也是取消了这两个钩子，统一用setup代替, 该函数相当于一个生命周期函数，vue中过去的data，methods，watch等全部都用对应的新增api写在setup()函数中。

- props 传入的读取问题需注意（@/components/VideoList.vue 中体验）。

```html
<!--src/views/Setup.vue-->
<template>
 <div>Setup<div>
<template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup(props, context) {
    //context.attrs
    //context.slots
    //context.emit
    return {}
  }
});
</script>
```

- props: 用来接收 props 数据;
- context 用来定义上下文, 上下文对象中包含了一些有用的属性，这些属性在 vue 2.x 中需要通过 this 才能访问到, 在 setup() 函数中无法访问到 this，是个 undefined;
- 返回值: return {}, 返回响应式数据, 模版中需要使用的函数;

#### LifeCycle Hooks (vue3.0 生命后期)

 vue3.0 的生命周期函数，可以按需导入到组件中，且只能在 setup() 函数中使用,同时 vue3.0 也保留了原来options API的用法。
| 选项式 API      | Hook inside setup |
| --------------- | ----------------- |
| beforeCreate    | Not needed*       |
| created         | Not needed*       |
| beforeMount     | onBeforeMount     |
| mounted         | onMounted         |
| beforeUpdate    | onBeforeUpdate    |
| updated         | onUpdated         |
| beforeUnmount   | onBeforeUnmount   |
| unmounted       | onUnmounted       |
| errorCaptured   | onErrorCaptured   |
| renderTracked   | onRenderTracked   |
| renderTriggered | onRenderTriggered |

```html
<!--src/views/LifecycleHooks.vue-->
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
```

#### Provide / Inject

 provide() 和 inject()  可以实现嵌套组件之间的数据传递.这两个函数只能在 setup() 函数中使用。 父组件通过 provide() 函数向下传递数据，子组件通过 inject() 来获取上层传递过来的数据。
 ![provide and inject](https://v3.cn.vuejs.org/images/components_provide.png)

 ```html
 <!--父组件 provide -->
<template>
  <div id="demo-box">
    <h4>{{title0}}</h4>
  </div>
</template>
<script>
import { ref , provide } from 'vue'
export default {
    setup() {
    let title0 = ref('我是父组件。')
    provide('title', title0);  
      return {}
    }
  }
</script>

<!--子组件 inject -->
<template>
  <div id="demo-box">
    <h4>{{title1}}</h4>
  </div>
</template>
<script>
import { ref , inject } from 'vue'
export default {
    setup() {
    let title1 = inject("title");  
    return {
      title1
    }
  }
}
</script>
 ```

#### getCurrentInstance 函数

getCurrentInstance() 只能在 setup 或生命周期钩子中调用,支持访问内部组件实例，用于高阶用法或库的开发。

 ```html
 <!--src/views/GetCurrentInstance.vue-->
<template>
  <div class="demo-box">
    <h4>getCurrentInstance</h4>
    <div ref="gti"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  mounted() {
    console.log('this:', this)
  },
  setup(props, context) {
    const instance: any = getCurrentInstance() //可代替options API 中的 this
    console.log(
      'instance.appContext.config.globalProperties:',
      instance.appContext.config.globalProperties // 读取全局 property
    ) // 访问 globalProperties
    console.log('instance:', instance)
    return {}
  },
})
</script>

</script>

 ```

### Reactivity API

#### reactive 函数

 reactive() 函数接收一个普通对象，返回一个响应式的数据对象, 想要使用创建的响应式数据也很简单，创建出来之后，在setup中return出去，直接在template中调用即可。

```html
 <!--src/views/Reactive.vue-->
 <template>
  <div class="demo-box">
    <h4>Reactive</h4>
    <div>{{ state.valueObj.count }}</div>
    <button @click="plus">+</button>
    <button @click="minus">-</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
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

 ```

#### isReactive 函数

  isReactive() 用来判断某个对象是否为 isReactive() 创建出来的对象。

```html
  <!--src/views/isReactive.vue-->
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

 ```

#### ref 函数

 ref() 函数用来根据给定的值创建一个响应式的数据对象，ref() 函数调用的返回值是一个对象，这个对象上只包含一个 value 属性, 只在setup函数内部访问ref函数需要加.value。

```html
 <!--src/views/Ref.vue-->
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
 ```

#### isRef 函数

 isRef() 用来判断某个值是否为 ref() 创建出来的对象。

```html
 <!--src/views/IsRef.vue-->
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

 ```

#### toRefs 函数

 toRefs() 函数可以将 reactive() 创建出来的响应式对象，转换为普通的对象，只不过，这个对象上的每个属性节点，都是 ref() 类型的响应式数据。

```html
 <!--src/views/ToRefs.vue-->
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
 ```

#### computed

computed()用来创造计算属性，和过去一样，它返回的值是一个ref对象。 里面可以传方法，或者一个对象，对象中包含set()、get()方法。

```html
<!--src/views/Computed.vue-->
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

```

#### watchEffect 函数

- 1.立即执行，没有惰性，页面首次加载会执行;
- 2.无需要标明要监听的内容，只要传递一个回调函数，自动检测内部代码感知代码依赖，代码中有依赖便会执行;
- 3.无法获取到当前值和原始值;
- 4.适合异步操作的数据监听。

```html
<!--src/views/WatchEffect.vue-->
<template>
  <div class="demo-box">
    <h4>watchEffetc</h4>
    <div>reactiveState.valueObj.count:{{ reactiveState.valueObj.count }}</div>
    <div>reactiveState.msg:{{ reactiveState.msg }}</div>
    <div>reactiveState.count:{{ reactiveState.count }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, reactive } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用reactive声明的数据源
    const reactiveState = reactive({
      valueObj: {
        count: 100,
        value: 'hello',
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
            age: 20,
          },
        },
      },
    })
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() => {
      console.log('reactiveState.valueObj.count:', reactiveState.valueObj.count)
      console.log('reactiveState.valueObj.msg:', reactiveState.msg)
      //reactiveState.valueObj.count 和 reactiveState.msg变化后 都会触发执行监听，并reactiveState.count++
      reactiveState.count++
    })
    setTimeout(() => {
      reactiveState.valueObj.count = 201
    }, 2000)
    setTimeout(() => {
      reactiveState.msg = 'hello watchEffetc'
    }, 3000)
    return {
      reactiveState,
    }
  },
})
</script>

```

#### watch 函数

 watch() 函数用来侦听特定的数据源，并在回调函数中的执行业务代码。默认情况是懒执行的，也就是说仅在侦听的源数据变更时才执行回调。

- 1.具有一定的惰性， 第一次页面展示的时候不会执行，只有数据变化的时候才会执行；
- 2.监听到变化前后的值,参数可以拿到 newValue 和 oldValue；
- 3.可以侦听多个数据的变化，用一个侦听起承载。

##### 监听用reactive声明的数据源

```html
 <!--src/views/WatchReactive.vue-->
<template>
  <div class="demo-box">
    <h4>watchEffetc</h4>
    <div>reactiveState.valueObj.count:{{ reactiveState.valueObj.count }}</div>
    <br />
    <div>reactiveState.msg:{{ reactiveState.msg }}</div>
    <br />
    <div>reactiveState.count:{{ reactiveState.count }}</div>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, reactive } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用reactive声明的数据源
    const reactiveState = reactive({
      valueObj: {
        count: 100,
        value: 'hello',
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
            age: 20,
          },
        },
      },
    })
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() => {
      console.log('reactiveState.valueObj.count:', reactiveState.valueObj.count)
      console.log('reactiveState.valueObj.msg:', reactiveState.msg)
      //reactiveState.valueObj.count 和 reactiveState.msg变化后 都会触发执行监听，并reactiveState.count++
      reactiveState.count++
    })
    setTimeout(() => {
      reactiveState.valueObj.count = 201
    }, 2000)
    setTimeout(() => {
      reactiveState.msg = 'hello watchEffetc'
    }, 3000)
    return {
      reactiveState,
    }
  },
})
</script>
 ```

##### 监听用ref声明的数据源
  
```html
<!--src/views/WatchRef.vue-->
<template>
  <div class="demo-box">
    <h4>watch-ref</h4>
    <div>refState:{{ refState }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect, ref } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用ref声明的数据源
    const refState = ref<number>(100)
    watch(
      () => refState,
      (newVal, oldVal) => {
        console.log('oldVal:', oldVal) //100
        console.log('newVal:', newVal) //201
      }
    )
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() => console.log('refState.value:', refState.value))
    setTimeout(() => {
      // 修改 refState 时会触发watch 的回调, 打印变更前后的值
      refState.value = 201
    }, 2000)

    return {
      refState,
    }
  },
})
</script>
  ```

##### 监听多数据源

  ```html
  <!--src/views/WatchMult.vue-->
<template>
  <div class="demo-box">
    <h4>watch-mult</h4>
    <!-- <div>refState:{{ refState }}</div> -->
    <div>oldVal:{{ watchState.oldVal }}</div>
    <br />
    <div>newVal:{{ watchState.newVal }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用reactive声明的数据源
    const reactiveState = reactive({
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
    const watchState = reactive<any>({
      oldVal: [],
      newVal: [],
    })
    //2.监听用ref声明的数据源
    const refState = ref<number>(99)
    // 监听多数据源
    watch(
      [() => reactiveState.valueObj.count, refState],
      (newVal: any, oldVal: any) => {
        console.log('oldVal:', oldVal) //[proxy(reactiveState-oldVal),99]
        watchState.oldVal = oldVal
        console.log('newVal:', newVal) //[proxy(reactiveState-newVal),201]
        watchState.newVal = newVal
      },
      { deep: true }
    )
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() =>
      console.log('reactiveState.valueObj.count:', reactiveState.valueObj.count)
    )
    watchEffect(() => console.log('refState.value:', refState.value))
    setTimeout(() => {
      // 修改 reactiveState.valueObj.count 和 refState 时会触发watch 的回调, 打印变更前后的值
      reactiveState.valueObj.count = 101
      refState.value = 201
    }, 2000)

    return {
      reactiveState,
      refState,
      watchState,
    }
  },
})
</script>Ï
  ```

##### stop监听数据源

   在 setup() 函数内创建的 watch 监视，会在当前组件被销毁的时候自动停止。如果想要明确地停止某个监视，可以调用 watch() 函数的返回值并执行，语法如下：

```html
<!--src/views/WatchStop.vue-->
<template>
  <div class="demo-box">
    <h4>watch-stop</h4>
    <!-- <div>refState:{{ refState }}</div> -->
    <div>oldVal:{{ watchState.oldVal }}</div>
    <br />
    <div>newVal:{{ watchState.newVal }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    // 1.监听用reactive声明的数据源
    const reactiveState = reactive({
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
    const watchState = reactive<any>({
      oldVal: [],
      newVal: [],
    })
    //2.监听用ref声明的数据源
    const refState = ref<number>(99)
    // 监听多数据源
    const stop = watch(
      [() => reactiveState.valueObj.count, refState],
      (newVal: any, oldVal: any) => {
        console.log('oldVal:', oldVal) //[proxy(reactiveState-oldVal),99]
        watchState.oldVal = oldVal
        console.log('newVal:', newVal) //[proxy(reactiveState-newVal),201]
        watchState.newVal = newVal
      },
      { deep: true }
    )
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect(() =>
      console.log('reactiveState.valueObj.count:', reactiveState.valueObj.count)
    )
    watchEffect(() => console.log('refState.value:', refState.value))
    setTimeout(() => {
      // 修改 reactiveState.valueObj.count 和 refState 时会触发watch 的回调, 打印变更前后的值
      reactiveState.valueObj.count = 101
      refState.value = 201
    }, 2000)
    //手动停止监听
    setTimeout(() => {
      console.log('stop:', stop)
      stop()
      // 修改 reactiveState.valueObj.count 和 refState 时会触发watch 的回调, 打印变更前后的值
      reactiveState.valueObj.count = 501
      refState.value = 601
    }, 5000)

    return {
      reactiveState,
      refState,
      watchState,
    }
  },
})
</script>
```

### Built-In Components

#### teleport

 Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下渲染了 HTML，而不必求助于全局状态或将其拆分为两个组件。

- 请注意，这将移动实际的 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态。所有有状态的 HTML 元素 (即播放的视频) 都将保持其状态。
  
 ```html
<!--src/views/Teleport.vue-->
<template>
  <div class="demo-box">
    <h4>teleport</h4>
    <button @click="modalOpen = true">
      Open full screen modal! (With teleport!)
    </button>
    <!-- <teleport> props -->
    <!-- to  指定移动 <teleport> 内容的目标元素 -->
    <!-- disabled - boolean。此可选属性可用于禁用 <teleport> 的功能，这意味着其插槽内容将不会移动到任何位置，而是在您在周围父组件中指定了 <teleport> 的位置渲染。 -->
    <teleport to="body" :disabled="disabled">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! (My parent is "body")
          <button @click="modalOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const modalOpen = ref<boolean>(false)
    const disabled = ref<boolean>(true)
    return {
      modalOpen,
      disabled,
    }
  },
})
</script>
```

## 什么是状态管理

状态资管理应用包含以下几个部分：

- state：驱动应用的数据源（如：stateObj）；
- view：将声明的state映射到视图中（template）；
- actions：响应在view上的用户操作导致的状态变化（如：触发click）。

即：单向数据流
![one-way data flow](https://next.vuex.vuejs.org/flow.png)

```html
<template>
  <div class="demo-box">
    <div>state.name:{{state.name}}</div>
    <button @click="change">change</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const stateObj = reactive({
      name: '张三',
    })
    const change = ()=> {
        stateObj.name = "李四"
    }

    return {
      stateObj,
      change
    }
  },
})
</script>
```

当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态：传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
- 来自不同视图的行为需要变更同一状态：我们经常会采用父子组件直接引用或通过事件来变更和同步状态的多份拷贝。但是这些模式非常脆弱，通常会导致无法维护的代码。

### Flux、Redux、Vuex

[Flux](https://facebook.github.io/flux/docs/overview)、[Redux](https://www.cntofu.com/book/4/readme.html)、[Vuex](https://next.vuex.vuejs.org/) 是常用的数据源状态管理模式。

#### Flux

Flux 是Facebook用于构建客户端web应用的体系结构的，利用其单向数据流来补充 React 的可组合视图组件 ，Flux 是一种模式，而不是正式的框架。

##### Flux 的组成

- View: 视图层；
- Action: 动作，即数据改变的消息对象（可通过事件触发、测试用例触发等）：
  - Store 的改变只能通过 Action；
  - 具体 Action 的处理逻辑一般放在 Store 里；
  - Action 对象包含 type （类型）与 payload （传递参数）。
- Dispatcher: 派发器，接收 Actions ，发给所有的 Store；
- Store: 数据层，存放应用状态与更新状态的方法，一旦发生变动，就提醒 Views 更新页面。

![flux](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-with-client-action-1300w.png)

##### Flux 的特点

- 单向数据流，视图事件或者外部测试用例发出 Action ，经由 Dispatcher 派发给 Store ，Store 会触发相应的方法更新数据、更新视图；
- Store 可以有多个；
- Store 不仅存放数据，还封装了处理数据的方法。

#### Redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。Redux 除了和 React 一起用外，还支持其它界面库。

##### Redux 的组成

- Store: 存储应用 state 以及用于触发 state 更新的 dispatch 方法等，整个应用仅有单一的 Store 。Store 中提供了几个 API :
  - store.getState(): 获取当前 state；
  - store.dispatch(action): 用于 View 发出 Action；
  - store.subscribe(listener): 设置监听函数，一旦 state 变化则执行该函数（若把视图更新函数作为 listener 传入，则可触发视图自动渲染）。
- Action: 同 Flux ，Action 是用于更新 state 的消息对象，由 View 发出；
  - 有专门生成 Action 的 Action Creator；

- Reducer: 是一个用于改变 state 的纯函数（对于相同的参数返回相同的返回结果，不修改参数，不依赖外部变量），即通过应用状态与 Action 推导出新的 state : (previousState, action) => newState。Reducer 返回一个新的 state 。
![redux](https://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

##### Redux 的特点

- 单向数据流。View 发出 Action (store.dispatch(action))，Store 调用 Reducer 计算出新的 state ，若 state 产生变化，则调用监听函数重新渲染 View （store.subscribe(render)）;
- 单一数据源，只有一个 Store;
- state 是只读的，每次状态更新之后只能返回一个新的 state;
- 没有 Dispatcher ，而是在 Store 中集成了 dispatch 方法，store.dispatch() 是 View 发出 Action 的唯一途径。

#### Vuex (v4.x)

Vuex 是一个专为Vue.js应用程序开发的状态管理模式（类似 React 的 Redux）。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

##### Vuex 的组成

- Store: Vuex 采用单一状态树，每个应用仅有一个 Store 实例，在该实例下包含了 state, actions, mutations, getters, modules ；
- State: Vuex 为单一数据源：
  - 可以通过 mapState 辅助函数将 state 作为计算属性访问，或者将通过 Store 将 state 注入全局之后使用 this.$store.state 访问；
    - State 更新视图是通过 vue 的双向绑定机制实现的；
- Getter: Getter 的作用与 filters 有一些相似，可以将 State 进行修饰过滤后输出；
- Mutation: Mutaion 是 vuex 中修改 State 的唯一途径（严格模式下），并且只能是同步操作。Vuex 中通过 store.commit() 调用 Mutation；
- Action: 一些对 State 的异步操作可以放在 Action 中，并通过在 Action 提交 Mutaion 变更状态：
  - Action 通过 store.dispatch() 方法触发；
  - 可以通过 mapActions 辅助函数将 vue 组件的 methods 映射成 store.dispatch 调用（需要先在根节点注入 store）；
Module: 当 Store 对象过于庞大时，可根据具体的业务需求分为多个 Module ，每个 Module 都具有自己的 state 、mutation 、action 、getter（需要开启namespace）；

##### Vuex 的特点

- 单向数据流。View 通过 store.dispatch() 调用 Action ，在 Action 执行完异步操作之后通过 store.commit() 调用 Mutation 更新 State ，通过 vue 的响应式机制进行视图更新；
- 单一数据源，和 Redux 一样全局只有一个 Store 实例；
- 可直接对 State 进行修改。

vuex 是专门为 vue 设计的状态管理库，vuex 把组件的共享状态抽取出来，以一个全局单例模式管理，在这种模式下，组件数构成一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态活触发行为。 通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，代码将变得更结构化且易维护。

![vuex](https://next.vuex.vuejs.org/vuex.png)

#### vuex的使用场景

在开发拥有大量共享的复杂数据操作的大型单页应用场景下，vuex 能轻松管理共享的数据状态。而在业务逻辑不复杂的情况下，可选择更轻量的依赖注入工具 provide、inject 函数来代替vuex。

#### 创建一个 vuex store

- 实例demo可参考bilibili模块的实例源码

```js
import { createStore } from "vuex";
<!--创建一个vuex store-->
export default createStore({
modules: {
    mymodules:{
          namespace:true, //开启命名空间，业务模块数据隔离
          state: {
            count:99
          },
          getters: {
            getCountString(state) {
                return "计算结果：" + state.count
            }
          },
          mutations: {
            PLUS(state, payload) {
              state.count= state.count + payload
            },
          },
          actions: {
            ADD({ commit }, payload) {
              setTimeout( () => {
                  commit("PLUS", payload)
              },2000)
            }
          }
      }
    }
});

```

#### get state中数据的几种方式

##### 直接获取state中的数据

```html
<!-- vue组件-->
<template>
  <div class="demo-box">
    <div>count:{{count}}</div> 
    <div>count1:{{count1}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive , computed} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore();
    // 直接获取
    const count = store.state.mymodules.count; //99
    //通过 computed 获取
    const count1 = computed(() => store.state.mymodules.count); //99
    
    return {
      count,
      count1
    }
  },
})
</script>
```

##### 使用 getters 对获取到的state中数据进行修饰处理

```html
<!-- vue组件-->
<template>
  <div class="demo-box">
    <div>countString:{{countString}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive , computed} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore();
    const countString = store.getters['mymodules/settlement'];//计算结果：99
    
    return {
      countString
    }
  },
})
</script>
```

#### set state中数据的几种方式

##### 使用 commit 方法触发 mutation 中的方法来同步更新 state 中的数据

```html
<!-- vue组件-->
<template>
  <div class="demo-box">
    <div>countString:{{countString}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive , computed} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore();
    store.commit('mymodules/PLUS',100);//此时state.count的值为199
    
    return {}
  },
})
</script>
```

##### 使用 dispatch 方法触发 action 中的方法来更新 state 中的数据

在 action 方法中再内部触发 commit 方法来更新 state，常用于异步接口请求。

```html
<!-- vue组件-->
<template>
  <div class="demo-box">
    <div>countString:{{countString}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive , computed} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch('mymodules/ADD',200);//两秒后state.count的值为299
    
    return {}
  },
})
</script>
```

## vue-router(v4.x)

- 实例demo可参考bilibili模块的实例源码

### 什么是前端路由

在 Web 前端单页应用 SPA(Single Page Application)中，路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）。

### 路由的两种方式

#### hash

##### hash的实现原理

```html
<!DOCTYPE html>
<html lang="en">
<body>
<ul>
    <ul>
        <!-- 定义路由 -->
        <li><a href="#/home">home</a></li>
        <li><a href="#/about">about</a></li>

        <!-- 渲染路由对应的 UI -->
        <div id="routeView"></div>
    </ul>
</ul>
</body>
<script>
    let routerView = document.getElementById("routeView");
    // 初始化页面加载理由管理
    window.addEventListener('DOMContentLoaded', ()=>{
        if(!location.hash){//如果不存在hash值，那么重定向到#/
            location.hash="/"
        }else{//如果存在hash值，那就渲染对应UI
            let hash = location.hash;
            routerView.innerHTML = hash
        }
    })
    // 监听地址的hash变化，然后来切换router view中的内容
    window.addEventListener('hashchange', ()=>{
        let hash = location.hash;
        routerView.innerHTML = hash
    })
   
</script>
</html>
```

vue-router中配置hash模式

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

#### history

history的实现原理

```html
<!--本地运行需要在本地启动服务-->
<!DOCTYPE html>
<html lang="en">
  <body>
    <ul>
      <ul>
        <li><a href="./home">home</a></li>
        <li><a href="./about">about</a></li>

        <div id="routeView"></div>
      </ul>
    </ul>
  </body>
  <script>
    let routerView = document.getElementById("routeView");
    // 初始化页面加载理由管理
    window.addEventListener("DOMContentLoaded", () => {
      routerView.innerHTML = location.pathname;
      var linkList = document.querySelectorAll("a[href]");
      console.log("linkList:",linkList);
      //给每个路由跳转事件添加监听
      linkList.forEach((el) =>
        el.addEventListener("click", function (e) {
          e.preventDefault();
          console.log(history, el.getAttribute("href"));
          //往地址堆栈中增加路由地址
          history.pushState(null, "", el.getAttribute("href"));
          console.log("history:", history);
          // 更新router view中的内容
          routerView.innerHTML = location.pathname;
        })
      );
    });
    // 监听地址的 popstate 变化，然后来切换router view中的内容
    window.addEventListener("popstate", () => {
      routerView.innerHTML = location.pathname;
    });
  </script>
</html>
```

vue-router中配置history模式

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

#### 路由拦截

##### 全局前置守卫

```js
router.beforeEach((to, from, next) => {
    console.log("to:", to); // 目标路由信息
    console.log("from:", from); // 当前导航正要离开的路由信息对象
    //页面加载进度
    NProgress.start();
    const token = getToken();
    if (!token && to.name !== "login") {
      // 拦截并指定跳转路由
      next({
        name: "login",
      });
    } else {
      // 路由继续
      next();
    }
    // 返回 false 以取消导航
    // return false 或者 next(false)
  });
  
  // 异步
router.beforeEach(async (to, from) => {
  // canUserAccess() 返回 `true` 或 `false`
  return await canUserAccess(to)
 })
```

##### 全局解析守卫

##### 全局后置钩子

确保要调用 next 方法，否则钩子就不会被 resolved

#### 嵌套路由

#### 声明式导航

##### <router-link :to="...">

##### a标签

#### 编程式导航

##### push

类似window.history.pushState

##### replace

类似window.history.replaceState

```js
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

##### go

类似window.history.go


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

































