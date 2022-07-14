type IFormType = "input" | "password" | "select" | "datepicker"

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any

  // for select
  options?: any[]

  // for others
  otherOptions?: any

  // for page-modal to hide some fields like "password"
  isHidden?: boolean
}

export interface IForm {
  pageName?: string
  pageUrlName?: string
  formItems: IFormItem[]
  labelWidth?: string
  itemLayout?: any
  colLayout?: any
}
