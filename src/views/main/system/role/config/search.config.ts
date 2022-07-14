import { IForm } from "@/components/base-ui/basic-form"

export const searchFormConfig: IForm = {
  formItems: [
    // {
    //   field: "id",
    //   type: "input",
    //   label: "user ID",
    //   placeholder: "Enter user ID"
    // },
    {
      field: "name",
      type: "input",
      label: "Role Name",
      placeholder: "Enter role name"
    },
    {
      field: "intro",
      type: "input",
      label: "Authority",
      placeholder: "Enter authority"
    },
    // {
    //   field: "sports",
    //   type: "select",
    //   label: "Favor Sports",
    //   placeholder: "Choose your favor Sports",
    //   options: [
    //     { title: "basketball", value: "basketball" },
    //     { title: "football", value: "football" }
    //   ]
    // },
    {
      field: "createAt",
      type: "datepicker",
      label: "Date Range",
      otherOptions: {
        startPlaceholder: "Start Date",
        endPlaceholder: "End Date",
        type: "daterange"
      }
    }
  ],
  labelWidth: "120px"
  //   itemLayout: {
  //     padding: "10px 40px"
  //   }
  //   // colLayout: {
  //   //   // span: 8
  //   // }
}
