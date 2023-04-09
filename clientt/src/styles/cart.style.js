import {makeStyles} from '@material-ui/styles'

const cartStyle = makeStyles((theme) => ({
  cartPage_container: {
    display: 'flex',
    justifyContent: 'center',
    '& .emptyCard_container': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '17px',
      '& img': { width: '250px', },
      '& div': { marginTop: '20px' },
      '& button': { 
        width: '150px', 
        height: '30px', 
        marginTop: '15px', 
        background: theme.palette.secondary.main,
        color: 'white',
        cursor: 'pointer'
      },
    }
  },
  cart_container: {
    width: '85%',
    display: 'flex',
    justifyContent: 'space-between',
    '& .order_list': {
      width: '70%',
      '& .cartItem_box': {
        marginTop: '30px',
        display: 'flex',
        alignItems: 'center',
        height: '150px',
        width: '100%',
        '& .cartItem_detail_box': {
          height: '100%',
          marginLeft: '20px',
          display: 'flex',
          width: '100%',
          '& img': {
            height:'100%'
          },
          '& .cartItem_detail': {
            marginLeft: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '& small': {
              color: theme.palette.tertiary.main
            },
            '& .cartItem_detail_row_2': {
              display: 'grid',
              // justifyContent: 'space-between',
              fontWeight: '550',
              fontSize: '16px',
              gridTemplateColumns: '23% 25% 35% 10%',
              '& input': {
                width: '70px',
                height: '30px',
              }
            }
          },
          '& .action': {
            display: 'flex',
          },
        },
      }
    },
    '& .payment_box': {
      width: '25%',
      '& .total_price': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .display_price': {
          fontWeight: '550',
          fontSize: '19px',
        }
      },
      '& button': {
        width: '100%',
        marginTop: '20px',
        background: theme.palette.secondary.main,
        height: '40px',
        color: 'white',
        fontWeight: '550',
        cursor: 'pointer',
        border: 'none',
        '&:hover': {
          background: theme.palette.tertiary.main 
        }
      }

    }
  }, 

}))

export default cartStyle