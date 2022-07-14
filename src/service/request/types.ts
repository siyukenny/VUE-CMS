import type { AxiosRequestConfig, AxiosResponse } from "axios"

// 设置规定拦截器接口:类型是个函数 =>返回值类型
// 接口中有对泛型(使用时才决定类型，默认值设为AxiosResponce)的使用
export interface FDZRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 重写一个接口类型，
// 给原config接口扩展出interceptor类型，包含以上4个拦截器
export interface FDZRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: FDZRequestInterceptors<T>
  showLoading?: boolean
}
