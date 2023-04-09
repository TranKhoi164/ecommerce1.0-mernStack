import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";
import axios from "axios";

const {REACT_APP_SERVER_URL} = process.env

export function ProductJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createProductApi = (product) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/product/create_product', 
        {product: product},
        { headers: { Authorization: accountData.access_token} }
      ).then(createPageMessage => {
        resolve(createPageMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  const uploadProductImage = (formData) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/upload/upload_product_image', 
        formData,
        { headers: { "Content-Type": "multipart/form-data", Authorization: accountData.access_token} }
      ).then(uploadMessage => {
        resolve(uploadMessage.data)
      }).catch(e => {
        console.log(e);
        reject(e.response.data)
      })
    })
  }

  const getProductApi = (product) => {
    return new Promise((resolve, reject) => {
      axios.get(REACT_APP_SERVER_URL + '/product/get_product/' + product.sku, 
      ).then(message => {
        resolve(message.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  //only get product Id
  const getProductsApi = (query) => {
    return new Promise((resolve, reject) => {
      axios.get(REACT_APP_SERVER_URL + '/product/get_products' + query, 
      ).then(message => {
        resolve(message.data)
      }).catch(e => {
        reject(e)
      })
    })
  }

  //
  const getProductsDetailApi = (products) => {
    console.log('productsDetailApi: ', products);
    return new Promise((resolve, reject) => {
      axios.post(REACT_APP_SERVER_URL + '/product/get_products_detail',
      { ...products} 
      ).then(message => {
        resolve(message.data)
      }).catch(e => {
        reject(e)
      })
    })
  }

  const deleteProductApi = (productId) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/product/delete_product',
        method:'delete',
        data : {product: {_id: productId}},
        headers:{ Authorization: accountData.access_token}
      }).then(deleteMessage => {
        console.log(deleteMessage);
        resolve(deleteMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }

  return ({
    createProductApi: createProductApi,
    getProductsDetailApi: getProductsDetailApi,
    uploadProductImage: uploadProductImage,
    getProductsApi: getProductsApi,
    getProductApi: getProductApi,
    deleteProductApi: deleteProductApi
  })
}