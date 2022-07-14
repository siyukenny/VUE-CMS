const pageName = "Role"

export const contentTableConfig = {
  pageUrlName: `${pageName}`,
  tableTitle: `${pageName} List`,
  tableHandlerBtn: `New ${pageName}`,
  isSelectColumnShown: true,
  isIndexColumnShown: true,
  propList: [
    {
      prop: "name",
      label: `${pageName} Name`,
      minWidth: "100",
      slotName: `${pageName.toLowerCase()}Name`
    },
    {
      prop: "intro",
      label: "Authority",
      minWidth: "100",
      slotName: "authority"
    },

    {
      prop: "createAt",
      label: "Created At",
      minWidth: "250",
      slotName: "createdAt"
    },
    {
      prop: "updateAt",
      label: "Updated At",
      minWidth: "250",
      slotName: "updatedAt"
    },
    {
      // prop: 对应的是table内部数据的属性名
      label: "Actions",
      minWidth: "150",
      slotName: "actions"
    }
  ]
}
