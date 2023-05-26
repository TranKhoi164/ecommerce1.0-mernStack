import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";

const {REACT_APP_SERVER_URL} = process.env

export function CategoryJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createCategoryApi = (category) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/category/create_category', 
        {category: category},
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

  const getCategoryListApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + '/category/category_list', 
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

  const deleteCategoryApi = (categoryId) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/category/delete_category',
        method:'delete',
        data : {category: {_id: categoryId}},
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
    createCategoryApi: createCategoryApi,
    getCategoryListApi: getCategoryListApi,
    deleteCategoryApi: deleteCategoryApi,
  })
}