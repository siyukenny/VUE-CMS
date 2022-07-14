// import { Module } from "vuex"

// import {
//   accountLoginRequest,
//   requestUserInfoById,
//   requestUserMenusByRoleId
// } from "@/service/login/login"
// import localCache from "@/utils/cache"
// import router from "@/router"

// import { IAccount } from "@/service/login/type"
// import { ILoginState } from "./type"
// import { IRootState } from "../type"

// // 模块就只是一个对象而已
// const loginModule: Module<ILoginState, IRootState> = {
//   namespaced: true,
//   // 保存状态
//   state() {
//     return {
//       token: "",
//       userInfo: {},
//       userMenus: []
//     }
//   },
//   // 存放计算状态里的值之后的数据
//   getters: {},
//   // 修改到state状态，使用时在上一步通过commit修改方法
//   mutations: {
//     changeToken(state, token: string) {
//       state.token = token
//     },
//     changeUserInfo(state, userInfo: any) {
//       state.userInfo = userInfo
//     },
//     changeUserMenus(state, userMenus: any) {
//       state.userMenus = userMenus
//     }
//   },
//   //把异步操作(比如网络请求)，commit到mutation，再修改到state
//   actions: {
//     async accountLoginAction({ commit }, payload: IAccount) {
//       // 1.实现登录逻辑
//       const loginResult = await accountLoginRequest(payload)
//       console.log(loginResult.data.id, loginResult.data.token)
//       const { id, token } = loginResult.data
//       commit("changeToken", token)
//       localCache.setCache("token", token)

//       // 2.请求用户信息
//       const userInfoResult = await requestUserInfoById(id)
//       const userInfo = userInfoResult.data
//       commit("changeUserInfo", userInfo)
//       localCache.setCache("userInfo", userInfo)

//       // 3.请求用户菜单
//       const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
//       const userMenus = userMenusResult.data
//       commit("changeUserMenus", userMenus)
//       localCache.setCache("userMenus", userMenus)

//       // 4.router跳转页面
//       router.push("/main")
//     },

//     // 原页面刷新时，从缓存里加载已login过的信息到vuex里
//     loadLocalLogin({ commit }) {
//       const token = localCache.getCache("token")
//       if (token) {
//         commit("changeToken", token)
//       }
//       const userInfo = localCache.getCache("userInfo")
//       if (userInfo) {
//         commit("changeUserInfo", userInfo)
//       }
//       const userMenus = localCache.getCache("userMenus")
//       if (userMenus) {
//         commit("changeUserMenus", userMenus)
//       }
//     }
//   }
// }

// export default loginModule
