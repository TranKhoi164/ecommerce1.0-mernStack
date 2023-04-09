import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core'
import { ProductJwtApi } from '../../../../api/productApi'
import UserDebounce from '../../../utils/UserDebounce'
import MarkdownSyntaxDialog from '../../../utils/dialog/admin/productManagement/MarkdownSyntaxDialog'
import ProductAttributeDialog from '../../../utils/dialog/admin/productManagement/ProductAttributeDialog'
import { skuAttributeValidate, skuValidate } from '../../../utils/stringFunc/manipulateString'
import { InventoryJwtApi } from '../../../../api/inventoryApi'




function ProductImageUpload({images, setImages, classes}) {
  const {uploadProductImage} = ProductJwtApi()
  const debounce = UserDebounce()

  const requestUploadProductImage = async (formData) => {
    try {
      const img = await uploadProductImage(formData)
      setImages([...images, img.image_url])
    } catch(e) {
      console.log(e);
    }
  }
  const uploadImage = async (e) => {
    const file = e.target.files[0]

    let formData = new FormData()
    formData.append('file', file)

    debounce(() => requestUploadProductImage(formData), 1000)
  } 

  return (
    <div className={classes.update_image}>
      <label htmlFor='file_up' style={{maxWidth: '200px'}}>Chọn ảnh cho sản phẩm</label>
      <input style={{ display: "none" }} accept="image/png, image/jpeg" onChange={uploadImage} className={classes.fileUp} type="file" name="file" id="file_up" />
      <div className='image_list'>
        {images.map(imageUrl => {
          return <img key={imageUrl} src={imageUrl} alt="product_image" />
        })}
      </div>
    </div>    
  )
}






function ProductInventoryChange({attributeKey, attributeValue, defaultInfo, inventories, setInventories, classes}) {
  const [inventory, setInventory] = useState({
    sku: defaultInfo.sku + skuAttributeValidate(attributeValue),
    quantity: defaultInfo.quantity,
    price: defaultInfo.price,
    image: defaultInfo?.images[0],
  })

  console.log('inventory: ', inventory);

  useEffect(() => {
    setInventory({ 
      image: defaultInfo?.images[0], 
      quantity: defaultInfo?.quantity, 
      price: defaultInfo?.price, 
      sku: defaultInfo?.sku + skuAttributeValidate(attributeValue)})
  }, [defaultInfo])

  useEffect(() => {
    setInventory({
      sku: defaultInfo?.sku + skuAttributeValidate(attributeValue),
      attribute: inventories[defaultInfo.sku+skuAttributeValidate(attributeValue)]?.attribute,
      quantity: defaultInfo?.quantity,
      price: defaultInfo?.price,
      image: defaultInfo?.images[0],
    })
  }, [attributeValue])

  const handleInfoChange = (e) => {
    const {name, value} = e.target
    setInventory({...inventory, [name]: value})
    setInventories({...inventories, [inventory.sku]: {...inventories[defaultInfo.sku+skuAttributeValidate(attributeValue)], [name]: value}})
  }

  return (
    <>
      <th>
        <input type="text" value={skuAttributeValidate(attributeValue)} disabled />
      </th>
      <th>
        <input type="number" name='quantity' min={0} value={inventory.quantity} onChange={handleInfoChange} />
      </th>
      <th>
        <input type="number" name='price' min={0} value={inventory.price} onChange={handleInfoChange} />
      </th>
      <th>
        <select name="image" id="image" value={inventory.image} onChange={handleInfoChange}>
          <option value={undefined} selected disabled>Không</option>
          {defaultInfo.images.map(image => {
            return <option value={image}>{image}</option>
          })}
        </select>
      </th>
    </>
  )
}






