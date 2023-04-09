import React, {useState, useEffect, useRef} from 'react'
import { OrderJwtApi } from '../../../../api/orderApi'
import { OrderManagementJwtApi } from '../../../../api/orderManagementApi'

import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';

import { Link } from 'react-router-dom';

import { priceValidate } from '../../../utils/stringFunc/manipulateString';
import { addCommaBetweenCharacter } from '../../../utils/stringFunc/manipulateString';
import OrderManagementAppbar from '../../../utils/appbar/OrderManagementAppbar';

import OrderBox from './utils/OrderBox'



function OrderManagementItem({orderManagement, orderManagements, setOrderManagements, currentTab}) {
  return (
    <div className='orderManagement_item'>
      <div className='account_info'>
        <div>Đơn hàng của: <span style={{color: 'black'}}>{orderManagement?.account?.fullName}</span></div> 
        <div>{orderManagement?.account?.email}</div>
      </div>
      <div style={{padding: '0 30px 0 30px'}}>
        {orderManagement[currentTab]?.map(order => {
          return <OrderBox order={order} orderManagements={orderManagements} orderManagementId={orderManagement?._id} setOrderManagements={setOrderManagements} />
        })}
      </div>
    </div>
  )
}




function OrderManagement({classes}) {
  const { getPurchasedOrdersApi } = OrderManagementJwtApi()
  const matchedCount = useRef(0)
  const [isLoading, setIsLoading] = useState(false)
  const [orderManagements, setOrderManagements] = useState([])
  const [currentTab, setCurrentTab] = useState('beingShipped')

  useEffect(() => {
    setIsLoading(true)
    getPurchasedOrdersApi()
    .then(data => {
      setOrderManagements(data.orderManagements); 
      setIsLoading(false)
    }).catch(e => console.log(e))
  }, [])

  useEffect(() => {
    matchedCount.current = 0
    
  }, [currentTab])
  
  
  return (
    <div className={classes.orderManagement_page}>
      <OrderManagementAppbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div style={{display:'flex', justifyContent:'center'}}>
        {isLoading && <CircularProgress color='secondary' /> }
        <div className='orderManagement_list'>
          {orderManagements?.map(orderManagement => {
            if (orderManagement[currentTab].length > 0) {
              matchedCount.current += 1
              return <OrderManagementItem orderManagement={orderManagement} orderManagements={orderManagements} setOrderManagements={setOrderManagements} currentTab={currentTab} />
            } return <div></div>
          })}
          {matchedCount.current === 0 && 
          <div className='noOrder_notify'>
            <img src="https://img.freepik.com/free-photo/3d-render-red-paper-clipboard-with-cross-mark_107791-15856.jpg?w=740&t=st=1679108245~exp=1679108845~hmac=7225c799624dbd303ce106c50a01761cf40b058524dd2a40ac1aa86dd69c2c07" alt="clipboard" />
            <div>Chưa có đơn hàng</div>
          </div>} 
        </div>
      </div>
    </div>
  )
}

export default OrderManagement