import { createStore, Store, useStore as useVuexStore } from "vuex"

import login from "./login/login"
import system from "./main/system/system"

import { getPageDataRequest } from "@/service/main/system/system"

import { IRootState, IStoreType } from "./types"

const store = createStore<IRootState>({
  // 保存状态
  state() {
    return {
      name: "xhsensei",
      age: 29,
      entireDepartmentList: [],
      entireRoleList: []
    }
  },
  // 修改状态，使用时通过commit修改方法
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartmentList = list
    },
    changeEntireRole(state, list) {
      state.entireRoleList = list
    }
  },
  // 存放计算状态里的值之后的数据
  getters: {},
  //把异步操作(比如网络请求)，commit到mutation，再修改到state
  actions: {
    async getInitialDataAction({ commit }) {
      // 1. request departmentList & roleList data
      const departmentResult = await getPageDataRequest("/department/list", {
        offset: 0,
        size: 1000
      })
      // 从data取出list重命名为departmentList
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageDataRequest("/role/list", {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit("changeEntireDepartment", departmentList)
      commit("changeEntireRole", roleList)
    }
  },
  // 模块化开发
  modules: {
    login,
    system
  }
})

// 原页面刷新时，从缓存里加载已login过的信息到vuex里
export function setupStore() {
  store.dispatch("login/loadLocalLogin")
  // store.dispatch("getInitialDataAction")
}

// 为了使vuex的useStore有类型提示：
// 1. 定义了return回来的Store类型是自定义的<IStoreType>
// 2. 把原先vuex的useStore重定类为useVuexStore
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
