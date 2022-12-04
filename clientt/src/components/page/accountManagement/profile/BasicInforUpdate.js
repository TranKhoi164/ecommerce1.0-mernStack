import React, {useState} from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';
import { validateUsername } from '../../../utils/validate/validateAccount';
import { AccountJwtApi } from '../../../../api/accountApi';
import { SuccessSnackbar } from '../../../utils/snackbar/Snackbar';
import UserDebounce from '../../../utils/UserDebounce';

function BasicInforUpdate({accountData, classes}) {
  const [accountUpdate, setAccountUpdate] = useState({
    username: accountData?.username,
    fullName: accountData?.fullName,
    gender: accountData?.gender || 'nam',
    dateOfBirth: accountData?.dateOfBirth,
    avatar: accountData?.avatar,
  })
  const debounce = UserDebounce()
  const [resMessage, setResMessage] = useState('')
  const [openSnack, setOpenSnack] = useState(false)
  const { getAccountInfor, updateBasicAccountApi } = AccountJwtApi()

  const handleChange = (e) => {
    const {name, value} = e.target
    setAccountUpdate({
      ...accountUpdate,
      [name]: value
    })
  }

  const updateAccountData = async (data) => {
    try {
      const updateDataMessage = await updateBasicAccountApi(accountUpdate)
      setOpenSnack(true)
      setResMessage(updateDataMessage.message);
      await getAccountInfor()
    } catch (e) {
      setOpenSnack(true)
      setResMessage(e.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateUsername(accountUpdate.username)) {
      return
    }
    debounce(updateAccountData, 1000)
  }

  return (
    <div className={classes.profile_container}>
      <div className='header_box'>
        <div className='header'>Hồ sơ của tôi</div>
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </div>
      <div className='update_box'>
        <div className='update_infor'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <label htmlFor="username">Tên đăng nhập</label>
              <div className='row_input'>
                <input onChange={handleChange} type="text" id='username' name='username' defaultValue={accountData?.username} />
                {
                  (!validateUsername(accountUpdate.username) && accountUpdate.username.length > 0) && 
                  <div className={classes.input_err}>
                    Tên đăng nhập không chứa dấu cách, không quá 20 ký tự
                  </div>
                } 
              </div>
            </div>

            <div className='row'>
              <label htmlFor="fullName">Tên đầy đủ</label>
              <div className='row_input'>
              <input onChange={handleChange} type="text" id='fullName' name='fullName' defaultValue={accountData?.fullName} />
              </div>
            </div>

            <div className='row'>
              <label>Giới tính</label>
              <RadioGroup row aria-label="gender" name="gender" value={accountUpdate?.gender} onChange={handleChange}>
                <FormControlLabel value="nam" control={<Radio />} label="Nam" className='check' />
                <FormControlLabel value="nữ" control={<Radio />} label="Nữ" className='check' />
                <FormControlLabel value="khác" control={<Radio />} label="Khác" className='check' />
              </RadioGroup>
            </div>

            <div className='row'>
              <label htmlFor='dateOfBirth'>Ngày sinh</label>
              <input type="date" id='dateOfBirth' name='dateOfBirth' defaultValue={accountData?.dateOfBirth} onChange={handleChange} />
            </div>

            <div className='row'>
              <label style={{color: 'transparent'}}>lmao</label>
              <Button variant='outlined' type='submit'>Lưu</Button>
            </div>
          </form>
        </div>

        <div className='update_avatar'>
          <img src={accountUpdate.avatar} alt="avatar" />
          <button>Chọn ảnh</button>
        </div>
      </div>

      <SuccessSnackbar message={resMessage} openSnack={openSnack} setOpenSnack={setOpenSnack} />
    </div>
  )
}

export default BasicInforUpdate