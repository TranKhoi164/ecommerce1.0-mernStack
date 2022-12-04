import {makeStyles} from '@material-ui/styles'

const activeAccStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  notification_box: {
    background: 'white',
    margin: '100px 0 100px 0',
    width: '400px',
    height: '300px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  notification: {
    color: theme.palette.tertiary.main,
    fontSize: '20px',
    width: '80%',
    textAlign: 'center',
  },
  icon: {
    color: 'green',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '10px'
  }
}))

export default activeAccStyle