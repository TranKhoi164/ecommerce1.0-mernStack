import React, { useState } from 'react'
import { addCommaBetweenCharacter, priceValidate } from '../../../../utils/stringFunc/manipulateString'
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link } from 'react-router-dom';

import { OrderManagementJwtApi } from '../../../../../api/orderManagementApi';

function OrderBox({order, orderManagementId, orderManagements, setOrderManagements}) {
  const { confirmOrderApi } = OrderManagementJwtApi()
  const [isLoading, setIsLoading] = useState(false)

  const beingShippedAction = () => {
    const triggerAction = () => {
      setIsLoading(true)
      confirmOrderApi({_id: order?._id}).then(() => {
        let tempOrderManagements = [...orderManagements]
        const orderManagementIndex = tempOrderManagements.findIndex(el => el._id === orderManagementId)
           
        const confirmedOrderIndex = tempOrderManagements[orderManagementIndex]['beingShipped'].findIndex(el => el._id === order?._id)
        delete tempOrderManagements[orderManagementIndex]['beingShipped'][confirmedOrderIndex]

        tempOrderManagements[orderManagementIndex]['accomplished'].push(order)
        setOrderManagements(tempOrderManagements)

        setIsLoading(false);
      }).catch(e => console.log(e))
    }

    return (
      <div>
        <Button onClick={triggerAction} variant='contained' color='secondary'>Xác nhận</Button>
      </div>
    )
  }

  const accomplishedAction = () => {
    return (
      <div>
        <Button variant='outlined' color='secondary'>Xác nhận hoàn thành</Button>
      </div>
    )
  }

  return (
    <div className='order_box'> 
        <div className='order_detail'>
          <Link to={'/account/purchase/order/'+order?._id} style={{color:'black'}}>
            <div className='detail_1'>
              <img src={order?.inventory?.image} alt="product" />
              <div style={{marginLeft: '15px'}}>
                <div>{order?.inventory?.product?.name}</div>
                <div style={{color: '#9d9d9d'}}>Phân loại hàng: {addCommaBetweenCharacter(Object.values(order?.inventory?.attribute))} </div>
                <div style={{color: '#9d9d9d'}}>Giao tới: {addCommaBetweenCharacter(Object.values({...order?.shippingAddress}))}</div>
                <div style={{color: '#9d9d9d'}}>X{order?.quantity} <span style={{margin: '0 20px 0 20px'}}>{order?.inventory?.price}<sup><small><u>đ</u></small></sup></span>   <span style={{color: 'black'}}>Thành tiền:</span> <span style={{color: 'black', fontSize: '17px'}}>{priceValidate(order?.inventory?.price * order?.quantity)}<sup><small><u>đ</u></small></sup></span></div>
              </div>
            </div>
          </Link>
          <div>
            {
              isLoading 
            ? <CircularProgress color='secondary' />
            : <div className='action_btn'>
                {order?.status === 'beingShipped' && beingShippedAction()}
                {order?.status === 'accomplished' && accomplishedAction()}
              </div>
            }
          </div>
        </div>
      {/* <div className='order_action'>
        <div style={{margin: '20px 0 20px 0'}}>
          Thành tiền: <span style={{fontSize: '20px'}}>{priceValidate(order?.inventory?.price * order?.quantity)}<sup><small><u>đ</u></small></sup></span>
        </div>
        <div className='action_btn'>
          {order?.status === 'beingShipped' && beingShippedAction()}
          {order?.status === 'accomplished' && accomplishedAction()}
        </div>
      </div> */}
    </div>
  )
}

export default OrderBox