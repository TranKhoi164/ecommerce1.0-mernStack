import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";

const {REACT_APP_SERVER_URL} = process.env

export function OrderManagementJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const getOrderManagementApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/orderManagement/order_management', 
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

  const pushOrderApi = (orderId) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/orderManagement/push_order/'+orderId, 
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

  const getOrdersInCartApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/orderManagement/orders_in_Cart', 
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

  const getPurchasedOrdersOfAccountApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/orderManagement/purchased_orders_of_account', 
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

  const getPurchasedOrdersApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/orderManagement/purchased_orders', 
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

  const purchaseOrdersApi = (orders) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/orderManagement/purchase_orders', 
        {orders: orders},  
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

  const confirmOrderApi = (order) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/orderManagement/confirm_order', 
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

  const cancelOrderApi = (order) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/orderManagement/cancel_order', 
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

  const removeOrderApi = (orderId) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/orderManagement/remove_order/'+orderId,
        method:'delete',
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
    getOrderManagementApi: getOrderManagementApi,
    pushOrderApi: pushOrderApi,
    getOrdersInCartApi: getOrdersInCartApi,
    getPurchasedOrdersOfAccountApi: getPurchasedOrdersOfAccountApi,
    getPurchasedOrdersApi: getPurchasedOrdersApi,
    cancelOrderApi: cancelOrderApi,
    removeOrderApi: removeOrderApi,
    confirmOrderApi: confirmOrderApi,
    purchaseOrdersApi: purchaseOrdersApi
  })
}