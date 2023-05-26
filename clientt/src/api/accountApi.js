import axios from 'axios'
import AxiosJWT from '../AxiosJWT'
import { selectAccount, updateAccount } from '../features/account/accountSlice'
import { useSelector, useDispatch } from 'react-redux'

const {REACT_APP_SERVER_URL} = process.env

export const registerApi = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post(REACT_APP_SERVER_URL + '/account/register', {
      email: email,
      password: password
    }).then(register_msg => {
      resolve(register_msg.data)
    }).catch(e => {
      if (!e.response?.data?.message) {
        reject(e)
      }
      reject(e.response.data)
    })
  })
}

export const activeAccountApi =  (active_token) => {
  return new Promise((resolve, reject) => {
    axios.get(REACT_APP_SERVER_URL + '/account/active_account', {
      headers: {
        Authorization: active_token
      }
    }).then(activeAccount => {
      console.log(activeAccount)
      resolve(activeAccount.data)
    }).catch(e => {
      if (!e.response?.data?.message) {
        reject(e)
      }
      reject(e.response.data)
    })
  })
}

export const loginApi = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post(REACT_APP_SERVER_URL + '/account/login', {
      email: email,
      password: password,
    }).then(accountData => {
      resolve(accountData.data)
    }).catch(e => {
      console.log(e);
      if (!e.response?.data?.message) {
        reject(e)
      }
      reject(e.response.data)
    })
  })
}

export const sendResetPasswordEmailApi = (email) => {
  return new Promise((resolve, reject) => {
    axios.post(REACT_APP_SERVER_URL + '/account/reset_password_email', {
      email: email.email,
    }).then(data => {
      resolve(data.data)
    }).catch(e => {
      if (!e.response?.data?.message) {
        reject(e)
      }
      reject(e.response.data)
    })
  })
}

//token and newPassword
export const resetPasswordWithToken = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(REACT_APP_SERVER_URL + '/account/reset_password_token', {
      active_token: data.active_token,
      password: data.password
    }).then(data => {
      resolve(data.data)
    }).catch(e => {
      if (!e.response?.data?.message) {
        reject(e)
      }
      reject(e.response.data)
    })
  })
}



export const AccountJwtApi = () => {
  const accountData = useSelector(selectAccount)
  const dispatch = useDispatch()
  const axiosJwt = AxiosJWT()

  const getAccountInfor = () => {
    if (Object.keys(accountData).length > 0) {
      return new Promise((resolve, reject) => {
        axiosJwt.get(REACT_APP_SERVER_URL + '/account/information', 
          { headers: { Authorization: accountData.access_token} }
        ).then(getInforMessage => {
          console.log(getInforMessage)
          dispatch(updateAccount({...getInforMessage.data.account, access_token: accountData.access_token}))
          resolve(getInforMessage.data)
        }).catch(e => {
          console.log(e);
          if (!e.response?.data?.message) {
            reject(e)
          }
          reject(e.response.data)
        })
      })
    }
  }

  const updateBasicAccountApi = (updateAccount) => {
    if (Object.keys(accountData).length > 0) {
      return new Promise((resolve, reject) => {
        axiosJwt.patch(REACT_APP_SERVER_URL + '/account/update_basic', 
          { ...updateAccount },
          { headers: { Authorization: accountData.access_token} }
        ).then(updateMessage => {
          resolve(updateMessage.data)
        }).catch(e => {
          if (!e.response?.data?.message) {
            reject(e)
          }
          reject(e.response.data)
        })
      })
    }
  }

  const updatePasswordApi = (updatePassword) => {
    if (Object.keys(accountData).length > 0){
      return new Promise((resolve, reject) => {
        axiosJwt.patch(REACT_APP_SERVER_URL + '/account/update_password', 
          { ...updatePassword },
          { headers: { Authorization: accountData.access_token} }
        ).then(updateMessage => {
          resolve(updateMessage.data)
        }).catch(e => {
          if (!e.response?.data?.message) {
            reject(e)
          }
          reject(e.response.data)
        })
      })
    }
  }

  const updateAvatarApi = (formData) => {
    if (Object.keys(accountData).length > 0) {
      return new Promise((resolve, reject) => {
        axiosJwt.post(REACT_APP_SERVER_URL + '/upload/upload_avatar', 
          formData,
          { headers: { "Content-Type": "multipart/form-data", Authorization: accountData.access_token} }
        ).then(updateAvatarMessage => {
          console.log(updateAvatarMessage);
          resolve(updateAvatarMessage.data)
        }).catch(e => {
          console.log(e);
          if (!e.response?.data?.message) {
            reject(e)
          }
          reject(e.response.data)
        })
      })
    }
  }

  const logoutApi = () => {
    if (Object.keys(accountData).length > 0) {
      return new Promise((resolve, reject) => {
        axiosJwt.get(REACT_APP_SERVER_URL + '/account/logout', 
          { headers: { Authorization: accountData.access_token} }
        ).then(logoutMsg => {
          console.log(logoutMsg);
        }).catch(e => {
          console.log(e);
          if (!e.response?.data?.message) {
            reject(e)
          }
          reject(e.response.data)
        })
      })
    }
  }

  return ({ 
    getAccountInfor: getAccountInfor,
    updateBasicAccountApi: updateBasicAccountApi,
    updatePasswordApi: updatePasswordApi,
    updateAvatarApi: updateAvatarApi,
    logoutApi: logoutApi,
  })
}