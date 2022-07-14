// 定义服务器请求到的数据类型
export interface IDataType<T = any> {
  code: number
  data: T
}
