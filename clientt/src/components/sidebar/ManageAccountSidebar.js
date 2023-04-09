import React from "react";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import { Link } from 'react-router-dom';
import { cutString } from "../utils/stringFunc/manipulateString";
import { AccountJwtApi } from "../../api/accountApi";
import { useDispatch } from "react-redux";
import { logoutAccount } from "../../features/account/accountSlice";
import { useNavigate } from "react-router-dom";



function ManageAccountSidebar({ classes, accountData }) {
  const {logoutApi} = AccountJwtApi()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      navigate('/')
      dispatch(logoutAccount())
      await logoutApi()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={classes.side_bar}>
      <div className={classes.first_block}>
        <img src={accountData.avatar} className={classes.rounded} alt="avatar" />
        <div className={classes.sub_block}>
          <span style={{ fontWeight: "bold" }}>
            {cutString(accountData.username) || cutString(accountData._id, 15)}
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
        {
          accountData.role === 1 &&
          <Link to='/admin/page_management'>
            <div className="item">
              <FormatListBulletedIcon style={{color: '#333333'}} className="icon"/> 
              <div>Quản lý trang</div>
            </div>
          </Link>
        }
        {
          accountData.role === 1 &&
          <Link to='/admin/product_management'>
            <div className="item">
              <ShoppingCartOutlinedIcon style={{color: '#333333'}} className="icon"/> 
              <div>Tạo sản phẩm</div>
            </div>
          </Link>
        }
        {
          accountData.role === 1 &&
          <Link to='/account/order_management'>
          <div className="item">
            <ReceiptOutlinedIcon style={{color: '#333333'}} className="icon" /> 
            <div>Quản lý đơn</div>
          </div>
        </Link>
        }
        <div className="item" onClick={logout}>
          <ExitToAppOutlinedIcon style={{color: '#333333'}} className="icon" /> 
          <div>Đăng xuất</div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccountSidebar;
