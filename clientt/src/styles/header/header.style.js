import {makeStyles} from '@material-ui/styles'

const headerStyle = makeStyles((theme) => ({
  first_block: {
    height: '70px',
    display: 'flex',
  },
  page_navigations: {
    width: '45%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  list_row: {
    height: '70px',
    margin: '0',
    padding: '0',
    listStyleType: 'none',
    display: 'flex',
    fontSize: '18px',
    alignItems: 'center',
  },
  page_navigation_list: {
    '& li': {
      padding: '35px 10px 35px 10px',
      textTransform: 'uppercase',
      '& a': {
        color: theme.palette.tertiary.main,
        '&:hover': {
          color: 'black'
        }
      }
    }
  },
  logo: {
    width: '10%',
    letterSpacing: '4px',
    fontSize: '20px',
    position: 'relative',
    '& h1': {
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  },
  user_service: {
    width: '45%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  user_service_list: {
    '& li': {
      padding: '35px 5px 35px 10px',
      color: theme.palette.tertiary.main,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        color: 'black',
      },
    }
  },
  user_service_link: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.tertiary.main,
    '&:hover': {
      color: 'black',
    },
  },
  element_number: {
    marginLeft: '3px',
    fontSize: '15px',
    fontWeight: '550'
  },
  second_block: {
    height: '50px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  sub_page_list: {
    '& li': {
      fontSize: 'small',
      textTransform: 'uppercase',
      marginLeft: '20px',
      padding: '15px 0 14px 0',
      cursor: 'pointer',
      '&:hover': {
        borderBottom: '2px solid black',
      }
    }
  },
}))
//box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
export default headerStyle