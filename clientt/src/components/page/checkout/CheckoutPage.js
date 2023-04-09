import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { OrderJwtApi } from '../../../api/orderApi'
import { OrderManagementJwtApi } from '../../../api/orderManagementApi'
import checkoutStyle from '../../../styles/checkout.style'
import { addCommaBetweenCharacter, priceValidate, cutString, queryUrlServer } from '../../utils/stringFunc/manipulateString'

function OrderCheckoutItem({order}) {

  return (
    <div className='checkoutItem_container table_row'>
      <div><img src={order?.inventory?.image} alt="product" /></div>
      <div>{cutString(order?.inventory?.product?.name, 40)}</div>
      <div style={{color: '#A4A3A3'}}><span>Loại:  </span>{cutString(addCommaBetweenCharacter(Object.values(order?.inventory?.attribute||{})), 13)}</div>
      <div>{cutString(addCommaBetweenCharacter(Object.values(order?.shippingAddress)), 30)}</div>
      <div>{priceValidate(order?.inventory?.price)}<sup><small><u>đ</u></small></sup></div>
      <div>{order?.quantity}</div>
      <div>{priceValidate(order?.inventory?.price*order?.quantity)}<sup><small><u>đ</u></small></sup></div>
    </div>
  )
}

function CheckoutPage() {
  const classes = checkoutStyle()
  const location = useLocation()
  const navigate = useNavigate()
  const { purchaseOrders } = location.state
  const [payment, setPayment] = useState('offline')
  const { updateOrderApi } = OrderJwtApi()
  const { purchaseOrdersApi } = OrderManagementJwtApi()

  let totalPrice = 0
  console.log('purchaseOrders: ', purchaseOrders);

  const triggerPurchaseAction = () => {
    try { 
      let purchaseOrdersId = []
      for (let order of purchaseOrders) {
        purchaseOrdersId.push(order._id)
      }
      Promise.all([
        updateOrderApi({payment: payment}, queryUrlServer({orders: purchaseOrdersId})),
        purchaseOrdersApi(purchaseOrdersId)
      ])
      navigate('/')
      // purchaseOrdersApi(purchaseOrdersId)
      // .then(data => console.log(data.message))
    } catch(e) {
      alert(e)
    }
  }

  return (
    <div className={classes.checkoutPage_container}>
      <div className={classes.orderList_container}>
        <div className='field_name table_row'>
          <div style={{color: 'black', fontSize: '18px'}}><span style={{position: 'absolute'}}>Sản phẩm</span></div>
          <div></div>
          <div></div>
          <div>Giao tới</div>
          <div className='center'>Đơn giá</div>
          <div className='center'>Số lượng</div>
          <div className='center'>Thành tiền</div>
        </div>
        {purchaseOrders?.map(order => {
          totalPrice += parseInt(order?.inventory?.price*order?.quantity)
          return <OrderCheckoutItem order={order} />
        })}
      </div>
      <div className="selectPayment_container">
        <div>Phương thức thanh toán</div>
        <select name="payment" defaultValue='offline' onChange={(e) => setPayment(e.target.value)}>
          <option value="offline">Thanh toán khi nhận hàng</option>
          <option value="online">Thanh toán bằng thẻ tín dụng</option>
        </select>
      </div>
      <div className='purchaseBox_container'>
        <div className='purchaseBox'>
          <div>Tổng thanh toán: <span style={{color: 'black', fontSize: '20px'}}>{priceValidate(totalPrice)}<sup><small><u>đ</u></small></sup></span></div>
          <div onClick={triggerPurchaseAction} className='action'>Đặt hàng</div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage