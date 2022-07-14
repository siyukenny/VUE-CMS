class LocalCache {
  // value啥都可以保存所以用any
  setCache(key: string, value: any) {
    // window本地缓存setItem方法要求传入value是string类型，
    // 我们用JSON.stringify转换
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
