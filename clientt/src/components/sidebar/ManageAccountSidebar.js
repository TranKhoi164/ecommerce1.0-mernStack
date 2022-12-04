import React from "react";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import ListAltIcon from '@material-ui/icons/ListAlt';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const cutString = (str) => {
  // {product.title.length > 80
//   ? product.title.substring(0, 70) + "..."
//   : product.title}
  return String(str).length > 15 ? str.substring(0, 15)  + '...' : str
}


function ManageAccountSidebar({ classes, accountData }) {
  return (
    <div className={classes.side_bar}>
      <div className={classes.first_block}>
        <img src={accountData.avatar} alt="avatar" />
        <div className={classes.sub_block}>
          <span style={{ fontWeight: "bold" }}>
            {cutString(accountData.username) || cutString(accountData._id)}
          </span>
          <span style={{ color: "#868786" }}><EditIcon style={{fontSize: '17px', marginBottom: '-3px'}} />Sửa Hồ Sơ</span>
        </div>
      </div>

      <div className={classes.page_list}>
        <Link to={'/account/profile'}>
          <div className="item">
            <PermIdentityOutlinedIcon style={{color: '#333333'}} className="icon" /> 
            <div>Thông tin tài khoản</div>
          </div>
        </Link>
        <Link to='/account/purchase'>
          <div className="item">
            <ListAltIcon style={{color: '#333333'}} className="icon"/> 
            <div>Đơn mua</div>
          </div>
        </Link>
        <Link to='/account/notification'>
          <div className="item">
            <NotificationsNoneOutlinedIcon style={{color: '#333333'}} className="icon" /> 
            <div>Thông báo</div>
          </div>
        </Link>
        <div className="item">
          <ExitToAppOutlinedIcon style={{color: '#333333'}} className="icon" /> 
          <div>Đăng xuất</div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccountSidebar;
