import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";
import axios from "axios";

const {REACT_APP_SERVER_URL} = process.env

export function AttributeJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createAttributeApi = (attribute) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/attribute/create_attribute', 
        {attribute: attribute},
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

  const getAttributeListApi = () => {
    return new Promise((resolve, reject) => {
      axios.get(REACT_APP_SERVER_URL + '/attribute/attribute_list', 
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

  const addAttributeValueApi = (attributeId, value) => {
    return new Promise((resolve, reject) => {
      axiosJwt.patch(REACT_APP_SERVER_URL + '/attribute/add_attribute_value',
        {attribute: {_id: attributeId, value: value}}, 
        { headers: { Authorization: accountData.access_token} }
      ).then(createPageMessage => {
        console.log();
        resolve(createPageMessage.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  const deleteAttributeValueApi = (attributeId, value) => {
    return new Promise((resolve, reject) => {
      axiosJwt.patch(REACT_APP_SERVER_URL + '/attribute/delete_attribute_value',
        {attribute: {_id: attributeId, value: value}}, 
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

  const deleteAttributeApi = (attributeId) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/attribute/delete_attribute',
        method:'delete',
        data : {attribute: {_id: attributeId}},
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
    createAttributeApi: createAttributeApi,
    getAttributeListApi: getAttributeListApi,
    deleteAttributeApi: deleteAttributeApi,
    addAttributeValueApi: addAttributeValueApi,
    deleteAttributeValueApi:deleteAttributeValueApi,
  })
}