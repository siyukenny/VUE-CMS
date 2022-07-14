import { IForm } from "@/components/base-ui/basic-form"
const pageName = "User"
export const modalFormConfig: IForm = {
  pageName: `${pageName}`,
  pageUrlName: `${pageName}s`,
  formItems: [
    {
      field: "name",
      type: "input",
      label: "User Name",
      placeholder: "Enter user name"
    },
    {
      field: "realname",
      type: "input",
      label: "Real Name",
      placeholder: "Enter real name"
    },
    {
      field: "password",
      type: "input",
      label: "Password",
      placeholder: "Enter password",
      isHidden: false
    },
    {
      field: "cellphone",
      type: "input",
      label: "Cellphone",
      placeholder: "Enter cellphone"
    },
    {
      field: "departmentId",
      type: "select",
      label: "Department",
      placeholder: "Choose Department",
      options: []
    },
    {
      field: "roleId",
      type: "select",
      label: "Role",
      placeholder: "Choose Role",
      options: []
    }
  ],
  colLayout: {
    span: 24
  }
}
