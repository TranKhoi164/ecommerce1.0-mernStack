import {makeStyles} from '@material-ui/styles'

const authStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  auth_box: {
    marginTop: '50px',
    width: '70%',
    display: 'flex',
  },
  login_register_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  login_register_box: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  input_block: {
    marginTop: '15px',
    fontSize: 'small',
    color: theme.palette.tertiary.main
  },
  form_shape: {
    width: '100%',
    height: '40px'
  },
  submit_btn: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
  input_err: {
    color: '#ff4d4d',
    fontSize: 'small'
  }
}))

export default authStyle