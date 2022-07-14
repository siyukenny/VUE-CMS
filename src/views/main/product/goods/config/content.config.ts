const pageName = "Goods"

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
      minWidth: "120",
      slotName: `${pageName.toLowerCase()}Name`
    },
    {
      prop: "oldPrice",
      label: "Old Price",
      minWidth: "100",
      slotName: "oldPrice"
    },
    {
      prop: "newPrice",
      label: "New Price",
      minWidth: "100",
      slotName: "newPrice"
    },
    {
      prop: "imgUrl",
      label: "Image",
      minWidth: "100",
      slotName: "image"
    },
    { prop: "status", label: "Status", minWidth: "100", slotName: "status" },
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
  ]
}
