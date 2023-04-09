import React, {useState, useEffect} from 'react'
import { OrderJwtApi } from '../../../api/orderApi'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import AssignmentReturnedOutlinedIcon from '@material-ui/icons/AssignmentReturnedOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import {addCommaBetweenCharacter, priceValidate} from '../../utils/stringFunc/manipulateString'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ProductRatingDialog from '../../utils/dialog/productRating/ProductRatingDialog';
import UpdateRatingDialog from '../../utils/dialog/productRating/UpdateRatingDialog';


const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <ListAltIcon />,
    2: <LocalAtmIcon />,
    3: <LocalShippingOutlinedIcon />,
    4: <AssignmentReturnedOutlinedIcon />,
    5: <StarBorderOutlinedIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return ['Đặt hàng', 'Xác Nhận Thông Tin Thanh Toán', 'Vận Chuyển', 'Đã Nhận Hàng', 'Đánh Giá'];
}






function OrderPage({orderId, classes}) {
  const { getOrderApi } = OrderJwtApi()

  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [updateRatingDialog, setUpdateRatingDialog] = useState(false)
  const [order, setOrder] = useState({})

  useEffect(() => {
    getOrderApi({order_id: orderId}).then(data => {
      setOrder(data.order)


      switch (data.order?.status) {
        case 'beingShipped':
          setActiveStep(2)
          break;
        case 'accomplished':
          setActiveStep(4)
          break;
        default:
          break;
      }
    })
  }, [])
  

  return (
    <div className={classes.order_page}>
      <div className="status">
        <div>MÃ ĐƠN HÀNG: {order?.inventory?.sku}</div>
        <div>
          {order?.status === 'beingShipped' && 'ĐANG VẬN CHUYỂN'}
          {order?.status === 'accomplished' && 'ĐÃ HOÀN THÀNH'}
          {order?.status === 'cancelled' && 'ĐÃ HỦY'}
        </div>
      </div>
      <div className='stepper'>
        {order.status === 'cancelled' 
          ? <Stepper alternativeLabel activeStep={5} connector={<ColorlibConnector />}>
            <Step key='Đặt hàng'>
              <StepLabel StepIconComponent={ColorlibStepIcon}>Đặt hàng</StepLabel>
            </Step>
            <Step key='hủy'>
              <StepLabel StepIconComponent={ColorlibStepIcon}>Hủy đơn </StepLabel>
            </Step>
          </Stepper>
          : <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>}
      </div>
      {order?.status === 'accomplished' 
        && <>
          {
            order.isRated === 0 ? 
            <div className='accomplished_action'>
              <Button onClick={()=>setOpenDialog(true)} variant='contained' color='secondary'>Đánh giá</Button>
            </div> :
            <div className='accomplished_action'>
              <Button onClick={()=>setUpdateRatingDialog(true)} variant='outlined' color='secondary'>Xem Đánh Giá</Button>
            </div>
          }
        </>
      }
      <div className='user_infor'>
        <div style={{fontSize: '20px', margin: '30px 0 20px 0', color: 'black'}}>Địa Chỉ Nhận Hàng</div>
        <div style={{color: 'black', fontSize: '15px', marginBottom:'10px'}}>{order?.account?.fullName}</div>
        <div>{order?.account?.email}</div>
        <div>{order?.shippingAddress?.address+','+order?.shippingAddress?.ward+','+order?.shippingAddress?.district+','+order?.shippingAddress?.province}</div>
      </div>
      <div className='order_box'>
        <Link to={ '/'+ order?.inventory?.product?.sku } style={{color:'black'}}>
          <div className='order_detail'>
            <div className='detail_1'>
              <img src={order?.inventory?.image} alt="product" />
              <div style={{marginLeft: '15px'}}>
                <div>{order?.inventory?.product?.name}</div>
                <div style={{color: '#9A9A9A'}}>Phân loại hàng: {addCommaBetweenCharacter(Object.values(order?.inventory?.attribute||{}))}</div>
                <div>X{order?.quantity}</div>
              </div>
            </div>
            <div>
              {priceValidate(order?.inventory?.price)}<sup><small><u>đ</u></small></sup> 
            </div>
          </div>
        </Link>
      </div>

      <table className='summary'>
      <tr style={{borderRight: 'none', borderLeft: 'none'}}>
          <td style={{width: '75%', borderLeft: 'none'}}>Thanh toán</td>
          <td style={{borderRight: 'none'}}>{order?.payment}</td>
        </tr>
        <tr style={{borderRight: 'none', borderLeft: 'none'}}>
          <td style={{width: '75%', borderLeft: 'none'}}>Tổng tiền hàng</td>
          <td style={{borderRight: 'none'}}>{priceValidate(order?.quantity*order?.inventory?.price)}<sup><small><u>đ</u></small></sup> </td>
        </tr>
        <tr style={{borderRight: 'none', borderLeft: 'none'}}>
          <td style={{width: '75%', borderLeft: 'none'}}>Thành tiền</td>
          <td style={{fontSize: '20px', color: 'black', borderRight: 'none'}}>{priceValidate(order?.quantity*order?.inventory?.price)}<sup><small><u>đ</u></small></sup> </td>
        </tr>
      </table>

      <ProductRatingDialog orderId={order?._id} setOrder={setOrder} inventoryId={order?.inventory?._id} productId={order?.inventory?.product?._id} accountId={order?.account?._id} openDialog={openDialog} setOpenDialog={setOpenDialog} classes={classes} />
      <UpdateRatingDialog orderId={order?._id} setOrder={setOrder} inventoryId={order?.inventory?._id} productId={order?.inventory?.product?._id} accountId={order?.account?._id} updateRatingDialog={updateRatingDialog} setUpdateRatingDialog={setUpdateRatingDialog} classes={classes}  />
    </div>
  )
}

export default OrderPage