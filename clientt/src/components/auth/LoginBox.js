import React from 'react'
import { useState } from 'react'

function LoginBox({authClasses}) {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {

  }

  return (
    <div className={authClasses.login_register_container} style={{borderRight: '.1em solid #dedede'}}>
      <h3>ĐĂNG NHẬP</h3>
      <form onSubmit={handleSubmit} className={authClasses.login_register_box}>
        <label htmlFor="email" className={authClasses.input_block}>Email</label>
        <input type="email" id='email' className={authClasses.form_shape} />
        <label htmlFor="password" className={authClasses.input_block}>Mật Khẩu</label>
        <input type="password" id='password' className={authClasses.form_shape} />
        <button className={authClasses.form_shape + ' ' + authClasses.input_block + ' ' + authClasses.submit_btn}>ĐĂNG NHẬP</button>
      </form>
      <p className={authClasses.input_block}>Quên mật khẩu?</p>
    </div>  
  )
}

export default LoginBox