import { makeStyles } from "@material-ui/styles";

const manageAccountStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    padding: '30px 70px'
  },

  page_list: {
    marginTop: '20px',
    '& .item': {
      cursor: 'pointer',
      color: 'black',
      padding: '10px 0',
      display: 'flex',
      alignItem: 'center',
      '& .icon': {
        marginTop: '-1px',
        fontSize: '25px',
        marginRight: '10px'
      }
    },
  },

  side_bar: {
    width: '17%',
    marginRight: '20px',
    marginTop: '20px'
  },

  first_block: {
    display: 'flex',
    alignItem: 'center',
    paddingBottom: '10px',
    borderBottom: '1px solid #f2f2f2',
    '& img': {
      height: '50px'
    },
    '& div': {
      marginLeft: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
  },

  main_page: {
    width: '80%',
  },

  profile_container: {
    padding: '20px 30px',
    background: 'white',
    marginBottom: '30px',
    boxShadow: 'rgba(0, 0, 0, 0.09) 0px 3px 12px',
    '& .header_box': {
      paddingBottom: '20px',
      borderBottom: '1px solid #e6e3e3',
      '& .header': {
        fontSize: '22px',
      }
    },

    '& .update_box': {
      display: 'flex',
      justifyContent: 'space_between',
      '& .update_infor': {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        '& form': {
          width: '90%',
          '& .row': {
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-arround',
            alignItems: 'center',
            '& label': {
              width: '20%',
              color: theme.palette.tertiary.main,
            },
            '& .row_input': {
              width: '70%',
              '& input': {
                width: '100%',
                height: '35px',
                border: '1px solid #dbdbd9'
              },
            },
            '& .check': {
              marginRight: '30px'
            }
          }
        }
      }
    },

    '& .update_avatar': {
      display: 'flex',
      flexDirection: 'column',
      alignItem: 'center',
      justifyContent: 'center',
      '& img': {
        height: '110px',
      },
      '& button': {
        marginTop: '20px',
        padding: '10px',
        background: 'none',
        border: 'solid 1px #d4cfcf',
        cursor: 'pointer',
      },
    },
  },
  input_err: {
    color: '#ff4d4d',
    fontSize: 'small',
  },
  select_location_box: {
    width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    '& select': {
      width: '32%',
      height: '40px',
      border: '1px solid #dbdbd9'
    }
  },
  input_address: {
    marginTop: '20px',
    width: '400px',
    height: '55px',
    border: '1px solid #dbdbd9',
    fontSize: 'normal'
  },
  address_box: {
    marginTop: '20px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    fontSize: '17px',
    color: theme.palette.tertiary.main,
    justifyContent: 'space-between',
    '& .display_address': {
      marginLeft: '20px',
    },
    '& .action_button': { 
      display: 'flex',
      fontSize: '14px',
      cursor: 'pointer',
      marginRight: '20px',
      '& .action': {
        marginLeft: '10px',
      }
    }
  }
}))

export default manageAccountStyle