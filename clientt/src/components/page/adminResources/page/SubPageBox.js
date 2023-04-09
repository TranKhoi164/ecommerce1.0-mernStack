import React, {useState} from 'react'
import CreateSubPageDialog from '../../../utils/dialog/admin/pageManagement/CreateSubPageDialog';
import { SubPageJwtApi } from '../../../../api/subPageApi';
import { ErrorSnackbar, SuccessSnackbar } from '../../../utils/snackbar/Snackbar';
import SubPageListBox from '../../../utils/box/SubPageListBox';

function SubPageBox({ pageList, subPageList, getSubPageList, classes }) {
  const [isSuccessRequest, setIsSuccessRequest] = useState(false)
  const [resMessage, setResMessage] = useState('')
  const [openSnack, setOpenSnack] = useState(false)
  const {deleteSubPageApi} = SubPageJwtApi()

  const deleteSubPageRequest = async (subPageId) => {
    try {
      const msg = await deleteSubPageApi(subPageId)
      setIsSuccessRequest(true)
      setOpenSnack(true)
      setResMessage(msg.message)
      await getSubPageList()
    } catch (e) {
      setIsSuccessRequest(false)
      setOpenSnack(true)
      setResMessage(e.message)
    } 
  }

  return (
    <div className={classes.sub_container}>
      <div className="header_box header_box_add">
        <div className="header">Quản lý trang con</div>
      </div>
      <div>
      <CreateSubPageDialog  pageList={pageList} getSubPageList={getSubPageList} classes={classes} />
        {subPageList.map((subPage) => {
          return (
            <SubPageListBox subPage={subPage} deleteSubPageRequest={deleteSubPageRequest} getSubPageList={getSubPageList} classes={classes} key={subPage?._id} />
          );
        })}
      </div>
      {isSuccessRequest ? <SuccessSnackbar message={resMessage} openSnack={openSnack} setOpenSnack={setOpenSnack} />
      : <ErrorSnackbar message={resMessage} openSnack={openSnack} setOpenSnack={setOpenSnack}  />}
    </div>
  )
}

export default SubPageBox