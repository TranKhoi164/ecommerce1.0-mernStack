import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginApi } from '../../../api/accountApi'
import { updateAccount } from '../../../features/account/accountSlice'
import UserDebounce from '../../utils/UserDebounce'
import { validatePassword, validateEmail } from '../../utils/stringFunc/validateAccount'
import {  ErrorSnackbar } from '../../utils/snackbar/Snackbar'
import { useNavigate } from 'react-router-dom'

function LoginBox({authClasses}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const debounce = UserDebounce()
  const [isSuccessRequest, setIsSuccessRequest] = useState(true)
  const [openSnack, setOpenSnack] = useState(false)
  const [message, setMessage] = useState('')
  const [accountLogin, setAccountLogin] = useState({
    email: '',
    password: '',
  })

  const loginRequest = async () => {
    try {
      const accountData = await loginApi(accountLogin.email, accountLogin.password)
      dispatch(updateAccount(accountData.account))
      navigate('/')
    } catch (e) {
      setIsSuccessRequest(false)
      setMessage(e.message)
    }
    setOpenSnack(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ((validateEmail(accountLogin.email) && validatePassword(accountLogin.password))) {
      debounce(loginRequest, 1000)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setAccountLogin({
      ...accountLogin,
      [name]: value
    })
  }

  return (
    <div className={authClasses.login_register_container} style={{borderRight: '.1em solid #dedede'}}>
      <h3>ĐĂNG NHẬP</h3>
      <form onSubmit={handleSubmit} className={authClasses.login_register_box}>
        <label htmlFor="email" className={authClasses.input_block}>Email</label>
        <input type="email" autoComplete='new-password' id='email' name='email'  onChange={handleChange} className={authClasses.form_shape} />
        {
          (!validateEmail(accountLogin.email) && accountLogin.email.length > 0)
            && <div className={authClasses.input_err}>Địa chỉ email không hợp lệ</div>
        }

        <label htmlFor="password" className={authClasses.input_block}>Mật Khẩu</label>
        <input type="password" autoComplete="new-password"  id='password'  name='password' onChange={handleChange} className={authClasses.form_shape} />
        {
          (!validatePassword(accountLogin.password) && accountLogin.password.length > 0)
            && <div className={authClasses.input_err}>Mật khẩu phải có ít nhất 8 kí tự, một chữ cái và một số</div>
        }
        <input autoComplete="on" style={{ display: 'none' }} id="fake-hidden-input-to-stop-google-address-lookup"></input>

        <button className={authClasses.form_shape + ' ' + authClasses.input_block + ' ' + authClasses.submit_btn}>ĐĂNG NHẬP</button>
      </form>

      {!isSuccessRequest && <ErrorSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />}
      <p className={authClasses.input_block}>Quên mật khẩu?</p>
    </div>  
  )
}

export default LoginBox