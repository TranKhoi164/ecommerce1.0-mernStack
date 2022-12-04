import React from 'react'
import headerStyle from '../../styles/header/header.style';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import HeadsetMicOutlinedIcon from '@material-ui/icons/HeadsetMicOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { selectAccount } from '../../features/account/accountSlice';
import { useSelector } from 'react-redux';



function Header() {
  const accountData = useSelector(selectAccount)
  const headerClasses = headerStyle()

  return (
    <div>
      <div className={headerClasses.first_block}>
        <div className={headerClasses.page_navigations}>
          <ul className={headerClasses.list_row + ' ' + headerClasses.page_navigation_list}>
            <li><a href="#">nam</a></li>
            <li><a href="#">nữ</a></li>
            <li><a href="#">trẻ em</a></li>
            <li><a href="#">plus size</a></li>
            <li><a href="#">đời sống</a></li>
          </ul>
        </div>
        
        <div className={headerClasses.logo}>
          <h1>SHINEE</h1>
        </div>
        
        <div className={headerClasses.user_service}>
          <ul className={headerClasses.list_row + ' ' + headerClasses.user_service_list}>
            <Link to={Object.keys(accountData).length > 0 ? '/account/profile' :'/auth'}>
              <li><PersonOutlineIcon className={headerClasses.service_btn} /></li>
            </Link>
            <Link to='/account/notification'>
              <li>
                <NotificationsNoneOutlinedIcon className={headerClasses.service_btn} /> 
                <span className={headerClasses.element_number}>1</span>
              </li>
            </Link>
            <Link to='/cart'>
              <li>
                <LocalMallOutlinedIcon className={headerClasses.service_btn} /> 
                <span className={headerClasses.element_number}>0</span>
              </li>
            </Link>
            <Link to='/help'>
              <li><HeadsetMicOutlinedIcon className={headerClasses.service_btn} /></li>
            </Link>
          </ul>
        </div>
      </div>

      <div className={headerClasses.second_block}>
        <ul className={headerClasses.list_row + ' ' + headerClasses.sub_page_list}>
          <li>Hàng mới</li>
          <li>sale</li>
          <li>trang phục</li>
          <li>đồ lót & đồ mặc nhà</li>
          <li>đồ đi biển</li>
          <li>giày dép & phụ kiện</li>
        </ul>
      </div>
    </div>
  )
}

export default Header