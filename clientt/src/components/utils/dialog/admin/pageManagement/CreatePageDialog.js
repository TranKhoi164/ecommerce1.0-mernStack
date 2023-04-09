import React, {useState} from 'react'
import { PageJwtApi } from '../../../../../api/pageApi'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function CreatePageDialog({ openDialog, setOpenDialog, classes, getList }) {
  const {createPageApi} = PageJwtApi()
  const [page, setPage] = useState({
    name: '',
  })


  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleSubmit = async () => {
    try {
      await createPageApi(page)
      await getList()
    } catch (e) {
      console.log(e.message)
    }
    setOpenDialog(false)
  }

  console.log(page)

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Trang mới</DialogTitle>
        <DialogContent>
          <div className={classes.form_box}>
            <input type="text" onChange={(e) => setPage({name: e.target.value})} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Trở lại
          </Button>
          <Button onClick={handleSubmit} color="secondary" variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* {successRequest && <SuccessSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />} */}
      {/* {!successRequest && <ErrorSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />} */}
    </>
  )
}

export default CreatePageDialog