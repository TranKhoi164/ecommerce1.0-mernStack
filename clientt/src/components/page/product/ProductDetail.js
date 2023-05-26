import React, {useState, useEffect, useRef} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productPageStyle from '../../../styles/productPage.style';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Button } from '@material-ui/core';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AssignmentReturnOutlinedIcon from '@material-ui/icons/AssignmentReturnOutlined';


import { useSelector } from 'react-redux';
import { selectAccount } from '../../../features/account/accountSlice';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactMarkdown from 'react-markdown'

import { priceValidate, skuAttributeValidate } from '../../utils/stringFunc/manipulateString';
import { OrderJwtApi } from '../../../api/orderApi';
import { ErrorSnackbar, SuccessSnackbar } from '../../utils/snackbar/Snackbar';
import UserDebounce from '../../utils/UserDebounce';
import { InventoryJwtApi } from '../../../api/inventoryApi';
import { ProductJwtApi } from '../../../api/productApi';
import RatingBox from './utils/RatingBox';
import { RatingJwtApi } from '../../../api/ratingApi';


const compareObject = (obj1 = {}, obj2 = {}) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length || keys1.length === 0 || keys2.length === 0) {
    return false;
  }
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

function ProductDetail() {
  const { createOrderApi } = OrderJwtApi()
  const { updateInventoryApi } = InventoryJwtApi()
  const { getProductApi } = ProductJwtApi()
  const { getRatingsOfProductApi } = RatingJwtApi()

  const debounce = UserDebounce()

  const star = useRef(0)
  const {product_sku} = useParams()
  const classes = productPageStyle()
  const accountData = useSelector(selectAccount)

  const [reqMessage, setReqMessage] = useState('')
  const [openSnack, setOpenSnack] = useState(false)
  const [isSuccessReq, setIsSuccessReq] = useState(false)

  const [selectedCarouselImage, setSelectedCarouselImage] = useState(0)
  const [selectAttributes, setSelectAttributes] = useState({})
  const [allFilled, setAllFilled] = useState(true)
  const [product, setProduct] = useState({})
  const navigate = useNavigate()
  const [fullDescription, setFullDescription] = useState(false)
  const [productInventory, setProductInventory] = useState({
    sku: product?.sku || '',
    price: product?.price || '',
    image: '',
    quantity: ''
  })
  const [ratings, setRatings] = useState([])
  const [newOrder, setNewOrder] = useState({
    product: '',
    inventory: '',
    status: '',
    quantity: '',
    shippingAddress: '',  
    payment: ''
  })

  console.log('newOrder: ', newOrder);

  useEffect(() => {
    getProductApi({sku: product_sku}).then(data => {
      star.current = data.product?.avgStarRating
      setProduct(data.product)
    }).catch(e => console.log(e))
  }, [])

  useEffect(() => {
    if (Object.keys(selectAttributes).length === Object.keys(product?.attributes||{}).length && product?.attributes) {
      let temp = product?.inventories?.find(el => compareObject(el?.attribute, selectAttributes))
      setProductInventory({sku: temp?.sku, price: temp?.price, quantity: temp?.quantity, image: temp?.image})
      setNewOrder({...newOrder, inventory: temp?._id, quantity: temp?.quantity ? '1' : '0'})
      
      let imgIndex = product?.images?.findIndex((el) => el === temp?.image)
      setSelectedCarouselImage(imgIndex)
    }
  }, [selectAttributes])

  useEffect(() => {
    let temp = product?.inventories?.find(el => el?.sku === product?.sku)
    setProductInventory({...productInventory, quantity: temp?.quantity, sku: temp?.sku, price: temp?.price})
    if (!temp?.quantity) {
      setNewOrder({...newOrder, quantity: '0', product: product?._id, inventory: temp?._id})
    }
    else setNewOrder({...newOrder, product: product?._id, inventory: temp?._id})

    if (product._id) {
      getRatingsOfProductApi({product: product?._id})
      .then(data => {
        let avg = 0
        for (let el of data.ratings) {
          avg += el?.starRating
        }
        avg /= data?.ratings?.length
        avg = Math.round(avg * 10) / 10
        star.current = avg
        setRatings(data.ratings)
      })
      .catch(e => console.log(e?.message))
    }
  }, [product])
  
  const handleAttributeChange = (e) => {
    const {name, value} = e.target
    setSelectAttributes({...selectAttributes, [name]: value})
  }
  
  
  const handleBasicInforChange = (e) => {
    const {name, value} = e.target
    setNewOrder({...newOrder, [name]: value})
  }

  const handlePriceChange = (e) => {
    const {max, min, value} = e.target
    
    if (parseInt(value) > parseInt(max)) {
      setNewOrder({...newOrder, quantity: max})
      return
    } 
    if (parseInt(value) < parseInt(min) && value !== '') {
      setNewOrder({...newOrder, quantity: min})
      return 
    }
    setNewOrder({...newOrder, quantity: value})
  }

  const allFieldIsFilled = () => {
    if (Object.keys(selectAttributes).length !== Object.keys(product?.attributes).length) 
      return false
    if (!newOrder.shippingAddress)
      return false
    if (!newOrder.quantity)
      return false
    if (productInventory.quantity == 0) 
      return false
    return true
  } 

  const addToCart = async (e) => {
    if (!allFieldIsFilled() || !productInventory.quantity) {
      setAllFilled(false)
      return
    }
    try {
      console.log('test');
      await updateInventoryApi({sku: product?.sku + skuAttributeValidate(selectAttributes), quantity: newOrder.quantity, shippingAddress: newOrder.shippingAddress  })
      const createOrderMess = await createOrderApi({...newOrder, status: 'pending'})
      console.log(createOrderMess);
      console.log('ngu');
      alert(createOrderMess.message)
    } catch (e) {
      alert(e.message)
    }
  }

  const buyProduct = (e) => { 
    if (!allFieldIsFilled() || !productInventory.quantity) {
      setAllFilled(false)
      return
    }

    debounce(() => createOrderApi({...newOrder, status: 'pending'})
    .then(message => {
      console.log('message: ', message);
      navigate('/checkout', { state: {purchaseOrders: [{...message.order}]} })
    }).catch(e => {
      setReqMessage(e.message)
      setIsSuccessReq(false)
      setOpenSnack(true)
    }), 1000)
    updateInventoryApi({sku: product?.sku + skuAttributeValidate(selectAttributes), quantity: newOrder.quantity  })
    .catch(e => alert(e.message))
  }

  return (
    <div className={classes.productDetail_container}>
      <div className='main_detail_container'>
        <div className='carousel_container'>
          <Carousel className='carousel' selectedItem={selectedCarouselImage}>
            {product?.images?.map(image => {
              return <div>
                <img src={image} alt="product_image" className='car_img' />
              </div>
            })}
          </Carousel>
        </div>
        <div className='main_detail'>
          <div className='title'>{product?.name}</div>
          <div className='sku'><small>SKU: {productInventory.sku || product?.sku}</small></div>
          <div className='rating_point'>
            <u style={{color: 'orange', fontSize: '16px', paddingRight: '5px', marginRight: '2px'}}>{star.current}</u> <Rating size='small' value={star.current} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" />} readOnly style={{ paddingRight: '10px', borderRight: '1px solid #cccccc'}}/><u style={{color: 'black', fontSize: '16px', paddingLeft: '10px', marginRight: '5px'}}>{ratings?.length}</u>Đánh Giá
          </div>
          <div className='price'>{priceValidate(productInventory?.price || product?.price || '')}<sup><small><u style={{fontWeight: '550', fontSize:'19px'}}>đ</u></small></sup></div>
          

          <div className='shipping_container'>
            <div className='field_name'>vận chuyển</div>
            <div className='ship_to_container'>
              <label for='shipping'><LocalShippingOutlinedIcon style={{color: 'black', marginRight:'5px'}} /> Vận chuyển tới</label>
              <select name="shippingAddress" id="shipping" onChange={handleBasicInforChange} defaultValue={undefined}>
                <option value={undefined} selected disabled>Chọn địa chỉ giao hàng</option>
                {accountData?.addresses?.map(address => {
                  return <option value={address?._id}>{`${address?.address},${address?.ward},${address?.district},${address?.province}`}</option>
                })}
              </select>
            </div>
          </div>

          <div className='attributes'>
            {product.attributes && Object.keys(product?.attributes)?.map(key => {
              return <div className='attribute_row'>
                <div className='field_name'>{key}</div>
                <div className='attribute_row_item'>
                  { product?.attributes[key]?.map(attribute => {
                    return <div>
                      <input value={attribute} required type="radio" onChange={handleAttributeChange} id={attribute} name={key} style={{display: 'none'}}/>
                      <label className={'attribute_item ' + (selectAttributes[key]===attribute?'active':'inactive')} for={attribute}  >{attribute}</label>
                    </div>
                  }) }
                </div>
              </div>
            })}
          </div>

          <div className='quantity_container'>
            <div className='field_name'>Số lượng</div>
            <div>
              <input type="number" 
                name='quantity' 
                onChange={handlePriceChange} 
                disabled={productInventory?.quantity ? false : true} 
                value={newOrder?.quantity} 
                min={productInventory?.quantity === 0 ? 0 : 1} 
                max={productInventory?.quantity || 0} 
              />
              <span style={{color: '#919191', marginLeft: '10px'}}>{productInventory?.quantity || 0} sản phẩm có sẵn</span>
            </div>
          </div>
          
          <div className='btn_container'>
            {!allFilled && <div className='err_notify'>Cần nhập hết thông tin đơn hàng</div>}
            <Button variant='outlined' color='secondary' type='submit' onClick={addToCart}><AddShoppingCartIcon />  Thêm Vào Giỏ hàng</Button>
            <Button variant='contained' color='secondary' type='submit' onClick={buyProduct}>Mua ngay</Button>
          </div>

          <div className='extraPolicy_container'>
            <div className='policy'>
              <div className='policy_icon'><LocalShippingOutlinedIcon /></div>
              <div>
                <b>Miễn phí vận chuyển</b>
                <div>Giao hàng miễn phí vận chuyển cho mọi đơn hàng</div>
              </div>
            </div>
            <div className='policy'>
              <div className='policy_icon'><LocalAtmIcon /></div>
              <div>
                <b>Quy tắc COD</b>
                <div>Tìm hiểu thêm</div>
              </div>
            </div>
            <div className='policy'>
              <div className='policy_icon'><AssignmentReturnOutlinedIcon /></div>
              <div>
                <b>Chính sách hoàn trả</b>
                <div>Trả lại hoặc trao đổi trong vòng 15 ngày kể từ ngày giao hàng.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='extra_detail_container'>
        <div className='detail_block'>
          <div className='extra_detail_header'>CHI TIẾT SẢN PHẨM</div>
          
          {product?.detail?.map(deEl => {
            return <div className='detail_block_items'>
              <div className='key'>{deEl.key}</div>
              <div className='value'>{deEl.value}</div>
            </div>
          })}
        </div>

        <div className={fullDescription ? 'description_block full_description' : 'description_block'} >
          <div className='extra_detail_header'>MÔ TẢ SẢN PHẨM</div>
          <ReactMarkdown className='markdown'>
            {product?.description}
          </ReactMarkdown>
        </div>

        {ratings?.length > 0 && <RatingBox ratings={ratings} setRatings={setRatings} productId={product?._id} ratingsLength={product?.rating?.length} attributes={product?.attributes} compareObject={compareObject} inventories={product?.inventories} classes={classes} />}
      </div>

      {isSuccessReq 
        ? <SuccessSnackbar message={reqMessage} openSnack={openSnack} setOpenSnack={setOpenSnack} />
        : <ErrorSnackbar message={reqMessage} openSnack={openSnack} setOpenSnack={setOpenSnack} />
      }
    </div>
  )
}

export default ProductDetail