const pageName = "Menu"

export const contentTableConfig = {
  pageUrlName: `${pageName}`,
  tableTitle: `${pageName} List`,
  tableHandlerBtn: `New ${pageName}`,
  isSelectColumnShown: false,
  isIndexColumnShown: false,
  isFooterShown: false,
  propList: [
    {
      prop: "name",
      label: `${pageName} Name`,
      minWidth: "100",
      slotName: `${pageName.toLowerCase()}Name`
    },
    { prop: "type", label: "Type", minWidth: "60", slotName: "type" },
    { prop: "url", label: "Path", minWidth: "100", slotName: "url" },
    { prop: "icon", label: "Icon", minWidth: "100", slotName: "icon" },
    {
      prop: "permission",
      label: "Permission",
      minWidth: "100",
      slotName: "permission"
    },
    {
      prop: "createAt",
      label: "Created At",
      minWidth: "200",
      slotName: "createdAt"
    },
    {
      prop: "updateAt",
      label: "Updated At",
      minWidth: "200",
      slotName: "updatedAt"
    },
    {
      // prop: 对应的是table内部数据的属性名
      label: "Actions",
      minWidth: "150",
      slotName: "actions"
    }
  ],
  // 表内树形数据
  // https://element-plus.org/zh-CN/component/table.html#%E6%A0%91%E5%BD%A2%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%87%92%E5%8A%A0%E8%BD%BD
  childrenTreeProps: {
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  }
}
