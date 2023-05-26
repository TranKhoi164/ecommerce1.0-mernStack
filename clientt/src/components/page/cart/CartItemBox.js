import React, {useEffect, useState} from 'react'

import { priceValidate } from '../../utils/stringFunc/manipulateString'
import { OrderJwtApi } from '../../../api/orderApi'
import UserDebounce from '../../utils/UserDebounce'
import { InventoryJwtApi } from '../../../api/inventoryApi'
import { Link } from 'react-router-dom'
import { addCommaBetweenCharacter } from '../../utils/stringFunc/manipulateString'

function CartItemBox({order, orders, setOrders}) {
  const debounce = UserDebounce()
  const {deleteOrderApi, updateOrderApi} = OrderJwtApi()
  const {updateInventoryApi} = InventoryJwtApi()

  // const [disableInput, setDisableInput] = useState(order?.inventory.quantity === 0 ? true : false)
  const quantity = order?.quantity

  // useEffect(() => {
  //   const uIndex = orders.findIndex(el => el._id === order._id)
  //   let tempArr = [...orders]
  //   tempArr[uIndex].quantity = quantity
  //   setOrders(tempArr)

  //   setDisableInput(true)
  //   debounce(
  //     updateOrderApi({quantity: quantity}, `?_id=${order._id}`)
  //     .then(data => {console.log(data.message); setDisableInput(false)})
  //     .catch(e => console.log(e.message)), 1000)
  // }, [quantity])
  // console.log(order);
  console.log('order:', order);

  const deleteOrder = () => {
    const deleteOrderTrigger = () => {
      Promise.all([
        deleteOrderApi({_id: order._id, status: 'pending'}).catch(e=> console.log(e)),
        updateInventoryApi({sku: order?.inventory.sku, quantity: parseInt(order?.inventory.quantity) + parseInt(quantity)}).catch(e=> console.log(e))
      ])
      let temp = orders.filter(el => order._id !== el._id)
      setOrders(temp)
    }
    debounce(deleteOrderTrigger, 1000)
  }

  return (
    <div className='cartItem_detail_box'>
      <img src={order?.inventory.image} alt="product" />
      <div className='cartItem_detail'>
        <div className='cartItem_detail_row_1'>
          <div>{order?.inventory?.product.name}</div>
          <small>sku: {order?.inventory?.sku}</small><br/>
          <small>Giao tới: {addCommaBetweenCharacter(Object.values(order?.shippingAddress||{}))}</small>
        </div>
        <div className='cartItem_detail_row_2'>
          <div>
            Loại: <span style={{color: '#ADADAD', fontWeight: '500'}}>{addCommaBetweenCharacter(Object.values(order?.inventory?.attribute))}</span>
          </div>
          <div style={{marginLeft:'10px'}}>
            {priceValidate(order?.inventory.price)} <sup><u>đ</u></sup>
          </div>
          <div>
            <input type="number" style={{marginRight: '5px'}} value={quantity} min={1} max={parseInt(order?.inventory.quantity) + parseInt(order?.quantity)} disabled /> 
            <span style={{fontSize: '12px', fontWeight: '500'}}>còn {order?.inventory?.quantity} sản phẩm</span>
          </div>
          <div>
            {priceValidate(order?.inventory?.price*quantity)}<sup><u>đ</u></sup>
          </div>
        </div>
        <div className='action'>
          <div onClick={deleteOrder} style={{cursor: 'pointer'}}>Xóa</div>
        </div>
      </div>
    </div>
  )
}

export default CartItemBox