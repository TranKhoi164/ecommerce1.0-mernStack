import React from 'react'

import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { selectAccount } from '../features/account/accountSlice'

import Notfound from './page/notfound/Notfound'
import Auth from './page/auth/Auth'
import ActiveAccount from './page/auth/ActiveAccount'
import ManageAccount from './page/accountManagement/ManageAccount'

function Router() {
  const accountData = useSelector(selectAccount)

  console.log(accountData)

  return (
    <div>
      <Routes>
        <Route path='/auth' element={Object.keys(accountData).length > 0 ? <Notfound /> : <Auth />} />
        <Route path='/active/:active_token' element={<ActiveAccount />} />
        <Route path='/account/:sub_page' element={<ManageAccount />} />
      </Routes>
    </div>
  )
}

export default Router