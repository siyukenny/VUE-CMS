import axios from "axios"
import { configProviderContextKey } from "element-plus"

// get和post的区别
// 浏览器中get用来请求资源，post用来提交表单
// https://www.zhihu.com/question/28586791
// https://segmentfault.com/a/1190000023940344

// //axios实例对象
// // 1.模拟get请求
// axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
//   console.log(res)
// })

// // 2.get请求，并且传入参数
// axios
//   .get("http://httpbin.org/get", {
//     params: {
//       name: "xhsensei",
//       age: 33
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 3.post请求
// axios
//   .post("http://httpbin.org/post", {
//     data: {
//       name: "xiaohuang",
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 付：promise本身可以有类型
// new Promise<string>((resolve,reject) => {
//   resolve("1234")
// }).then((res)=>{
//   console.log(res.length)
// })

// 4.axios的全局配置
axios.defaults.baseURL = "http://httpbin.org"
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// // 4.2每个请求单独配置
// // 2.get请求，并且传入参数
// axios
//   .get("/get", {
//     params: {
//       name: "xhsensei",
//       age: 33
//     },
//     timeout: 5000,
//     headers: {}
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 3.post请求
// axios
//   .post("/post", {
//     data: {
//       name: "xiaohuang",
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 5. axios.all 多个请求，一起返回
axios
  .all([
    axios.get("/get", { params: { name: "xhsensei", age: 33 } }),
    axios.post("/post", { params: { name: "xiaohuang", age: 18 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// 6. axios 拦截器
// fn1:请求发送成功执行
// fn2:请求发送失败执行
axios.interceptors.request.use(
  (config) => {
    // 想做的操作
    // 1. 给请求添加token
    // 2.isloading动画
    console.log("请求成功拦截")
    return config
  },
  (err) => {
    console.log("请求发送失败")
    return err
  }
)

// fn1:服务器正常返回数据响应时执行
// fn2:服务器返回失败执行
axios.interceptors.response.use(
  (res) => {
    console.log("服务器正常返回数据")
    return res
  },
  (err) => {
    console.log("服务器返回数据失败")
    return err
  }
)
