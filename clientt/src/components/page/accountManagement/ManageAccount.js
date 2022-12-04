import React from 'react'
import { useParams } from 'react-router-dom'
import manageAccountStyle from '../../../styles/manageAccount.style'
import ManageAccountSidebar from '../../sidebar/ManageAccountSidebar'
import { useSelector } from 'react-redux'
import { selectAccount } from '../../../features/account/accountSlice'
import { Link } from 'react-router-dom'
import AccountUpdate from './profile/AccountUpdate'
import Purchase from './Purchase'
import Notification from './Notification'

function ManageAccount() {
  const {sub_page} = useParams()
  const accountData = useSelector(selectAccount)
  const classes = manageAccountStyle()

  return (
    <div className={classes.container}>
      <ManageAccountSidebar classes={classes} accountData={accountData} />
      <div className={classes.main_page}>
        {sub_page === 'profile' && <AccountUpdate accountData={accountData} classes={classes} />}
        {sub_page === 'purchase' && <Purchase accountData={accountData} classes={classes} />}
        {sub_page === 'notification' && <Notification accountData={accountData} classes={classes}  />}
      </div>
    </div>
  )
}

export default ManageAccount