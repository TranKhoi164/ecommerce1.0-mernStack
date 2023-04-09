import React, {useState, useEffect} from 'react'

import { OrderManagementJwtApi } from '../../../../api/orderManagementApi'
import OrderManagementAppbar from '../../../utils/appbar/OrderManagementAppbar'
import OrderBox from './utils/OrderBox'

function Purchase({classes}) {
  const {getOrderManagementApi} = OrderManagementJwtApi()

  const [orders, setOrders] = useState([])
  const [orderManagement, setOrderManagement] = useState([])
  const [currentTab, setCurrentTab] = useState('beingShipped')

  console.log('orders:', orders);
  console.log('oManage: ', orderManagement);

  useEffect(() => {
    getOrderManagementApi().then(data => {
      setOrderManagement(data?.order_management)
      setOrders(data?.order_management?.beingShipped || [])
    })
  }, [])
  
  useEffect(() => {
    if (currentTab === 'beingShipped') {
      setOrders(orderManagement?.beingShipped || [])
    } else if (currentTab === 'accomplished') {
      setOrders(orderManagement?.accomplished || [])
    } else {
      setOrders(orderManagement?.cancelled || [])
    }
  }, [currentTab])
  
  return (
    <div className={classes.purchase_container}>
      <OrderManagementAppbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {orders?.length !== 0
      ? orders?.map(order => {
        return <OrderBox order={order} orderManagement={orderManagement} setOrderManagement={setOrderManagement} />
      }) 
      : <div className='noOrder_notify'>
          <img src="https://img.freepik.com/free-photo/3d-render-red-paper-clipboard-with-cross-mark_107791-15856.jpg?w=740&t=st=1679108245~exp=1679108845~hmac=7225c799624dbd303ce106c50a01761cf40b058524dd2a40ac1aa86dd69c2c07" alt="clipboard" />
          <div>Chưa có đơn hàng</div>
        </div>
      }
    </div>  
  )
}

export default Purchase