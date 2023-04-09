import React, {useState, useEffect} from 'react'
import { getDateByTimeStamps, queryUrlServer } from '../../../utils/stringFunc/manipulateString'

import Pagination from '@material-ui/lab/Pagination';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { RatingJwtApi } from '../../../../api/ratingApi';
import Rating from '@material-ui/lab/Rating';

function RatingItemBox({rating}) {

  function AttributeItem({att, i}) {
      let keys = Object.keys(rating?.inventory?.attribute||{})
      return <div style={{marginRight:'10px'}}><b style={{marginRight:'5px'}}>{keys?.[i]}:</b> {att}</div>
  }

  return (
    <div className="ratingItem_container">
      <div className="top">
        <div className="username">{rating?.account?.username}</div>
        <div className="rating_detail">
          <div className="star_rating"><Rating size='small' value={rating?.starRating} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" />} readOnly style={{ paddingRight: '10px'}}/></div>
          <div className="comment">
            {rating?.comment}
          </div>
        </div>
        <div className="images">
          {rating?.images?.map(image => {
            return <img src={image?.image_url} alt="img" />
          })}
        </div>
      </div>
      <div className="bot">
        <div>{getDateByTimeStamps(rating?.createdAt)}</div>
        <div>
          {Object.values(rating?.inventory?.attribute||[])?.map((att, i) => {
            return <AttributeItem att={att} i={i} />
          })}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  attributes: {
    padding: '10px',
    '& .attribute_row': {
      marginBottom: '15px',
      '& .attribute_row_item': {
        display: 'flex',
        marginTop: '15px',
        '& .attribute_item': {
          fontSize: '15px',
          padding: '5px 20px',
          marginRight: '10px',
          border: '1px solid #d4d4d4',
          cursor: 'pointer',
          borderRadius: '10px',
        },
        '& .inactive:hover': {
          border: '1px solid #333',
        },
        '& .active': {
          border: '2px solid #333',
        }
      }
    }
  }
}));

function RatingBox({ratings, productId, attributes, compareObject, ratingsLength, inventories}) {
  
  const popperStyle = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [selectFilterAttributes, setSelectFilterAttributes] = useState({})
  const [filterQuery, setFilterQuery] = useState({
    starRating: undefined,
    inventory: undefined,
    page: 1,
  })
  const [filteredRatings, setFilteredRatings] = useState(ratings)

  console.log('ratings: ', ratings);
  console.log('filteredRatings: ', filteredRatings);
  console.log('filterQuery: ', filterQuery);

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  useEffect(() => {
    let attributeIndex = inventories?.findIndex(el => compareObject(el?.attribute, selectFilterAttributes))
    if (attributeIndex !== -1) {
      setFilterQuery({...filterQuery, inventory: inventories?.[attributeIndex]?._id})
    }
  }, [selectFilterAttributes])

  // starRating: undefined,
  // inventory: undefined,
  // page: 1,

  useEffect(() => {
    let findRatings = [...ratings]
    let perPage = 3

    if (filterQuery.starRating ) {
      findRatings = findRatings?.filter(rating => rating.starRating == filterQuery.starRating)
    }
    if (filterQuery.inventory) {
      findRatings = findRatings?.filter(rating => rating?.inventory?._id == filterQuery.inventory)
    }
    setFilteredRatings(findRatings.slice(perPage*(filterQuery.page-1),perPage*filterQuery.page))
  }, [filterQuery])
  

  const unselectAttributes = () => {
    setFilterQuery({...filterQuery, inventory: undefined})
    setSelectFilterAttributes({})
  }

  const onFilterChange = (e) => {
    const {name, value} = e.target
    setFilterQuery({...filterQuery, [name]: value})
  }

  const handleAttributeChange = (e) => {
    const {name, value} = e.target
    setSelectFilterAttributes({...selectFilterAttributes, [name]: value})
  }

  console.log('page number: ', Math.ceil(ratings?.length/3));


  return (
    <div className='rating_container'>
      <div className='extra_detail_header'>ĐÁNH GIÁ SẢN PHẨM</div>
      <div className='filter_navbar'>
        <div className="starRating_filter">
          <input type="radio" id="all" name="starRating" value={undefined} onChange={onFilterChange} />
          <label for="all" className={!filterQuery.starRating&&'focus'} >Tất Cả</label>
          {
            [5,4,3,2,1].map(el => {
              return <>
                <input type="radio" id={`${el}`} name="starRating" value={el} onChange={onFilterChange} />
                <label for={`${el}`} className={filterQuery.starRating==el&&'focus'} >{el} sao</label>
              </>
            })
          }
        </div>


        <div className='inventory_filter'>
          <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                <div className={popperStyle.attributes}>
                  {
                    Object.keys(attributes)?.map(key => {
                    return (
                      <div className='attribute_row'>
                        <div className='field_name'>{key}</div>
                        <div className='attribute_row_item'>
                          { attributes[key]?.map(attribute => {
                            return <>
                              <input value={attribute} onChange={handleAttributeChange} required type="radio" id={attribute+'!'} name={key} style={{display: 'none'}}/>
                              <label className={'attribute_item '+(selectFilterAttributes[key]===attribute?'active':'inactive')} for={attribute+'!'}>{attribute}</label>
                            </>
                          }) }
                        </div>
                      </div>
                    )})
                  }
                </div>
                </Paper>
              </Fade>
            )}
          </Popper>
          <div style={{cursor: 'pointer'}} onClick={handleClick('bottom-end')}>
            Lọc theo loại sản phẩm ▼ 
            {filterQuery.inventory && <span style={{color: '#7d7d7d'}} onClick={unselectAttributes}><u>Bỏ</u></span>}
          </div>
        </div>
      </div>
      
      {filteredRatings?.length > 0 ? <>
        <div className='ratings_list'>
          {filteredRatings?.map(rating => {
            return <RatingItemBox rating={rating} />
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Pagination style={{marginTop: '20px'}}  count={ratings?.length % 3 === 0 ? ratings?.length/3 : Math.ceil(ratings?.length/3)} color="secondary" onChange={(event, value) => setFilterQuery({...filterQuery,page:value})} />
        </div>
      </>
      : <div style={{width:'100%', height: '100px', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems:' center'}}>Chưa có đánh giá</div>}
    </div>
  )
}

export default RatingBox