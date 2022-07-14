//不需要了，因为用了unplugin-vue-components & unplugin-auto-import
// // Element-plus按需引入1
// import { App } from "vue"
// import "element-plus/dist/index.css"
// import { ElButton } from "element-plus"

// //定义要注册的组件数组
// const components = [ElButton]

// // 用for循环注册
// export default function (app: App) {
//   for (const component of components) {
//     app.component(component.name, component)
//   }
// }

// //不需要了，因为用了unplugin-icons的[ep]图标集
// // Element-plus/icon-vue按需引入1
// import { App } from "vue"
// import { UserFilled, Iphone } from "@element-plus/icons-vue"

// //定义要注册的组件数组
// const elIcons = [UserFilled, Iphone]

// // 用for循环注册
// export default function (app: App) {
//   for (const elIcon of elIcons) {
//     app.component(elIcon.name, elIcon)
//   }
// }
