import React from 'react'
import { useState } from 'react'
import { retypePassword, validateEmail, validatePassword } from '../utils/validate/validateAuth'

function RegisterBox({authClasses}) {
  const [userRegister, setUserRegister] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  })

  const handleSubmit = (e) => {
    //e.preventDefault()
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setUserRegister({
      ...userRegister,
      [name]: value
    })
  }
  console.log(process.env);

  console.log(validatePassword(userRegister.password))

  return (
    <div className={authClasses.login_register_container}>
      <h3>MỚI ĐẾN SHINEE</h3>
      <form onSubmit={handleSubmit} className={authClasses.login_register_box}>
        <label htmlFor="email" className={authClasses.input_block}>Email</label>
        <input type="email" id='email' name='email' className={authClasses.form_shape} onChange={handleChange} />
        {
          (!validateEmail(userRegister.email) && userRegister.email.length > 0)
            && <div className={authClasses.input_err}>Địa chỉ email không hợp lệ</div>
        }
        <label htmlFor="password" className={authClasses.input_block}>Mật Khẩu</label>
        <input type="password" id='password' name='password' className={authClasses.form_shape} onChange={handleChange} />
        {
          (!validatePassword(userRegister.password) && userRegister.password.length > 0)
            && <div className={authClasses.input_err}>Mật khẩu phải có ít nhất 8 kí tự, một chữ cái và một số</div>
        }
        <label htmlFor="password" className={authClasses.input_block}>Xác Nhận Mật Khẩu</label>
        <input type="password" id='password' name='passwordCheck' className={authClasses.form_shape} onChange={handleChange} />
        {
          (!retypePassword(userRegister.password, userRegister.passwordCheck) && userRegister.passwordCheck.length > 0)
            && <div className={authClasses.input_err}>Mật khẩu của bạn không khớp, vui lòng thử lại</div>
        }
        <button className={authClasses.form_shape + ' ' + authClasses.input_block + ' ' + authClasses.submit_btn}>ĐĂNG KÝ</button>
      </form>
    </div>  
  )
}

export default RegisterBox