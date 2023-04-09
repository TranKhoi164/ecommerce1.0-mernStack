import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";

const {REACT_APP_SERVER_URL} = process.env

export function UploadJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const deleteImagesApi = (images) => {
    return new Promise((resolve, reject) => {
      axiosJwt({
        url: REACT_APP_SERVER_URL + '/upload/delete_images',
        method:'delete',
        data : {images: images},
        headers:{ Authorization: accountData.access_token}
      }).then(deleteMessage => {
        resolve(deleteMessage.data)
      }).catch(e => {
        reject(e.response.data)
      })
    })
  }


  return ({
    deleteImagesApi: deleteImagesApi,
  })
}