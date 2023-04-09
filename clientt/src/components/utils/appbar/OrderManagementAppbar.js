import React from 'react'

import globalStyle from '../../../styles/global.style'

function OrderManagementAppbar({currentTab, setCurrentTab}) {
  const classes = globalStyle()

  return (
    <div className={classes.orderManagement_appbar}>
      <div className={currentTab==='beingShipped'?'selected tab_item':'tab_item'} onClick={()=>setCurrentTab('beingShipped')}>Vận chuyển</div>
      <div className={currentTab==='accomplished'?'selected tab_item':'tab_item'} onClick={()=>setCurrentTab('accomplished')}>Hoàn thành</div>
      <div className={currentTab==='cancelled'?'selected tab_item':'tab_item'} onClick={()=>setCurrentTab('cancelled')}>Đã huỷ</div>
    </div>
  )
}

export default OrderManagementAppbar