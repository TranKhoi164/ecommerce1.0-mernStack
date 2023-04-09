import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";

const {REACT_APP_SERVER_URL} = process.env

export function InventoryJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createInventoriesApi = (inventories) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/inventory/create_inventories', 
        {inventories: inventories},
        { headers: { Authorization: accountData.access_token} }
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  const updateInventoryApi = (inventory) => {
    return new Promise((resolve, reject) => {
      axiosJwt.patch(REACT_APP_SERVER_URL + '/inventory/update_inventory', 
        {inventory: inventory},
        { headers: { Authorization: accountData.access_token} }
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  return ({
    createInventoriesApi: createInventoriesApi,
    updateInventoryApi: updateInventoryApi
  })
}