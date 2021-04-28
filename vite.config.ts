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
