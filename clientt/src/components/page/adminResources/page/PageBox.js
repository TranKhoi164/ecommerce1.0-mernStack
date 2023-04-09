import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { PageJwtApi } from "../../../../api/pageApi";
import CreatePageDialog from "../../../utils/dialog/admin/pageManagement/CreatePageDialog";
import { SuccessSnackbar } from "../../../utils/snackbar/Snackbar";

function PageBox({ pageList, getPageList, classes }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { deletePageApi } = PageJwtApi();
  const [resMessage, setResMessage] = useState('')
  const [openSnack, setOpenSnack] = useState(false)

  const handleSubmit = () => {
    setOpenDialog(true);
  };

  const deletePageRequest = async (pageId) => {
    try {
      const deletePageMessage = await deletePageApi(pageId)
      setResMessage(deletePageMessage.message)
      setOpenSnack(true)
    } catch (e) {
      setResMessage(e.message)
      setOpenSnack(true)
    }
  }

  return (
    <div className={classes.sub_container}>
      <div className="header_box header_box_add">
        <div className="header">Quản lý trang</div>
        <Button onClick={handleSubmit} variant="contained" color="secondary">
          <AddIcon /> Tạo trang mới
        </Button>
      </div>
      <div>
        {pageList.map((page) => {
          return (
            <div className={classes.list_box_container}>
              <div className={classes.list_box} key={page._id}>
                <div className="display">
                  {page.name}
                </div>
                <div className="action_button">
                  <div className="action" onClick={() => deletePageRequest(page._id)}>
                    Xóa
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CreatePageDialog
        openDialog={openDialog} setOpenDialog={setOpenDialog}
        classes={classes} getList={getPageList} type={"page"}
      />

      <SuccessSnackbar message={resMessage} openSnack={openSnack} setOpenSnack={setOpenSnack} />
    </div>
  );
}

export default PageBox;
