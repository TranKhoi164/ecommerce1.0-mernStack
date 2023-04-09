import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";
import axios from "axios";

const {REACT_APP_SERVER_URL} = process.env

export function PageJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createPageApi = (page) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/page/create_page', 
        {page: page},
        { headers: { Authorization: accountData.access_token} }
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  const getPageListApi = () => {
    return new Promise((resolve, reject) => {
      axios.get(REACT_APP_SERVER_URL + '/page/page_list', 
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        reject(e)
      })
    })
  }

  const deletePageApi = (pageId) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/page/delete_page',
        method:'delete',
        data : {page: {_id: pageId}},
        headers:{ Authorization: accountData.access_token}
      }).then(deleteMessage => {
        resolve(deleteMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  return ({
    createPageApi: createPageApi,
    getPageListApi: getPageListApi,
    deletePageApi: deletePageApi,
  })
}