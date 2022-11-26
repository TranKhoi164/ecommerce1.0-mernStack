import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Auth from './auth/Auth'

function Router() {
  return (
    <div>
      <Routes>
        <Route path='/user/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default Router