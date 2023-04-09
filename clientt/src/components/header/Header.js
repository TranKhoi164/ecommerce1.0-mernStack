import React, { useEffect } from 'react'
import headerStyle from '../../styles/header/header.style';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import HeadsetMicOutlinedIcon from '@material-ui/icons/HeadsetMicOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { selectAccount } from '../../features/account/accountSlice';
import { useSelector } from 'react-redux';



function Header({pages}) {
  const accountData = useSelector(selectAccount)
  const headerClasses = headerStyle()
  const [page, setPage] = useState({})
  const [subPages, setSubPages] = useState([])

  useEffect(() => {
    setPage({_id: pages[0]?._id, name: pages[0]?.name, slug: pages[0]?.slug})
  }, [pages])
  

  useEffect(() => {
    const findPage = pages.find(el => el._id === page._id)
    setSubPages(findPage?.subPages)
  }, [page])
  

  return (
    <div>
      <div className={headerClasses.first_block}>
        <div className={headerClasses.page_navigations}>
          <ul className={headerClasses.list_row + ' ' + headerClasses.page_navigation_list}>
            {pages.map(page => {
              return <li onClick={() => setPage({_id: page?._id, name: page?.name, slug: page?.slug})}><Link to={`${page?.slug}/${page?.subPages[0].slug}`} state={{subPage: page?.subPages[0]}}>{page?.name}</Link></li>
            })}
          </ul>
        </div>
        
        <div className={headerClasses.logo}>
          <Link to='/' style={{color: 'black'}}>
            <h1>SHINEE</h1>
          </Link>
        </div>
        
        <div className={headerClasses.user_service}>
          <ul className={headerClasses.list_row + ' ' + headerClasses.user_service_list}>
            <Link to={Object.keys(accountData).length > 0 ? '/account/profile' :'/auth'}>
              <li><PersonOutlineIcon className={headerClasses.service_btn} /></li>
            </Link>
          </ul>
          <ul className={headerClasses.list_row + ' ' + headerClasses.user_service_list}>
            <Link to={Object.keys(accountData).length > 0 ? '/cart' :'/auth'}>
              <li><LocalMallOutlinedIcon className={headerClasses.service_btn} /></li>
            </Link>
          </ul>
        </div>
      </div>

      <div className={headerClasses.second_block}>
        <ul className={headerClasses.list_row + ' ' + headerClasses.sub_page_list}>
          {subPages?.map(subPage => {
            return <Link style={{color: '#333333'}} to={`${page?.slug}/${subPage?.slug}`} state={{subPage: subPage}}><li key={subPage?.name}>{subPage?.name}</li></Link>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Header