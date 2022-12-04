import React, {useEffect, useState} from 'react'
import activeAccStyle from '../../../styles/activeAcc.style'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import {useParams} from 'react-router-dom'
import { activeAccountApi } from '../../../api/accountApi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function ActiveAccount() {
  const activeClasses = activeAccStyle()
  const {active_token} = useParams()
  const [isSuccessRequset, setIsSuccessRequset] = useState(true)
  const [message, setMessage] = useState('')

  const activeAccount = async () => {
    try {
      const activeAccountData = await activeAccountApi(active_token)
      setMessage(activeAccountData.message)
    } catch (e) {
      setIsSuccessRequset(false)
      let mess = e.message + ', vui lòng đăng ký lại'
      setMessage(mess)
    }
  }

  console.log(message)

  useEffect(() => {
    activeAccount()
  }, [])

  return (
    <div className={activeClasses.container}>
      <div className={activeClasses.notification_box}>
        {isSuccessRequset && <CheckCircleOutlinedIcon className={activeClasses.icon}/>}
        {!isSuccessRequset && <HighlightOffIcon style={{color: 'red'}} className={activeClasses.icon} />}
        <div className={activeClasses.notification}>
          {message}
        </div>
      </div>
    </div>
  )
}

export default ActiveAccount