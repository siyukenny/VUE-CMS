import { Module } from "vuex"
import { IRootState } from "@/store/types"
import { ISystemState } from "./types"
import {
  deletePageDataRequest,
  getPageDataRequest,
  addPageDataRequest,
  editPageDataRequest
} from "@/service/main/system/system"

// const PageMap = {
//   user: "/api/users/abc/list",
//   role: "/api/roles/abc/list"
// }

const systemModule: Module<ISystemState, IRootState> = {
  // https://vuex.vuejs.org/zh/guide/modules.html#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4
  // 如果希望你的模块具有更高的封装度和复用性，
  // 你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
  // 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
  namespaced: true,

  // 保存状态
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  // 修改state数据
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  // 间接获取state进行处理后的数据
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName.toLowerCase()}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return state[`${pageName.toLowerCase()}Count`]
      }
    }
  },
  //把异步操作(比如网络请求)，commit到mutation，再修改到state
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName

      // 0.通过pageName获取pageUrl方式1
      const pageUrl = `/${pageName.toLowerCase()}/list`

      // 通过pageName获取pageUrl方式2
      // let pageUrl = ""
      // switch (pageName) {
      //   case "user":
      //     pageUrl = `/${pageName}s/list`
      //     break
      //   default:
      //     pageUrl = `/${pageName}/list`
      //     break
      // }

      // 通过pageName获取api方式3
      // let pageUrl = PageMap[pageName]

      // 1.要到页面要渲染的数据
      const pageResult = await getPageDataRequest(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      // const toUpperFirstLetter = (value: string) => {
      //   return value.charAt(0).toUpperCase() + value.slice(1)
      // }
      commit(
        // 字符串拼贴：首字母大写+剩余部分
        `change${pageName}List`,
        list
      )
      commit(
        // 字符串拼贴：首字母大写+剩余部分
        `change${pageName}Count`,
        totalCount
      )
    },

    // {dispatch}相当于this.dispatch,获取方法
    async deletePageRowDataAction({ dispatch }, payload: any) {
      // 1 获取pageName和dataID
      const { pageName, dataID, queryInfo } = payload
      const pageUrl = `/${pageName.toLowerCase()}/${dataID}`
      // 2 调用删除的网络请求
      await deletePageDataRequest(pageUrl)

      // 3 重新请求pageList
      dispatch("getPageListAction", {
        pageName,
        queryInfo
      })
    },

    async editPageRowDataAction({ dispatch }, payload: any) {
      const { pageName, dataID, editData } = payload
      const pageUrl = `/${pageName.toLowerCase()}/${dataID}`
      await editPageDataRequest(pageUrl, editData)

      // 3 重新请求pageList
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async addPageRowDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName.toLowerCase()}`
      await addPageDataRequest(pageUrl, newData)

      // 3 重新请求pageList
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
