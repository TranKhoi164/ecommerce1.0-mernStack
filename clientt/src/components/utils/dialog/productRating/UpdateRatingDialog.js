import React, {useState, useEffect} from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { RatingJwtApi } from '../../../../api/ratingApi';
import { ProductJwtApi } from '../../../../api/productApi';
import UseDebounce from '../../UserDebounce';
import {CircularProgress} from '@material-ui/core';
import { UploadJwtApi } from '../../../../api/uploadApi';

function ProductImageUpload({rating, setRating}) {
  const {deleteImagesApi} = UploadJwtApi()
  const {uploadProductImage} = ProductJwtApi()
  const debounce = UseDebounce()

  const [isLoading, setIsLoading] = useState(false)

  const requestUploadProductImage = async (formData) => {
    try {
      setIsLoading(true)
      const img = await uploadProductImage(formData)
      console.log('img: ', img);
      setRating({...rating, images: [...rating.images, img]})
      setIsLoading(false)
    } catch(e) {
      setIsLoading(false)
      alert(e.message);
    }
  }
  const uploadImage = async (e) => {
    if (rating?.images?.length >= 5) {
      alert('Đã hết lượt đăng ảnh')
      return
    }
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append('file', file) 

    requestUploadProductImage(formData)
  } 

  const requestDeleteImage = (public_id) => {
    deleteImagesApi([public_id]).then(() => {
      let tempArr = rating?.images?.filter(el => el.public_id !== public_id)
      setRating({...rating, images: tempArr})
    }).catch(e => alert(e.response.data.message))
  }

  return (
    <div className='rating_image'>
      {isLoading 
        ? <CircularProgress color='secondary' />
        : <div style={{display: 'flex', alignItems: 'center'}}>
          <label htmlFor='file_up'><PhotoCameraIcon style={{marginRight: '5px'}} />   Thêm Hình Ảnh</label>
          <span style={{color: '#9a9a9a'}}> tối đa 5 ảnh</span>
        </div>
      }
      <input style={{ display: "none" }} accept="image/png, image/jpeg" onChange={uploadImage} className='rating_fileup' type="file" name="file" id="file_up" />
      <div className='image_list'>
        {rating?.images?.map(imageUrl => {
          return <div className='imageList_item'>
            <img key={imageUrl.image_url} src={imageUrl.image_url} alt="product_image" />
            <div onClick={()=>requestDeleteImage(imageUrl.public_id)}>x</div>
          </div>
        })}
      </div>
    </div>
  )
}


const labels = {
  0.5: 'Rất tệ',
  1: 'Tệ',
  1.5: 'Có vấn đề',
  2: 'Hơi có vấn đề',
  2.5: 'Bình thường',
  3: 'Tạm ổn',
  3.5: 'Tốt',
  4: 'Rất tốt',
  4.5: 'Tuyệt vời',
  5: 'Rất tuyệt vời',
};


function UpdateRatingDialog({inventoryId, productId, orderId, accountId, setUpdateRatingDialog, setOrder, updateRatingDialog, classes}) {
  const {updateRatingApi, getRatingApi} = RatingJwtApi()
  const {deleteImagesApi} = UploadJwtApi()

  const [hover, setHover] = useState(-1);
  // const [images, setImages] = useState([])
  // const [comment, setComment] = useState('')
  // const [starValue, setStarValue] = useState(5)
  const [rating, setRating] = useState({
    _id: '',
    images: [],
    comment: '',
    starRating: 0,
  })
  console.log('rating: ', rating);
  

  useEffect(() => {
    if (updateRatingDialog) {
      getRatingApi({product: productId}).then(data => {
        setRating({_id: data?.rating?._id, images: data?.rating?.images, comment: data?.rating?.comment, starRating: data?.rating?.starRating})
      })
    }
  }, [updateRatingDialog])
  

  const handleClose = () => {
    setUpdateRatingDialog(false)
    let publicIdArr = []
    for (let el of rating.images) {
      publicIdArr.push(el?.public_id)
    }
    deleteImagesApi(publicIdArr).then(() => {
      setRating({...rating, images: []})
    }).catch(e => alert(e.response.data.message))
  }
  const handleSubmit = () => {
    updateRatingApi(rating)
    .then(data => {
      alert(data.message)
      setUpdateRatingDialog(false)
    }).catch(e => alert(e.message)) 
  }

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={updateRatingDialog}>
      <DialogTitle id="simple-dialog-title">Đánh giá sản phẩm</DialogTitle>
      <div className={classes.ratingProductDialog_container}>
        <div className='ratingDetail_container'>
          <div className='starRating_container row'>
            Chất lượng sản phẩm: 
            <Rating
              style={{marginLeft: '50px'}}
              name="customized-empty"
              value={rating?.starRating}
              precision={1}
              size='large'
              emptyIcon={<StarBorderOutlined fontSize="inherit" />}
              onChange={(event, newValue) => {
                setRating({...rating, starRating: newValue});
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            <span style={{marginLeft:'10px', color: 'orange'}}>{rating?.starValue !== null && labels[hover !== -1 ? hover : rating?.starRating]}</span>
          </div>
          <div className='comment_container'>
            <div className='commentForm_container'>
              <textarea name="comment" value={rating?.comment} onChange={(e)=>setRating({...rating, comment: e.target.value})}></textarea>
              <ProductImageUpload rating={rating} setRating={setRating} />
            </div>
          </div>
        </div>
      </div>
      <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Trở lại
          </Button>
          <Button onClick={handleSubmit} color="secondary" variant='contained'>
            Đánh giá
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default UpdateRatingDialog