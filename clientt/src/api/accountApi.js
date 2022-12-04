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
      console.log(accountData)
      resolve(accountData.data)
    }).catch(e => {
      console.log(e);
      reject(e.response.data)
    })
  })
}



export const AccountJwtApi = () => {
  const accountData = useSelector(selectAccount)
  const dispatch = useDispatch()
  const axiosJwt = AxiosJWT()

  const getAccountInfor = (access_token) => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/account/information', 
        { headers: { Authorization: accountData.access_token} }
      ).then(getInforMessage => {
        dispatch(updateAccount({...getInforMessage.data.account, access_token: accountData.access_token}))
        resolve(getInforMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  const updateBasicAccountApi = (updateAccount) => {
    return new Promise((resolve, reject) => {
      axiosJwt.patch(REACT_APP_SERVER_URL + '/account/update_basic', 
        { ...updateAccount },
        { headers: { Authorization: accountData.access_token} }
      ).then(updateMessage => {
        resolve(updateMessage.data)
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    })
  }

  const updatePasswordApi = (updatePassword) => {
    return new Promise((resolve, reject) => {
      axiosJwt.patch(REACT_APP_SERVER_URL + '/account/update_password', 
        { ...updatePassword },
        { headers: { Authorization: accountData.access_token} }
      ).then(updateMessage => {
        console.log(updateMessage);
        resolve(updateMessage.data)
      }).catch(e => {
        console.log(e.response);
        reject(e.response.data)
      })
    })
  }

  return ({ 
    getAccountInfor: getAccountInfor,
    updateBasicAccountApi: updateBasicAccountApi,
    updatePasswordApi: updatePasswordApi
  })
}