function ProductInventoryContainer({attributes, defaultInfo, product, pageSelect, classes}) {
  const [productTypes, setProductTypes] = useState([])
  const [inventories, setInventories] = useState({})
  const {createInventoriesApi} = InventoryJwtApi()
  const { createProductApi } = ProductJwtApi()

  let attributesValueArr = Object.values(attributes)
  let key = Object.keys(attributes)
  let obj = {}
  let tempAttributes = []

  console.log('inventories: ', inventories);

  const getAllProductTypes = (n) => {
    for (let i = 0; i < attributesValueArr[n].length; i++) {
      obj = {...obj, [n]: attributesValueArr[n][i]}
      if (n < attributesValueArr.length-1) {
        let t = n + 1
        getAllProductTypes(t)
      } else {
        const tempObj = obj
        tempAttributes.push(tempObj)
      }
    }
  }

  const initiateInventories = () => {
    let tempA = {}
    productTypes.map(attribute => {
      let att = {}
      for (let i = 0; i < key.length; i++) {
        att[key[i]] = attribute[i]
      }
      let sku = defaultInfo.sku + skuAttributeValidate(attribute)
      return tempA = {...tempA, [sku]: {sku: sku, quantity: defaultInfo.quantity, price: defaultInfo.price, attribute: att, image: defaultInfo.images[0]}}
    })
    setInventories(tempA)
  }

  useEffect(() => {
    getAllProductTypes(0)
    setProductTypes(tempAttributes)
  }, [attributes])

  useEffect(() => {
    initiateInventories()
  }, [productTypes])
  

  useEffect(() => {
    initiateInventories()
  }, [defaultInfo])

  //TODO handle submit
  const handleSubmit = async () => {
    // createProductApi({...product, ...pageSelect})
    // .then(async data => {
    //   await createInventoriesApi({inventories: Object.values(inventories), product_id: data.product_id})
    // }).catch(e => {
    //   console.log(e);
    // })
    try {
      const productData = await createProductApi({...product, ...pageSelect})
      await createInventoriesApi({inventories: Object.values(inventories), product_id: productData.product_id})
    } catch (e) {
      console.log(e);
      return
    }
    window.location.reload(false);
  }

  return (
    <div>  
      <table className={classes.attribute_table}>
        <tr>
          <th>SKU (suffix)</th>
          <th>Số lượng</th>
          <th>Giá tiền</th>
          <th>Hình ảnh</th>
        </tr>
        {
          productTypes.map(attribute => {
            return <tr><ProductInventoryChange attributeKey={key} attributeValue={attribute} defaultInfo={defaultInfo} inventories={inventories} setInventories={setInventories} classes={classes} /></tr>
          })
        }
      </table>

      <div className='row'>
        <label style={{color: 'transparent'}}>lmao</label>
        <Button variant='contained' color='secondary' onClick={handleSubmit}>Lưu sản phẩm</Button>
      </div>
    </div>
  )
}





