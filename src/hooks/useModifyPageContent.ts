import { ref } from "vue"
import PageModal from "@/components/page-modal"

// 函数类型，没有返回值
type CallbackFn = () => void

export function useModifyPageContent(
  newDataBtnCB?: CallbackFn,
  editBtnCB?: CallbackFn
) {
  // typeof把LoginAccount对象转成实例，InstanceType把实例转成类型
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  const handleNewDataBtnClick = (btnType: string, pageName: string) => {
    if (pageModalRef.value) {
      // reset form value in page-modal (formInitData will also change)
      Object.keys(pageModalRef.value.formInitData).forEach((key) => {
        pageModalRef.value.formInitData[key] = ""
      })
      // set modalTitle
      pageModalRef.value.modalTitle = "New " + pageModalRef.value.modalTitle
      // show page-modal
      pageModalRef.value.isDialogVisible = true
    }

    // 当前者没有值时返回false，当前者有值时返回后者，也就是调用newDataBtnCB()
    newDataBtnCB && newDataBtnCB()
  }

  const handleEditBtnClick = (rowData: any) => {
    if (pageModalRef.value) {
      // page-modal表单里存在的formdata才绑定新的值  (formInitData will also change)
      Object.keys(pageModalRef.value.formInitData).forEach((key) => {
        pageModalRef.value.formInitData[key] = rowData[key]
        pageModalRef.value.defaultInfo = { ...rowData }
      })
      // set modalTitle
      pageModalRef.value.modalTitle = "Edit " + pageModalRef.value.modalTitle
      // show page-modal
      pageModalRef.value.isDialogVisible = true
    }
    // 当前者没有值时返回false，当前者有值时返回后者，也就是调用editBtnCB()
    editBtnCB && editBtnCB()
  }
  return [pageModalRef, handleNewDataBtnClick, handleEditBtnClick]
}
