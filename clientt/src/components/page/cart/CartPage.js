import React, {useEffect, useState} from 'react'
import cartStyle from '../../../styles/cart.style'

import { OrderManagementJwtApi } from '../../../api/orderManagementApi'

import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link, useNavigate } from 'react-router-dom'

import CartItemBox from './CartItemBox'
import { priceValidate } from '../../utils/stringFunc/manipulateString';

function CartPage() {
  const classes = cartStyle()
  const {getOrdersInCartApi} = OrderManagementJwtApi()
  const [orders, setOrders] = useState([])
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getOrdersInCartApi().then(data => setOrders(data?.orders?.pending)).catch(e => console.log(e))
  }, [])


  const checkboxChange = (e) => {
    const {name, value, checked} = e.target
    if (checked) {
      setPurchaseOrders([...purchaseOrders, JSON.parse(value)])
    } else {
      let temp = purchaseOrders.filter(el => el?._id !== JSON.parse(value)?._id)
      setPurchaseOrders(temp)
    }
  }
  
  const checkoutTrigger = (e) => {
    if (purchaseOrders.length === 0) {
      alert('Bạn vẫn chưa chọn sản phẩm nào để mua')
      return
    }
    navigate('/checkout', { state: {purchaseOrders: purchaseOrders} })
  }

  const totalCost = () => {
    let res = 0;
    purchaseOrders.forEach(el => {
      res += el?.inventory?.price * el?.quantity
    });
    return res
  }

  return (
    <div className={classes.cartPage_container}>
      {
        orders.length > 0 ?

        <div className={classes.cart_container}>
        <div className='order_list'>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='checkbox' id='select_all' />
            <StorefrontIcon style={{marginLeft: '20px'}} />
            <label htmlFor="select_all" style={{marginLeft: '5px', fontWeight: 'bold', fontSize: '20px'}}>SHINEE</label>
          </div> 
          {orders.map(order => {
            return <div className='cartItem_box'>
              <input type='checkbox' id={order?._id} name='orders' value={JSON.stringify(order)} onChange={checkboxChange} />
              <CartItemBox order={order} orders={orders} setOrders={setOrders} />
            </div>
          })}
        </div>
        <div className='payment_box'>
          <h2>Tóm Tắt Đơn Hàng</h2>
          <div className='total_price'>
            <div>Giá tiền</div> 
            <div className='display_price'>{priceValidate(totalCost())} <sup><u>đ</u></sup></div>
          </div>
          <div style={{marginTop: '10px'}}>Tổng thanh toán ({orders?.length} sản phẩm)</div>
          <button onClick={checkoutTrigger}>Thanh Toán Ngay</button>
        </div>
      </div> :


      <div className='emptyCard_container'>
        <img src="https://img.freepik.com/free-vector/cart-basket-shopping-icons-finance_24911-45461.jpg?w=740&t=st=1678017297~exp=1678017897~hmac=7624c3de5617d961e267687d40552c732f79b2636f0717c54e7fbda66337d020" alt="img"  />
        <div>Giỏ hàng của bạn còn trống</div>
        <Link to={'/'}><button>Mua Ngay</button></Link>
      </div>
      }
    </div>
  )
}

export default CartPage