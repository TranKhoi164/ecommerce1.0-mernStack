import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { SubPageJwtApi } from "../../../../../api/subPageApi";
import { SuccessSnackbar, ErrorSnackbar } from "../../../snackbar/Snackbar";

function CreateSubPageDialog({ pageList, getSubPageList, classes }) {
  const [subPage, setSubPage] = useState({
    name: "",
    page: "",
  });
  const [isSuccessRequest, setIsSuccessRequest] = useState(false)
  const [resMessage, setResMessage] = useState('')
  const [openSnack, setOpenSnack] = useState(false)
  const {createSubPageApi} = SubPageJwtApi()

  const changeSubPage = async (e) => {
    const { name, value } = e.target

    setSubPage({...subPage, [name]: value})
  }

  const handleSubmit = async () => {
    try {
      const msg = await createSubPageApi(subPage)
      console.log(msg);
      setOpenSnack(true)
      setResMessage(msg.message)
      setIsSuccessRequest(true)
      await getSubPageList()
    } catch(e) {
      setOpenSnack(true)
      setResMessage(e.message)
      setIsSuccessRequest(false)
    } 
  }

  console.log(resMessage)

  return (
    <div className={classes.list_box_container}>
      <div className={classes.list_box}>
        <div className='input_field'>
          <input type="text" onChange={changeSubPage} name="name" placeholder="Tên trang con" />
          <select name="page" onChange={changeSubPage}>
            <option value="" disabled selected>Trang cha...</option>
            {pageList.map((page) => {
              return (
                <option
                  id={page._id}
                  key={page.code}
                  value={page._id}
                >
                  {page.name}
                </option>
              );
            })}
          </select>
        </div>
        <Button onClick={handleSubmit} variant="contained" color="secondary" style={{marginRight: '20px'}}>Lưu</Button>
      
      </div>
      {isSuccessRequest && <SuccessSnackbar message={resMessage} openSnack={openSnack} setOpenSnack={setOpenSnack} />}
      {!isSuccessRequest && <ErrorSnackbar message={resMessage} openSnack={openSnack} setOpenSnack={setOpenSnack}  />}
    </div>
  );
}

export default CreateSubPageDialog;
