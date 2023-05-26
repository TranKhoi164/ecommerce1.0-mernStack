import AxiosJWT from "../AxiosJWT";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/account/accountSlice";
import axios from "axios";

const {REACT_APP_SERVER_URL} = process.env

export function RatingJwtApi() {
  const accountData = useSelector(selectAccount)
  const axiosJwt = AxiosJWT()

  const createRatingApi = (rating) => {
    return new Promise((resolve, reject) => {
      axiosJwt.post(REACT_APP_SERVER_URL + '/rating/create_rating', 
        {rating: rating},
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

  const getRatingApi = (rating) => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_SERVER_URL + `/rating/${rating?.product}`, 
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

  const getRatingsOfProductApi = (obj) => {
    return new Promise((resolve, reject) => {
      axios.get(REACT_APP_SERVER_URL + `/rating/get_ratings_of_product/${obj.product}`, 
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

  const updateRatingApi = (rating) => {
    return new Promise((resolve, reject) => {
      axiosJwt.patch(REACT_APP_SERVER_URL + `/rating/update_rating`,
        { rating: rating }, 
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

  return ({
    createRatingApi: createRatingApi,
    getRatingApi: getRatingApi,
    getRatingsOfProductApi: getRatingsOfProductApi,
    updateRatingApi: updateRatingApi,
  })
}