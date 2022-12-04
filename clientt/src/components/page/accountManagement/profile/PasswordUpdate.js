import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import { validatePassword, validateRetypePassword } from '../../../utils/validate/validateAccount';
import { AccountJwtApi } from '../../../../api/accountApi';
import UserDebounce from '../../../utils/UserDebounce';
import { ErrorSnackbar, SuccessSnackbar } from '../../../utils/snackbar/Snackbar';

function PasswordUpdate({accountData, classes}) {
  const { updatePasswordApi } = AccountJwtApi()
  const [passwordUpdate, setPasswordUpdate] = useState({
    password: '',
    newPassword: '',
    retypePassword: '',
  })
  const debounce = UserDebounce()
  const [message, setMessage] = useState('')
  const [successRequest, setSuccessRequest] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setPasswordUpdate({
      ...passwordUpdate,
      [name]: value
    })
  }
  
  const updatePasswordRequest = async (e) => {
    try {
      const updatePasswordMessage = await updatePasswordApi({password: passwordUpdate.password, newPassword: passwordUpdate.newPassword})
      setMessage(updatePasswordMessage.message);
      setOpenSnack(true)
      setSuccessRequest(true)
    } catch (e) {
      setSuccessRequest(false)
      setMessage(e.message)
      setOpenSnack(true)
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validatePassword(passwordUpdate.newPassword) && !validateRetypePassword(passwordUpdate.newPassword, passwordUpdate.retypePassword)) {
      return
    }
    debounce(updatePasswordRequest, 1000)
  }

  return (
    <div className={classes.profile_container}>
      <div className='header_box'>
        <div className='header'>Đổi mật khẩu</div>
        Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu cho người khác 
      </div>
      <div className='update_box'>
        <div className='update_infor'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <label htmlFor="password">Mật khẩu hiện tại</label>
              <div className='row_input'>
                <input onChange={handleChange} type="password" id='password' name='password' />
              </div>
            </div>
            <div className='row'>
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <div className='row_input'>
                <input onChange={handleChange} type="password" id='newPassword' name='newPassword' />
                {
                  (!validatePassword(passwordUpdate.newPassword) && passwordUpdate.newPassword.length > 0) &&
                  <div className={classes.input_err}>
                    Mật khẩu phải chứa ít nhất 8 ký tự, một số và một chữ cái
                  </div>
                }
              </div>
            </div>
            <div className='row'>
              <label htmlFor='retype_password'>Nhập lại mật khẩu</label>
              <div className='row_input'>
                <input type="password" id='retype_password' name='retypePassword' onChange={handleChange} />
                {
                  (!validateRetypePassword(passwordUpdate.newPassword, passwordUpdate.retypePassword) && passwordUpdate.retypePassword.length > 0) &&
                  <div className={classes.input_err}>
                    Mật khẩu không khớp
                  </div>
                }
              </div>
            </div>
            <div className='row'>
              <label style={{color: 'transparent'}}>lmao</label>
              <Button variant='outlined' type='submit'>Xác nhận</Button>
            </div>
          </form>
        </div>
      </div>
      {successRequest && <SuccessSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />}
      {!successRequest && <ErrorSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />}
    </div>
  )
}

export default PasswordUpdate