import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import authStyle from '../../../styles/auth.style'
import { validatePassword } from '../../utils/stringFunc/validateAccount'
import { resetPasswordWithToken } from '../../../api/accountApi'
function ResetPasswortToken() {
  const authClasses = authStyle()
  const {active_token} = useParams()
  const [password, setPassword] = useState('')

  console.log(active_token);

  const handleChange = (e) => {
    const {value} = e.target
    setPassword(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    resetPasswordWithToken({active_token: active_token, password: password})
    .then(data => alert(data.message))
    .catch(data => alert(data.message))
  }

  return (
    <div className={authClasses.container}>
      <div>
        <div className={authClasses.reset_password}>
          <h3>Tạo mới mật khẩu</h3>
          <form onSubmit={handleSubmit} className={authClasses.login_register_box}>
            <label htmlFor="password" className={authClasses.input_block}>Mật Khẩu</label>
            <input type="password" autoComplete="new-password"  id='password'  name='password' onChange={handleChange} className={authClasses.form_shape} />
            {
              (!validatePassword(password) && password.length > 0)
                && <div className={authClasses.input_err}>Mật khẩu phải có ít nhất 8 kí tự, một chữ cái và một số</div>
            }
            <input autoComplete="on" style={{ display: 'none' }} id="fake-hidden-input-to-stop-google-address-lookup"></input>

            <button className={authClasses.form_shape + ' ' + authClasses.input_block + ' ' + authClasses.submit_btn}>Lưu mật khẩu</button>
          </form>
        </div>  
      </div>
    </div>
  )
}

export default ResetPasswortToken