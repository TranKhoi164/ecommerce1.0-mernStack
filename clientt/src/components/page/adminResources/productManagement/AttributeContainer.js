import React from 'react'
import AttributeBox from '../../../utils/box/AttributeBox';
import CreateAttributeDialog from '../../../utils/dialog/admin/productManagement/CreateAttributeDialog';

function AttributeContainer({attributes, getAttributeList, classes}) {


  return (
    <div className={classes.sub_container}>
      <div className="header_box header_box_add">
        <div className="header">Các thuộc tính sản phẩm</div>
      </div>
      <CreateAttributeDialog getAttributeList={getAttributeList} classes={classes} />
      {attributes.map((attribute) => {
        return <AttributeBox key={attribute?._id} attribute={attribute} getAttributeList={getAttributeList} classes={classes} />
      })}
    </div>
  )
}

export default AttributeContainer