import FDZRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"

import localStorage from "@/utils/local-save"

// service统一出口，命名加自定义前缀
// 每次执行fdzRequest都是new一个FDZRequest实例，
//传入基本配置,和临时携带的配置
const fdzRequest = new FDZRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // // 携带token的拦截
      const token = localStorage.getSave("token")

      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      console.log("该实例传入请求成功的拦截")
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log("该实例传入请求失败的拦截")
      return err
    },
    responseInterceptor: (res) => {
      console.log("该实例传入响应成功的拦截")
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log("该实例传入响应失败的拦截")
      return err
    }
  }
})

export default fdzRequest
