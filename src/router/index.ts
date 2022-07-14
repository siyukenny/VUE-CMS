import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
// import Home from "../views/Home.vue";

import localCache from "@/utils/cache"
import { firstMenu } from "@/utils/map-to-routes"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    // 懒加载：需要的时候才加载用箭头函数
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    name: "main",
    // 懒加载：需要的时候才加载用箭头函数
    component: () => import("@/views/main/main.vue")
    // children: [] => 根据userMenu动态映射路由dynamic route
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found.vue")
  }

  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫：每次页面跳转前执行
router.beforeEach((to) => {
  // 如果当前路径不是login页，则检查缓存里有没有login过留下来的token
  if (to.path !== "/login") {
    const token = localCache.getCache("token")
    if (!token) {
      return "/login"
    }
  }
  // 如果当前路径是main，则重定向到firstMenu
  if (to.path === "/main") {
    return firstMenu.url
  }
})

export default router
