import React from 'react'
import { useParams } from 'react-router-dom'
import manageAccountStyle from '../../../styles/manageAccount.style'
import ManageAccountSidebar from '../../sidebar/ManageAccountSidebar'
import { useSelector } from 'react-redux'
import { selectAccount } from '../../../features/account/accountSlice'
import { Link } from 'react-router-dom'
import AccountUpdate from './profile/AccountUpdate'
import Purchase from './purchase/Purchase'
import Notification from './notification/Notification'
import PageManagementContainer from '../adminResources/page/PageManagementContainer'
import ProductManagementContainer from '../adminResources/productManagement/ProductManagementContainer'
import OrderPage from '../order/OrderPage'
import OrderManagement from '../adminResources/OrderManagement/OrderManagement'

function ManageAccount({pages}) {
  const {sub_page, order_id} = useParams()
  const accountData = useSelector(selectAccount)
  const classes = manageAccountStyle()

  return (
    <div className={classes.container}>
      <ManageAccountSidebar classes={classes} accountData={accountData} />
      <div className={classes.main_page}>
        {sub_page === 'profile' && <AccountUpdate accountData={accountData} classes={classes} />}
        {sub_page === 'purchase' && <Purchase accountData={accountData} classes={classes} />}
        {sub_page === 'notification' && <Notification accountData={accountData} classes={classes}  />}
        {sub_page === 'page_management' && <PageManagementContainer accountData={accountData} classes={classes} />}
        {sub_page === 'product_management' && <ProductManagementContainer pages={pages} accountData={accountData} classes={classes} />}
        {sub_page === 'order_management' && <OrderManagement classes={classes} />}
        {order_id && <OrderPage orderId={order_id} classes={classes} />}
      </div>
    </div>
  )
}

export default ManageAccount