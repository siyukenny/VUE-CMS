import fdzRequest from "@/service"

import { IDataType } from "@/service/types"

export function getPageDataRequest(url: string, queryInfo: any) {
  // 有很多查询条件要放在data里，所以用post请求
  return fdzRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function deletePageDataRequest(url: string) {
  return fdzRequest.delete<IDataType>({
    url: url
  })
}
export function addPageDataRequest(url: string, newData: any) {
  return fdzRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
export function editPageDataRequest(url: string, editData: any) {
  return fdzRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
