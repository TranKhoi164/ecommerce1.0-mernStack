import React from 'react'
import { useState } from 'react'
import { registerApi } from '../../../api/accountApi'
import { SuccessSnackbar, ErrorSnackbar } from '../../utils/snackbar/Snackbar'
import { validateRetypePassword, validateEmail, validatePassword } from '../../utils/validate/validateAccount'
import useDebounce from '../../utils/UserDebounce'

function RegisterBox({authClasses}) {
  const [accountRegister, setAccountRegister] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  })
  const [openSnack, setOpenSnack] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccessRequest, setIsSuccessRequest] = useState(true)
  const debounce = useDebounce()

  const registerRequest = async () => {
    try {
      const register_msg = await registerApi(accountRegister.email, accountRegister.password)
      setMessage(register_msg.message)
    } catch(e) {
      setIsSuccessRequest(false)
      setMessage(e.message)
    }
    setOpenSnack(true) 
  }
  
  //console.log();
  const handleSubmit = async (e) => {
    e.preventDefault()
    if ((validateEmail(accountRegister.email) && validatePassword(accountRegister.password)) && validateRetypePassword(accountRegister.password, accountRegister.passwordCheck)) {
      debounce(registerRequest, 1000)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setAccountRegister({
      ...accountRegister,
      [name]: value
    })
  }

  return (
    <div className={authClasses.login_register_container}>
      <h3>MỚI ĐẾN SHINEE</h3>
      <form onSubmit={handleSubmit} className={authClasses.login_register_box}>
        <label htmlFor="email" className={authClasses.input_block}>Email</label>
        <input type="email" autoComplete='new-password' id='email' name='email' className={authClasses.form_shape} onChange={handleChange} />
        {
          (!validateEmail(accountRegister.email) && accountRegister.email.length > 0)
            && <div className={authClasses.input_err}>Địa chỉ email không hợp lệ</div>
        }
        
        <label htmlFor="password" className={authClasses.input_block}>Mật Khẩu</label>
        <input type="password" autoComplete='new-password' id='password' name='password' className={authClasses.form_shape} onChange={handleChange} />
        {
          (!validatePassword(accountRegister.password) && accountRegister.password.length > 0)
            && <div className={authClasses.input_err}>Mật khẩu phải có ít nhất 8 kí tự, một chữ cái và một số</div>
        }
        
        <label htmlFor="password" className={authClasses.input_block}>Xác Nhận Mật Khẩu</label>
        <input type="password" autoComplete='new-password' id='password' name='passwordCheck' className={authClasses.form_shape} onChange={handleChange} />
        {
          (!validateRetypePassword(accountRegister.password, accountRegister.passwordCheck) && accountRegister.passwordCheck.length > 0)
            && <div className={authClasses.input_err}>Mật khẩu của bạn không khớp, vui lòng thử lại</div>
        }
        <button className={authClasses.form_shape + ' ' + authClasses.input_block + ' ' + authClasses.submit_btn}>ĐĂNG KÝ</button>
        
        {isSuccessRequest && <SuccessSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />}
        {!isSuccessRequest && <ErrorSnackbar message={message} openSnack={openSnack} setOpenSnack={setOpenSnack} />}
        
      </form>
    </div>  
  )
}

export default RegisterBox