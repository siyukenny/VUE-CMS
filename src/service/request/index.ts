// 把axios等第三方io库封装成加自定义库
// 项目中唯一需要import axios的地方，方便修改
import axios from "axios"
import type { AxiosInstance } from "axios"
import type { FDZRequestConfig, FDZRequestInterceptors } from "./types"

import { ElLoading } from "element-plus"
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading"

const DEFAULT_LOADING = false

class FDZRequest {
  _instance: AxiosInstance
  _interceptors?: FDZRequestInterceptors
  _showLoading: boolean
  _loading?: LoadingInstance

  constructor(config: FDZRequestConfig) {
    // 每次new FDZRequest实例时，
    // 变相让axios按照传入的config来create实例
    // 放在_instance中
    this._instance = axios.create(config)
    // 保存基本信息
    this._interceptors = config.interceptors
    this._showLoading = config.showLoading ?? DEFAULT_LOADING

    //执行对应实例传入config放入this._interceptors的拦截器函数
    this._instance.interceptors.request.use(
      this._interceptors?.requestInterceptor,
      this._interceptors?.requestInterceptorCatch
    )
    this._instance.interceptors.response.use(
      this._interceptors?.responseInterceptor,
      this._interceptors?.responseInterceptorCatch
    )

    // 所有new出的实例共同都自带的拦截器函数
    this._instance.interceptors.request.use(
      (config) => {
        // console.log("所有实例共同都自带的拦截器：请求拦截成功")

        // 加载ElementPlus的ElLoading动画
        if (this._showLoading) {
          this._loading = ElLoading.service({
            lock: true,
            text: "正在请求数据……",
            background: "rgba(0,0,0,0.3)"
          })
        }

        return config
      },
      (err) => {
        // console.log("所有实例共同都自带的拦截器：请求拦截失败")
        return err
      }
    )

    this._instance.interceptors.response.use(
      (res) => {
        // console.log("所有实例共同都自带的拦截器：响应拦截成功")

        // 结束loading
        setTimeout(() => {
          this._loading?.close()
        }, 1000)

        const data = res.data
        if (data.returnCode === "-1001") {
          // console.log("请求失败，错误信息")
        } else {
          return data
        }
      },
      (err) => {
        // console.log("所有实例共同都自带的拦截器：响应拦截失败")
        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误")
        }
        return err
      }
    )
  }
  // 每次执行request外部都会传入临时配置
  // 并且返回数据res类型由请求者决定
  // 因此接口FDZRequestConfig一路携带泛型<T>供请求者动态传入类型
  request<T = any>(config: FDZRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对数据的处理
      // 如果有临时配置里含拦截器，在内部替ta执行一下
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 设置单个请求的loading配置
      if (config.showLoading === false) {
        this._showLoading = config.showLoading
      }

      this._instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          // 如果有临时配置里含拦截器，在内部替ta执行一下
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          this._showLoading = DEFAULT_LOADING

          // 把单个结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this._showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  // 封装一个get方法调用request方法(method为GET的情况)
  get<T = any>(config: FDZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  // 封装一个post方法调用request方法(method为POST的情况)
  post<T = any>(config: FDZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  // 封装一个delete方法调用request方法(method为DELETE的情况)
  delete<T = any>(config: FDZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  // 封装一个patch方法调用request方法(method为PATCH的情况)
  patch<T = any>(config: FDZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default FDZRequest
