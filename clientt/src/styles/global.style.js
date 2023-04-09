import {makeStyles} from '@material-ui/styles'

const globalStyle = makeStyles((theme) => ({
  orderManagement_appbar: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    borderBottom: '2px solid #DDDD',
    '& .tab_item': {
      display: 'flex',
      justifyContent: 'center',
      height: '35px',
      cursor: 'pointer',
    },
    '& .selected': {
      fontWeight: 'bold',
      borderBottom: '2px solid ' + theme.palette.secondary.main,
    },
  },
}))

export default globalStyle