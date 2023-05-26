import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";
import axios from "axios";

const {REACT_APP_SERVER_URL} = process.env

export function SubPageJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createSubPageApi = (sub_page) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/page/create_sub_page', 
        {sub_page: sub_page},
        { headers: { Authorization: accountData.access_token} }
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  const getSubPageBySlugApi = (slug) => {
    return new Promise((resolve, reject) => {
      axios.get(REACT_APP_SERVER_URL + `/page/${slug.pageSlug}/${slug.subPageSlug}`, 
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  const getSubPageListApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/page/sub_page_list', 
        { headers: { Authorization: accountData.access_token} }
      ).then(message => {
        resolve(message.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  const getSubPageListByPageApi = (pageId) => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/page/sub_page_list/' + pageId, 
        { headers: { Authorization: accountData.access_token} }
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  const deleteSubPageApi = (subPageId) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/page/delete_sub_page',
        method:'delete',
        data : {sub_page: {_id: subPageId}},
        headers:{ Authorization: accountData.access_token}
      }).then(deleteMessage => {
        resolve(deleteMessage.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  return ({
    createSubPageApi: createSubPageApi,
    getSubPageBySlugApi: getSubPageBySlugApi,
    getSubPageListApi: getSubPageListApi,
    deleteSubPageApi: deleteSubPageApi,
    getSubPageListByPageApi: getSubPageListByPageApi,
  })
}