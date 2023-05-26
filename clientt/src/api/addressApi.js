import axios from 'axios'
import AxiosJWT from '../AxiosJWT'
import { selectAccount } from '../features/account/accountSlice'
import { useSelector } from 'react-redux'

const {REACT_APP_SERVER_URL} = process.env
const provinces_api_url = 'https://provinces.open-api.vn/api'

export const getProvincesApi = () => {
  return new Promise((resolve, reject) => {
    axios.get(provinces_api_url + '/p/', 
    ).then(provinces => {
      resolve(provinces.data)
    }).catch(e => {
      if (!e.response?.data?.message) {
        reject(e)
      }
      reject(e.response.data)
    })
  })
}

export const getDistrictsApi = (province_code) => {
  return new Promise((resolve, reject) => {
    axios.get(provinces_api_url+'/p/'+province_code+'?depth=2', 
    ).then(districts => {
      resolve(districts.data.districts)
    }).catch(e => {
      if (!e.response?.data?.message) {
        reject(e)
      }
      reject(e.response.data)
    })
  })
}

export const getWardsApi = (district_code) => {
  return new Promise((resolve, reject) => {
    axios.get(provinces_api_url+'/d/'+district_code+'?depth=2', 
    ).then(wards => {
      resolve(wards.data.wards)
    }).catch(e => {
      if (!e.response?.data?.message) {
        reject(e)
      }
      reject(e.response.data)
    })
  })
}

export const AddressJwtApi = () => {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createAddressApi = (address) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/address/create_address', 
        { address: {...address}},
        { headers: { Authorization: accountData.access_token} }
      ).then(createAddressMessage => {
        resolve(createAddressMessage.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  const getAddrsessListApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/address/address_list', 
        { headers: { Authorization: accountData.access_token} }
      ).then(addressList => {
        resolve(addressList.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  const updateAddressApi = (_id, address) => {
    return new Promise((resolve, reject) => {
      axiosJwt.patch(REACT_APP_SERVER_URL + `/address/update_address/${_id}`, 
        {address: address},
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

  const deleteAddressApi = (_id) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/address/delete_address',
        method:'delete',
        data : {address: {_id: _id}},
        headers:{ Authorization: accountData.access_token}
      }
      ).then(deleteMessage => {
        resolve(deleteMessage)
      }).catch(e => {
        console.log(e)
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      })
    })
  }

  return ({ 
    createAddressApi: createAddressApi,
    getAddressListApi: getAddrsessListApi,
    updateAddressApi: updateAddressApi,
    deleteAddressApi: deleteAddressApi,
  })
}