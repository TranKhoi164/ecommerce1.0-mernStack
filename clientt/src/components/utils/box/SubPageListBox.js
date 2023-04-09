import React, {useState} from 'react'
import CreateCategoryDialog from '../dialog/admin/pageManagement/CreateCategoryDialog'
import CategoryManagementTree from '../treeView/admin/CategoryManagementTree';

function SubPageListBox({subPage, deleteSubPageRequest, getSubPageList, classes}) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className={classes.list_box_container}>
      <div className={classes.list_box}>
        <div className="display">
          <span style={{fontWeight: 'bold'}}>{subPage?.page?.name}</span> / {subPage?.name} 
        </div>
        <div className="action_button">
          <div className="action" onClick={() => setOpenDialog(true)}>
            Tạo danh mục
          </div>
          <div className="action" onClick={() => deleteSubPageRequest(subPage?._id)}>
            Xóa
          </div>
        </div>
      </div>
      <div className={classes.list_box_body}>
        {openDialog && <CreateCategoryDialog setOpenDialog={setOpenDialog} subPage={subPage} getSubPageList={getSubPageList} classes={classes} /> }
        {
          subPage?.categories.map((category) => {
            return <CategoryManagementTree key={category?._id} category={category} getSubPageList={getSubPageList} classes={classes} />
          })
        }
      </div>
    </div>
  )
}

export default SubPageListBox