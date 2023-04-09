import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { CategoryJwtApi } from "../../../../../api/categoryApi";

function CreateCategoryDialog({ setOpenDialog, subPage, getSubPageList, classes }) {
  const [category, setCategory] = useState({
    name: "",
  });
  const {createCategoryApi} = CategoryJwtApi()

  const changeCategory = async (e) => {
    const { name, value } = e.target

    setCategory({...category, [name]: value})
  }

  const handleSubmit = async (subPageId, pageId) => {
    try {
      const msg = await createCategoryApi({...category, subPage: subPageId, page: pageId})
      console.log(msg);
      setOpenDialog(false)
      await getSubPageList()
    } catch(e) {
      console.log(e.message)
    } 
  }

  return (
    <>
      <div className={classes.list_box}>
        <div className='input_field'>
          <input type="text" onChange={changeCategory} name="name" placeholder="Tên danh mục" />
        </div>
        <Button onClick={() => handleSubmit(subPage?._id, subPage?.page?._id)} variant="contained" color="secondary" style={{marginRight: '20px'}}>Lưu</Button>
      </div>
    </>
  );
}

export default CreateCategoryDialog;
