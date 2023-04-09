import {makeStyles} from '@material-ui/styles'

const checkoutStyle = makeStyles((theme) => ({
  checkoutPage_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .selectPayment_container': {
      display: 'flex',
      width: '80%',
      justifyContent: 'space-between',
      marginTop: '70px',
      fontSize: '18px',
      '& select': {
        fontSize: '16px',
        border: 'none'
      }
    },
    '& .purchaseBox_container': {
      marginTop: '40px',
      width: '80%',
      position: 'relative',
      '& .purchaseBox': {
        position: 'absolute',
        color: theme.palette.tertiary.main,
        right: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .action': {
          width: '170px',
          borderRadius: '3px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '15px',
          cursor: 'pointer',
          marginTop: '30px',
          background: theme.palette.secondary.main,
        }
      }
    }
  },
  orderList_container: {
    width: '80%',
    '& .field_name': {
      marginBottom: '30px',
      color: '#A4A3A3',
    },
    '& .table_row': {
      display: 'grid',
      gridTemplateColumns: '5% 27% 15% 25% 10% 10% 10%',
      '& img': {width: '70%'},
      '& div': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    '& .checkoutItem_container': {
      marginTop: '30px'
    },
  }
}))

export default checkoutStyle