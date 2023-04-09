import React, {useState} from 'react'
import { AccountJwtApi } from '../../../../api/accountApi'
import { ErrorSnackbar, SuccessSnackbar } from '../../../utils/snackbar/Snackbar'
import UserDebounce from '../../../utils/UserDebounce'

function AvatarUpdate({accountData, classes}) {
  const {updateAvatarApi, getAccountInfor} = AccountJwtApi()
  const debounce = UserDebounce()
  const [resMessage, setResMessage] = useState('')
  const [openSnack, setOpenSnack] = useState(false)
  const [isSuccessRequest, setIsSuccessRequest] = useState(false)

  const requestUpdateAvatar = async (formData) => {
    try {
      const avatarMessage = await updateAvatarApi(formData)
      setResMessage(avatarMessage.message)
      setIsSuccessRequest(true)
      setOpenSnack(true)
      await getAccountInfor()
    } catch(e) {
      setResMessage(e.message)
      setIsSuccessRequest(false)
      setOpenSnack(true)
    }
  }

  const updateAvatar = async (e) => {
    const file = e.target.files[0]

    let formData = new FormData()
    formData.append('file', file)

    debounce(() => requestUpdateAvatar(formData), 1000)
  } 

  return (
    <div className={classes.update_image}>
      <img src={accountData.avatar} className={classes.rounded} alt="avatar" />
      <label htmlFor='file_up'>Chọn ảnh</label>
      <input
        style={{ display: "none" }}
        accept="image/png, image/jpeg"
        onChange={updateAvatar}
        className={classes.fileUp}
        type="file"
        name="file"
        id="file_up"
      />

      {isSuccessRequest ? 
        <SuccessSnackbar message={resMessage} openSnack={openSnack} setOpenSnack={setOpenSnack} />
      : <ErrorSnackbar message={resMessage} openSnack={openSnack} setOpenSnack={setOpenSnack} />   }
    </div>
  )
}

export default AvatarUpdate