import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { RatingJwtApi } from '../../../../api/ratingApi';
import { ProductJwtApi } from '../../../../api/productApi';
import UseDebounce from '../../UserDebounce';
import {CircularProgress} from '@material-ui/core';
import { UploadJwtApi } from '../../../../api/uploadApi';

function ProductImageUpload({images, setImages}) {
  const {deleteImagesApi} = UploadJwtApi()
  const {uploadProductImage} = ProductJwtApi()

  const debounce = UseDebounce()

  const [isLoading, setIsLoading] = useState(false)

  const requestUploadProductImage = async (formData) => {
    try {
      setIsLoading(true)
      const img = await uploadProductImage(formData)
      setImages([...images, img])
      setIsLoading(false)
    } catch(e) {
      setIsLoading(false)
      alert(e.message);
    }
  }
  const uploadImage = async (e) => {
    if (images.length >= 5) {
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
      let tempArr = images.filter(el => el.public_id !== public_id)
      setImages(tempArr)
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
        {images.map(imageUrl => {
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


function ProductRatingDialog({inventoryId, productId, orderId, accountId,openDialog, setOrder, setOpenDialog, classes}) {
  const {createRatingApi} = RatingJwtApi()
  const {deleteImagesApi} = UploadJwtApi()

  const [starValue, setStarValue] = useState(5)
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState('')
  const [images, setImages] = useState([])


  const handleClose = () => {
    setComment('')
    setStarValue(5)
    setOpenDialog(false)
    let publicIdArr = []
    for (let el of images) {
      publicIdArr.push(el?.public_id)
    }
    deleteImagesApi(publicIdArr).then(() => {
      setImages([])
    }).catch(e => alert(e.response.data.message))
  }
  const handleSubmit = () => {
    createRatingApi({starRating: starValue, comment: comment, inventory: inventoryId, product: productId, account: accountId, images: images, order: orderId})
    .then(data => {
      alert(data.message)
      setOrder((order) => ({...order, isRated: 1}))
      setOpenDialog(false)
    }).catch(e => alert(e.message)) 
  }

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={openDialog}>
      <DialogTitle id="simple-dialog-title">Đánh giá sản phẩm</DialogTitle>
      <div className={classes.ratingProductDialog_container}>
        <div className='ratingDetail_container'>
          <div className='starRating_container row'>
            Chất lượng sản phẩm: 
            <Rating
              style={{marginLeft: '50px'}}
              name="customized-empty"
              defaultValue={5}
              precision={1}
              size='large'
              emptyIcon={<StarBorderOutlined fontSize="inherit" />}
              onChange={(event, newValue) => {
                setStarValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            <span style={{marginLeft:'10px', color: 'orange'}}>{starValue !== null && labels[hover !== -1 ? hover : starValue]}</span>
          </div>
          <div className='comment_container'>
            <div className='commentForm_container'>
              <textarea name="comment" onChange={(e)=>setComment(e.target.value)}></textarea>
              <ProductImageUpload images={images} setImages={setImages} />
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

export default ProductRatingDialog