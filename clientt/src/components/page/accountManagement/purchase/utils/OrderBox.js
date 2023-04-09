import React, {useState} from 'react'
import { addCommaBetweenCharacter, priceValidate } from '../../../../utils/stringFunc/manipulateString'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { OrderManagementJwtApi } from '../../../../../api/orderManagementApi';
import ProductRatingDialog from '../../../../utils/dialog/productRating/ProductRatingDialog';
import UpdateRatingDialog from '../../../../utils/dialog/productRating/UpdateRatingDialog';

function OrderBox({order, orderManagement, setOrderManagement}) {

  const beingShippedAction = () => {
    const {cancelOrderApi} = OrderManagementJwtApi()

    const triggerCancelOrder = () => {
      cancelOrderApi({_id: order?._id})
      .then(() => {
        let tempOrderManagement = {...orderManagement}
           
        const confirmedOrderIndex = tempOrderManagement['beingShipped'].findIndex(el => el._id === order?._id)
        delete tempOrderManagement?.['beingShipped'][confirmedOrderIndex]

        tempOrderManagement?.['cancelled'].push({...order, status: 'cancelled'})
        setOrderManagement(tempOrderManagement)
      }).catch(e => {
        alert(e.message)
      })
    } 

    return (
      <div>
        <Button variant='contained' onClick={triggerCancelOrder} color='secondary'>Hủy đơn hàng</Button>
      </div>
    )
  }
  return (
    <div className='order_box'> 
      <Link to={'/account/purchase/order/'+order?._id} style={{color:'black'}}>
        <div className='order_detail'>
          <div className='detail_1'>
            <img src={order?.inventory?.image} alt="product" />
            <div style={{marginLeft: '15px'}}>
              <div>{order?.inventory?.product?.name}</div>
              <div style={{color: '#9A9A9A'}}>Phân loại hàng: {addCommaBetweenCharacter(Object.values(order?.inventory?.attribute))} </div>
              <div>X{order?.quantity}</div>
            </div>
          </div>
          <div>
            {priceValidate(order?.inventory.price)}<sup><small><u>đ</u></small></sup>
          </div>
        </div>
      </Link>
      <div className='order_action'>
        <div style={{margin: '20px 0 20px 0'}}>
          Thành tiền: <span style={{fontSize: '20px'}}>{priceValidate(order?.inventory?.price * order?.quantity)}<sup><small><u>đ</u></small></sup></span>
        </div>
        <div className='action_btn'>
          {order?.status === 'beingShipped' && beingShippedAction()}
        </div>
      </div>
    </div>
  )
}

export default OrderBox