import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";

const {REACT_APP_SERVER_URL} = process.env

export function OrderJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createOrderApi = (order) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/order/create_order', 
        {order: order},
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

  const getOrderApi = (order) => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/order/order_infor/'+order.order_id, 
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

  const getPurchasedOrderApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/order/purchased_order', 
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

  const updateOrderApi = (order, query) => {
    return new Promise((resolve, reject) => {
      axiosJwt.patch(REACT_APP_SERVER_URL + '/order/update_order' + query, 
        {order: order},
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

  const deleteOrderApi = (order) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/order/delete_order',
        method:'delete',
        data : {order: order},
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
    createOrderApi: createOrderApi,
    getOrderApi: getOrderApi,
    updateOrderApi: updateOrderApi,
    getPurchasedOrderApi: getPurchasedOrderApi,
    deleteOrderApi: deleteOrderApi
  })
}