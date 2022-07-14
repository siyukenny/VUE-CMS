import { IBreadcrumb } from "@/components/base-ui/breadcrumb/types"
import menu from "@/router/main/system/menu/menu"
import { RouteRecordRaw } from "vue-router"

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  const routes: RouteRecordRaw[] = []

  // 1. 先加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //返回一个对象  require是webpack加载文件夹的工具(路径，递归到次级文件夹，匹配正则)
  const routeFiles = require.context("../router/main", true, /\.ts/)
  const filePaths = routeFiles.keys()
  filePaths.forEach((key) => {
    // 根据路径加载文件，用commons.js的require函数
    // key其实就是每个路径，根据.做切割，取第二截
    const route = require("../router/main" + key.split(".")[1])
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // find 是es6语法，找到唯一一个,      {return }可以省略
        const route = allRoutes.find((route) => route.path === menu.url)

        if (route) {
          routes.push(route)
          if (!firstMenu) {
            firstMenu = menu
          }
        }
      } else {
        // 如果type不等于2，则把它的下一级放进这个函数再跑一边
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

export function mapPathToBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  mapPathToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function mapPathToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // 一级菜单的话，要找它的下级菜单
      // 没有值就传空数组给它遍历,换下一个menu
      const foundMenu = mapPathToMenu(menu.children ?? [], currentPath)
      // 如果已经找到menu,就返回值(意味着该函数结束)
      if (foundMenu) {
        breadcrumbs?.push({ name: menu.name, path: menu.url })
        breadcrumbs?.push({ name: foundMenu.name, path: foundMenu.url })
        return foundMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permission: string[] = []
  const _recureseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recureseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recureseGetPermission(userMenus)

  return permission
}

export { firstMenu }
