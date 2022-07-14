// //不需要了，因为用了unplugin-vue-components & unplugin-auto-import
// //不需要了，因为用了unplugin-icons
// // https://element-plus.org/zh-CN/component/icon.html
// // 注册全局引用的入口
import { App } from "vue"
// import registerElement from "./register-element"
import registerProperties from "./register-properties"

export function globalRegister(app: App): void {
  // registerElement(app)
  app.use(registerProperties)
}
