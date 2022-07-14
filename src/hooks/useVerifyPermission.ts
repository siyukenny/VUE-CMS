import { useStore } from "@/store"

export function useVerifyPermission(pageName: string, actionName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName.toLowerCase()}:${actionName}`
  // es6 find the only one, {return}可以省略
  // found? !!string -> true
  return !!permissions.find((permission) => permission === verifyPermission)
}
