import { Module } from "vuex"

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login"
import localCache from "@/utils/cache"
import router from "@/router"
import { mapMenusToPermissions, mapMenusToRoutes } from "@/utils/map-to-routes"

import { IAccount } from "@/service/login/types"
import { ILoginState } from "./types"
import { IRootState } from "../types"

// 模块就只是一个对象而已
const loginModule: Module<ILoginState, IRootState> = {
  // https://vuex.vuejs.org/zh/guide/modules.html#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4
  // 如果希望你的模块具有更高的封装度和复用性，
  // 你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
  // 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
  namespaced: true,

  // 保存状态
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },

  // 存放计算状态里的值之后的数据
  getters: {},

  // 修改到state状态，使用时在上一步通过commit修改方法
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 实现动态路由dynamic routes
      // 1. userMenu => routes
      const routes = mapMenusToRoutes(userMenus)

      // 2. routes => router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 3. userMenu => permission
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },

  //把异步操作(比如网络请求)，commit到mutation，再修改到state
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult.data.id, loginResult.data.token)
      const { id, token } = loginResult.data
      commit("changeToken", token)
      localCache.setCache("token", token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit("changeUserInfo", userInfo)
      localCache.setCache("userInfo", userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit("changeUserMenus", userMenus)
      localCache.setCache("userMenus", userMenus)

      // 4.0 跳转main页面之前，获取entire Department list 和 entire Role list
      // 模块中调root的action的方法
      dispatch("getInitialDataAction", null, { root: true })

      // 4.router跳转页面
      router.push("/main")
    },

    // 原页面刷新时，从缓存里加载已login过的信息到vuex里
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)
      }
      const userInfo = localCache.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }
      const userMenus = localCache.getCache("userMenus")
      if (userMenus) {
        commit("changeUserMenus", userMenus)
      }
      // 原地刷新页面时，获取entire Department list 和 entire Role list
      // 模块中调root的action的方法
      dispatch("getInitialDataAction", null, { root: true })
    }
  }
}

export default loginModule
