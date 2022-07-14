// 修改webpack配置
// node.js环境支持common.js的模块化规范，所以都这么写

const path = require("path")

// 配置ElementPlus按需引用地plugin
// https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5
// 以const定义函数的方式
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")
// const Vue = require()
const Icons = require("unplugin-icons/webpack")
const IconsResolver = require("unplugin-icons/resolver")

module.exports = {
  // 配置方式1：CLI提供的属性  https://cli.vuejs.org/zh/config/#vue-config-js
  outputDir: "./docs", //打包路径修改(默认为./dist)
  // publicPath:"./", //修改加载资源的路径为相对路径，上传服务器时不用

  // 配置跨域访问
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  },

  // 配置方式2：和webpack属性完全一致，最后进行合并
  configureWebpack: {
    // resolve :{
    //   alias :{
    //     '@': path.resolve(__dirname, 'src'),
    //     // components: "@/components",
    //     // views: '@/views'
    //   }
    // },
    plugins: [
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: [
          "vue",
          "vue-router",
          // "@vueuse/core"
          {
            "@vueuse/core": ["useDark", "useToggle"]
          }
        ],

        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: false, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver()],
        // generate `auto-imports.d.ts` global declarations,
        // also accepts a path for custom filename
        dts: "src/auto-imports.d.ts"
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          // 启用element-plus图标集
          // https://element-plus.org/zh-CN/component/icon.html
          IconsResolver({
            enabledCollections: ["ep"]
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],
        // generate `components.d.ts` global declarations,
        // also accepts a path for custom filename
        dts: "src/components.d.ts"
      }),

      Icons({
        autoInstall: true
      })
    ]
  },

  // 配置方式3：箭头函数
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname,"src"), //当前目录下的src
  //     components: "@/components"
  //   }
  // }

  // // 配置方式4：链式函数
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //   .set("@", path.resolve(__dirname,"src"))
  //   .set("components", "@/components")
  // }
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "CMS Demo"
      return args
    })
  }
}
