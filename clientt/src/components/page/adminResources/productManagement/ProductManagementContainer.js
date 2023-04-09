import React, {useState, useEffect} from 'react'
import AttributeContainer from './AttributeContainer'
import { AttributeJwtApi } from '../../../../api/attributeApi'
import ProductContainer from './ProductContainer'

function ProductManagementContainer({accountData, pages, classes}) {
  const [attributes, setAttributes] = useState([])
  const {getAttributeListApi} = AttributeJwtApi()

  const getAttributeList = async () => {
    try {
      const attriList = await getAttributeListApi()
      setAttributes(attriList.attribute_list)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAttributeList()
  }, [])

  return (
    <>
      <ProductContainer attributes={attributes} pages={pages} classes={classes} />
      <AttributeContainer attributes={attributes} getAttributeList={getAttributeList} classes={classes}/>
    </>
  )
}

export default ProductManagementContainer