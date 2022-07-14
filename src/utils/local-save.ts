// 本地存储的工具函数
const localStorage = {
  setSave(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },

  getSave(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  },

  deleteSave(key: string) {
    window.localStorage.removeItem(key)
  },

  clearSave() {
    window.localStorage.clear()
  }
}

export default localStorage
