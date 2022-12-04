import axios from "axios";
import jwt_decode from 'jwt-decode' 
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectAccount, updateAccount } from "./features/account/accountSlice";

const {REACT_APP_SERVER_URL} = process.env

function AxiosJWT() {
  const accountData = useSelector(selectAccount)
  const dispatch = useDispatch()
  const axiosJWT = axios.create()

  // TODO: when client request to server, axiosJWT will check if token expires then request a new one
  axiosJWT.interceptors.request.use(async (config) => {
    const date = new Date()
    const decodedToken = jwt_decode(accountData.access_token)
    //if token is expired
    if (decodedToken.exp < date.getTime()/1000) {
      try {
        const refreshTokenRequest = await axios.post(REACT_APP_SERVER_URL + '/account/refresh_token', {
          _id: accountData._id
        })
        const access_token = refreshTokenRequest.data.access_token
        dispatch(updateAccount({
          ...accountData,
          access_token: access_token
        }))
        config.headers["Authorization"] = access_token
      } catch (e) {
        return e
      }
    }
    return config
  }, err => {
    return Promise.reject(err)
  })

  return axiosJWT
}

export default AxiosJWT