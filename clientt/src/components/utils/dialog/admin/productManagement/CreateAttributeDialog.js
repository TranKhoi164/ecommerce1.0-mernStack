import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { AttributeJwtApi } from "../../../../../api/attributeApi";
import UserDebounce from '../../../UserDebounce'

function CreateAttributeDialog({ getAttributeList, classes }) {
  const [attribute, setAttribute] = useState({
    name: "",
  });
  const {createAttributeApi} = AttributeJwtApi()
  const debounce = UserDebounce()

  const changeSubPage = async (e) => {
    const { name, value } = e.target

    setAttribute({...attribute, [name]: value})
  }

  const createAttributeRequest = async () => {
    try {
      const msg = await createAttributeApi(attribute)
      console.log(msg);
      await getAttributeList()
    } catch(e) {
      console.log(e);
    } 
  }

  const handleSubmit = async () => {
    debounce(createAttributeRequest, 1000)
  }

  return (
    <div className={classes.list_box_container}>
      <div className={classes.list_box}>
        <div className='input_field'>
          <input type="text" onChange={changeSubPage} name="name" placeholder="Tên thuộc tính" />
        </div>
        <Button onClick={handleSubmit} variant="contained" color="secondary" style={{marginRight: '20px'}}>Lưu</Button>
      </div>
    </div>
  );
}

export default CreateAttributeDialog;