function ProductContainer({attributes, pages, sku, classes}) {  
  const [markDownDialog, setMarkDownDialog] = useState(false)
  const [attributeDialog , setAttributeDialog ] = useState(false)
  const [createInventory, setCreateInventory] = useState(false)
  const [images, setImages] = useState([])
  const [image, setImage] = useState('')
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    quantity: '',
    images: [],
    detail: [],
    attributes: {}
  })
  const [productDetail, setProductDetail] = useState({
    key: '', value:'',
  })
  const [pageSelect, setPageSelect] = useState({
    page: undefined, subPage: undefined, category: undefined, subCategory: undefined,
  })
  const { createProductApi } = ProductJwtApi()

  //TODO : image
  const addProductImage = () => {
    setProduct({...product, images: [...product.images, image]})
  }
  const removeProductImage = (imageUrl) => {
    const images = product.images.filter(image => {
      return image !== imageUrl
    })
    setProduct({...product, images: images})
  }

  //TODO : detail
  const handleDetailChange = (e) => {
    const {name, value} = e.target
    setProductDetail({...productDetail, [name]: value})
  }
  const addProductDetail = () => {
    setProduct({...product, detail: [...product.detail, productDetail]})
  }
  const removeProductDetail = (detailKey) => {
    const detailP = product.detail.filter(detail => {
      return detail.key !== detailKey
    })
    setProduct({...product, detail: detailP})
  }

  //TODO : infor change
  const handleChange = (e) => {
    const {name, value} = e.target
    if (name === 'name') {
      setProduct({...product, sku: skuValidate(value), name :value})
      return
    }
    setProduct({...product, [name]: value})
  }

  //TODO : hande submit
  const createProductReq = async (e) => {
    try { 
      // name: '',
      // sku: '',
      // description: '',
      // price: '',
      // quantity: '',
      // images: [],
      // detail: [],
      // attributes: {}
      for (let pro in product) {
        if (!product[pro].length) {
          e.preventDefault()
          alert('Chưa nhập hết thông tin')
          return
        }
      }
      const res = await createProductApi({...product, ...pageSelect})
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  }

  const [num1, setNum1] = useState(-1)
  const [num2, setNum2] = useState(-1)
  const [num3, setNum3] = useState(-1)

  
  const pageChange = (e) => {
    const {name, value} = e.target
    console.log(name + ': ' + value)

    setPageSelect({...pageSelect, [name]: value})

    switch (name) {
      case 'page':
        if (value === '') {
          setNum1(-1)
          setNum2(-1)
          setNum3(-1)
          return
        } 
        for (let i = 0; i < pages.length; i++) {
          if (pages[i]._id === value) {
            setNum1(i)
            break
          }
        }
        break;
      case 'subPage': 
        if (value === '') {
          setNum2(-1)
          setNum3(-1)
          return
        } 
        for (let i = 0; i < pages[num1].subPages.length; i++) {
          if (pages[num1].subPages[i]?._id === value) {
            setNum2(i)
            break
          }
        }
        break
      case 'category': 
        if (value === '') {
          setNum3(-1)
          return
        } 
        for (let i = 0; i < pages[num1].subPages[num2].categories.length; i++) {
          if (pages[num1].subPages[num2].categories[i]._id === value) {
            setNum3(i)
            break
          }
        }
        break
      default:
        break;
    }

  }


  return (
    <div className={classes.sub_container}>
      <div className="header_box header_box_add">
        <div className="header">Tạo mới sản phẩm</div>
      </div>
      <div className='update_box'>
        <div className='update_infor'>
          <form onSubmit={createProductReq}>

            <div className='row'>
              <label htmlFor="product_name">Tên sản phẩm</label>
              <div className='row_input'>
                <input onChange={handleChange} type="text" id='product_name' name='name' />
              </div>
            </div>

            <div className='row'>
              <label htmlFor="sku">SKU</label>
              <div className='row_input'>
                <input onChange={handleChange} type="text" id='sku' name='sku' value={product.sku}/>
              </div>
            </div>

            <div className='row'>
              <label htmlFor='price'>Giá sản phẩm</label>
              <div className='row_input'>
                <input onChange={handleChange} type="text" id='price' name='price' placeholder='vd: 200000' />
              </div>
            </div>
            <div className='row'>
              <label htmlFor='quantity'>Số lượng</label>
              <div className='row_input'>
                <input onChange={handleChange} type="number" id='quantity' min={0} name='quantity' />
              </div>
            </div>

            <div className='row'>
              <label htmlFor=''>Phân trang</label>  
              <div className='row_input'>
                <select name="page" onChange={pageChange} value={pageSelect.page}>
                  <option value={undefined}>Trang</option>
                  {pages.map(page => {
                    return <option value={page._id}>{page.name}</option>
                  })}
                </select>
                <select name="subPage" onChange={pageChange} value={pageSelect.subPage}>
                  <option value={undefined}>Trang con</option>
                  {pages[num1]?.subPages.map(page => {
                    return <option value={page._id}>{page.name}</option>
                  })}
                </select>
                <select name="category" onChange={pageChange} value={pageSelect.category}>
                  <option value={undefined}>Danh mục</option>
                  {pages[num1]?.subPages[num2]?.categories.map(page => {
                    return <option value={page._id}>{page.name}</option>
                  })}
                </select>
                <select name="subCategory" onChange={pageChange} value={pageSelect.subCategory}>
                  <option value={undefined}>Danh mục con</option>
                  {pages[num1]?.subPages[num2]?.categories[num3]?.subCategories.map(page => {
                    return <option value={page._id}>{page.name}</option>
                  })}
                </select>
              </div>
            </div>

            <div className='row'>
              <label htmlFor="images">Hình ảnh</label>
              <div className='row_input list_input'>
                <input onChange={(e) => setImage(e.target.value)} type="text" id='images' name='images' placeholder='Copy đường dẫn vào đây' />
                <Button onClick={addProductImage} variant='contained' color='primary'>Lưu</Button>
                <div className='image_list'>
                  {product.images.map(image => {
                    return <div className='image' key={image}>
                      <img src={image} alt='product_img'/> 
                      <span style={{cursor: 'pointer'}} onClick={(() => removeProductImage(image))}>[x]</span>
                    </div>
                  })}
                </div>
              </div>
            </div>

            <div className='row'>
              <label htmlFor='detail'>Chi tiết sản phẩm</label>
              <div>
                <input onChange={handleDetailChange} className={classes.pair_input} type="text" id='detail' name='key' placeholder='key' />
                <input onChange={handleDetailChange} className={classes.pair_input} type="text" id='detail' name='value' placeholder='value' />
                <Button onClick={addProductDetail} variant='outlined'>Lưu</Button>
                <div>
                  {product.detail.map(detail => {
                    return <div key={detail.key}> {detail.key}: {detail.value} <span style={{cursor: 'pointer'}} onClick={(() => removeProductDetail(detail.key))}>[x]</span></div>
                  })}
                </div>
              </div>
            </div>

            <div className='row'>
              <label htmlFor="description">Mô tả sản phẩm</label>
              <div className='row_input'>
                <div className='dialog_text' onClick={() => setMarkDownDialog(true)}>markdown syntax</div>
                <textarea onChange={handleChange} name='description' type="text" id='description' />
              </div>
            </div>

            <div className='row'>
              <label style={{color: 'transparent'}}>lmao</label>
              <div className='dialog_text' onClick={() => setAttributeDialog(true)}>Chọn kiểu cho sản phẩm</div>
            </div>

            {Object.keys(product.attributes).length > 0 && <ProductInventoryContainer attributes={product.attributes} product={product} pageSelect={pageSelect} defaultInfo={{sku: product.sku, price: product.price, quantity: product.quantity, images: product.images}} classes={classes} />}

            {Object.keys(product.attributes).length === 0 && <div className='row'>
              <label style={{color: 'transparent'}}>lmao</label>
              <Button variant='contained' color='secondary' type='submit'>Lưu sản phẩm</Button>
            </div>}
          </form>
        </div>
        <ProductImageUpload images={images} setImages={setImages} classes={classes} />
      
        <MarkdownSyntaxDialog openDialog={markDownDialog} setOpenDialog={setMarkDownDialog} classes={classes} />
        <ProductAttributeDialog product={product} setProduct={setProduct} openDialog={attributeDialog} setOpenDialog={setAttributeDialog} attributes={attributes} classes={classes} />
      </div>
    </div>
  )
}

export default ProductContainer