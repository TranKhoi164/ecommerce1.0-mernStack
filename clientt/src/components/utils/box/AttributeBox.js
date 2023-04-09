import React, {useState} from 'react'
import { AttributeJwtApi } from '../../../api/attributeApi'
import CreateAttributeValueDialog from '../dialog/admin/productManagement/CreateAttributeValueDialog'

function AttributeValueBox({attribute, getAttributeList, attributeValue, classes}) {
  const {deleteAttributeValueApi} = AttributeJwtApi()
  
  const deleteRequest = async () => {
    try {
      await deleteAttributeValueApi(attribute._id, attributeValue)
      await getAttributeList()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={classes.sub_list_box}>
      {attributeValue}{"      "}
      <span onClick={deleteRequest} style={{fontSize: '11px'}}>[x]</span>
    </div>
  )
}

function AttributeBox({attribute, getAttributeList, classes}) {
  const {deleteAttributeApi} = AttributeJwtApi()

  const deleteAttributeReq = async (id) => {
    try {
      await deleteAttributeApi(id)
      getAttributeList()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={classes.list_box_container}>
      <div className={classes.list_box}>
        <div className='display'>
          {attribute?.name}
        </div>
        <div className='action_button'>
          <div className='action' onClick={() => deleteAttributeReq(attribute?._id)}>
            Xóa
          </div>
        </div>
      </div>
      <div className={classes.list_box_body}>
        <CreateAttributeValueDialog attribute={attribute} getAttributeList={getAttributeList} classes={classes} />
        <div className='display_list'>
          {attribute?.values.map((attributeValue) => {
            return <AttributeValueBox key={attributeValue} attribute={attribute} getAttributeList={getAttributeList} attributeValue={attributeValue} classes={classes} />
          })}
        </div>
      </div>
    </div>
  )
}

export default AttributeBox