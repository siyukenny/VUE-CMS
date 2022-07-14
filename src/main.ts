import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { setupStore } from "./store"

//不需要了，因为用了unplugin-vue-components & unplugin-auto-import
// element-plus按需引入2
// 用于注册全局变量(里面带方法)或组件
import { globalRegister } from "./global"

// css初始化
import "normalize.css"
import "./assets/css/index.scss"
import "windi.css"

// axios_demo 不用起名字
// import "./service/axios_demo"

// 使用封装axios的自定义io库
// import fdzRequest from "./service"

// createApp(App).use(store).use(router).mount("#app");

const app = createApp(App)
app.use(store)
// 原页面刷新时，从缓存里加载已login过的信息到vuex里
// 先初始化数据,再注册路由,否则路由刷新跳转到not-found
setupStore()
app.use(router)

//不需要了，因为用了unplugin-vue-components & unplugin-auto-import
// element-plus按需引入2
// globalRegister(app) //两种写法都可以
//不需要了，因为用了unplugin-icons
// 用于注册全局变量(里面带方法)或组件
app.use(globalRegister)

app.mount("#app")

// console.log(process.env.BASE_URL)
// console.log(process.env.BASE_NAME)

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// // 使用封装axios的自定义io库
// fdzRequest
//   .request<DataType>({
//     url: "/home/multidata",
//     method: "GET"
//     // showLoading: false
//   })
//   .then((res) => {
//     // console.log(res.data)
//     // console.log(res.returnCode)
//     // console.log(res.success)
//   })

// // 使用封装axios的自定义io库(临时request带拦截器的情况)
// fdzRequest.request({
//   url: "/home/multidata",
//   method: "GET",
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log("单独请求的config")
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log("单独响应的response")
//       return res
//     }
//   }
// })
