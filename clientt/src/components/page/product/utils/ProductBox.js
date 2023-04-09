import React from 'react'

import { Link } from 'react-router-dom'
import { cutString, priceValidate } from '../../../utils/stringFunc/manipulateString'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ProductJwtApi } from '../../../../api/productApi'

function ProductBox({product, products, setProducts, accountData, classes}) {
  const {deleteProductApi} = ProductJwtApi()

  const deleteProduct = async () => {
    try {
      const a = await deleteProductApi(product?._id)
      console.log(a.message);
      let temp = products.filter(el => el?._id !== product?._id)
      setProducts(temp)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={classes.product_box_container}>
      <Link to={`/${product.sku}`}>
        <div className='product_box'>
          <img src={product?.images[0]} alt={product?.slug} loading='lazy' />  
          <div>{cutString(product?.name, 30)}</div>
        </div>
      </Link>
      <div className='price'>
        <div>
          {(product?.minPrice !== product?.maxPrice && product?.minPrice!==undefined)
          ? priceValidate(product?.minPrice)+' ~ '+priceValidate(product?.maxPrice) 
          : priceValidate(product?.price)}
        <small><u>đ</u></small></div>
        {accountData?.role === 1 && <div onClick={deleteProduct}><DeleteForeverIcon style={{fontSize:'17px',color:'red',cursor:'pointer'}} /></div>}
      </div>
    </div>
  )
}

export default ProductBox