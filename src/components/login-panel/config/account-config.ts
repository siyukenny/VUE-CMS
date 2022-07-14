// 表单规则配置
export const rules = {
  name: [
    {
      required: true,
      message: "account needed!",
      trigger: "blur"
    },
    {
      // 规则2：^开头 $结尾 [a到z 0到9] {5到10个字符}
      pattern: /^[a-z0-9]{5,10}$/,
      message:
        "Must be 5~10 characters using lowercase letters(a-z) or numbers(0-9)",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "password needed!",
      trigger: "blur"
    },
    {
      // 规则2：^开头 $结尾 [a到z 0到9] {5到10个字符}
      pattern: /^[a-z0-9]{6,}$/,
      message:
        "Must be at least 6 characters using lowercase letters(a-z) or numbers(0-9)",
      trigger: "blur"
    }
  ]
}
