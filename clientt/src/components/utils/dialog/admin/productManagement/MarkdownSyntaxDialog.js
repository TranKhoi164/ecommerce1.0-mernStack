import React from 'react'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function MarkdownSyntaxDialog({ openDialog, setOpenDialog, classes }) {
  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Cú pháp cơ bản</DialogTitle>
        <DialogContent>
          <div >
            <h1># Heading level 1</h1>
            <h2>## Heading level 2</h2>
            <h3>### Heading level 3</h3>
            <h4>#### Heading level 4</h4>
            <h5>##### Heading level 5</h5>
            <h6>###### Heading level 6</h6>
          </div>
          <ul>
            <li>Để xuống dòng, ấn cách 2 lần rồi enter</li>
            <li>Để dòng chống ở giữa để tạo đoạn văn mới</li>
            <li>In đậm: <strong>**chữ đậm**</strong></li>
            <li>In nghiêng: <i>*chữ nghiêng*</i></li>
            <li>In nghiêng + đậm: <strong><i>***chữ***</i></strong></li>
          </ul>
          <div>
            <h2>Ảnh</h2>
            <div>![mô tả ảnh](đường dẫn ảnh)</div>
          </div>
          <div>
            <h2>Links</h2>
            <div>[hiển thị đường dẫn](đường dẫn)</div>
          </div>
          Xem thêm tại: <a target='_blank' rel="noreferrer" href="https://www.markdownguide.org/basic-syntax/ ">đây</a>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Trở lại
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MarkdownSyntaxDialog