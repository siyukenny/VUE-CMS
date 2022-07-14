// 用于拦截不规范的git commit -m "<不规范message>"

module.exports = {
  extends: ["@commitlint/config-conventional"]
}
