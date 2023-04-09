import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import { AttributeJwtApi } from '../../../../../api/attributeApi'
import UserDebounce from '../../../UserDebounce'

function CreateAttributeValueDialog({attribute, getAttributeList, classes}) {
  const [value, setValue] = useState("")
  const {addAttributeValueApi } = AttributeJwtApi()
  const debounce = UserDebounce()

  const addValueRequest = async () => {
    try {
      console.log('hello')
      const msg = await addAttributeValueApi(attribute._id, value)
      console.log(msg);
      await getAttributeList()
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = async () => {
    debounce(addValueRequest, 1000)
  }

  return (
    <>
      <div className={classes.list_box}>
        <div className='input_field'>
          <input type="text" name="name" onChange={(e) => setValue(e.target.value)} placeholder="Giá trị của thuộc tính" />
        </div>
        <Button onClick={() => handleSubmit(attribute._id)} variant="contained" color="secondary" style={{marginRight: '20px'}}>Lưu</Button>
      </div>
    </>
  )
}

export default CreateAttributeValueDialog