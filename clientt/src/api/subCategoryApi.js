import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";

const {REACT_APP_SERVER_URL} = process.env

export function SubCategoryJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createSubCategoryApi = (sub_category) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/category/create_sub_category', 
        {sub_category: sub_category},
        { headers: { Authorization: accountData.access_token} }
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  const deleteSubCategoryApi = (subCategoryId) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/category/delete_sub_category',
        method:'delete',
        data : {sub_category: {_id: subCategoryId}},
        headers:{ Authorization: accountData.access_token}
      }).then(deleteMessage => {
        resolve(deleteMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  return ({
    createSubCategoryApi: createSubCategoryApi,
    deleteSubCategoryApi: deleteSubCategoryApi,
  })
}