import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { selectAccount } from '../features/account/accountSlice'

import Notfound from './page/notfound/Notfound'
import Auth from './page/auth/Auth'
import ActiveAccount from './page/auth/ActiveAccount'
import ManageAccount from './page/accountManagement/ManageAccount'
import ProductPage from './page/product/ProductPage'
import ProductDetail from './page/product/ProductDetail'
import CartPage from './page/cart/CartPage'
import Checkout from './page/checkout/CheckoutPage'
import Purchase from './page/accountManagement/purchase/Purchase'
import ResetPasswordToken from './page/auth/ResetPasswordToken'

// function Redirect({pages}) {
//   const navigate = useNavigate()
//   useEffect(() => {
//     console.log(pages);
//     if (pages[0] !== null) {
//       navigate(`${pages[0]?.slug}/${pages[0]?.subPages[0].slug}`)
//     }
//     //navigate(`${pages[0]?.slug}/${pages[0]?.subPages[0].slug}`)
//   }, [pages])
//   return <></>
// }

function Router({pages, products, setProducts}) {
  const accountData = useSelector(selectAccount)

  console.log(pages);

  return (
    <div>
      <Routes>
        <Route path='/auth' element={Object.keys(accountData).length > 0 ? <Notfound /> : <Auth />} />
        <Route path='/active/:active_token' element={Object.keys(accountData).length === 0?<ActiveAccount />:<Notfound />} />
        <Route path='/account/:sub_page' element={Object.keys(accountData).length > 0?<ManageAccount />:<Notfound />} />
        <Route path='/account/purchase/order/:order_id' element={Object.keys(accountData).length > 0?<ManageAccount />:<Notfound />} />
        <Route path='/admin/:sub_page' element={Object.keys(accountData).length>0&&accountData.role===1?<ManageAccount pages={pages} />:<Notfound />} />
        <Route path='/:page_slug/:subPage_slug' element={<ProductPage />} />
        <Route path='/:product_sku' element={<ProductDetail />} />
        <Route path='/reset_password/:active_token' element={<ResetPasswordToken />} />
        {pages.length !== 0 && <Route path='/' element={<Navigate to={`${pages[0]?.slug}/${pages[0]?.subPages[0]?.slug}`} />} />}
        <Route path='/cart' element={Object.keys(accountData).length > 0 ? <CartPage /> : <Auth />} /> 
        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default Router