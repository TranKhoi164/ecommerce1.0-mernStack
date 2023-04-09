import React, {useState, useEffect} from 'react'
import { AttributeJwtApi } from '../../api/attributeApi'
import { useNavigate } from 'react-router-dom'
import { queryUrlClient } from '../utils/stringFunc/manipulateString'

function ProductPageSideBar({pageSlug, subPageSlug, subPage, searchQuery, setSearchQuery, page, getProducts, classes}) {
  const { getAttributeListApi } = AttributeJwtApi()
  const navigate = useNavigate()
  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    getAttributeListApi().then(data => setAttributes(data.attribute_list))
  }, [])
  

  const handleChange = (e) => {
    const {name, value} = e.target
    
    if (searchQuery.category === value) {
      setSearchQuery({...searchQuery, category: ''})
      e.target.checked = false
      return
    }
    setSearchQuery({...searchQuery, [name]: value})
  }
  const attributeChange = (e) => {
    const {name, value, checked} = e.target

    if (checked) {
      let temp = searchQuery?.attributes?.[name] || []
      temp = [...temp, value]
      setSearchQuery({...searchQuery, attributes: {...searchQuery?.attributes, [name]: temp}})
    } else {
      let temp = searchQuery?.attributes?.[name]?.filter((el) => el !== value) || []
      setSearchQuery({...searchQuery, attributes: {...searchQuery?.attributes, [name]: temp}})
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    page.current = 1
    navigate(`/${pageSlug}/${subPageSlug}/${queryUrlClient(searchQuery)}`)
  }
  
  return (
    <div className={classes.productPage_sidebar}>
      <form onSubmit={handleSubmit}>
        <div className='btn_box'>
          <button className='search_btn search' type='submit'>Tìm kiếm</button>
        </div>
        <div className='category_box'>
          <h3>Danh mục</h3>
          {subPage?.categories?.map(category => {
            return <div key={category?._id} className='category_radio'>
              <input type="radio" id={category?._id} name="category" value={category?._id} onClick={handleChange} />
              <label for={category?._id}>   {category?.name}</label>
              
              {category?.subCategories?.map(subCategory => {
                return <div key={subCategory?._id} className='subCategory_radio'>
                  <input type="radio" id={subCategory?._id} name="category" value={subCategory?._id} onClick={handleChange} />
                  <label for={subCategory?._id}>   {subCategory?.name}</label>
                </div>
              })}
            </div>
          })}
        </div>
        <div className='attribute_box'>
          {attributes?.map(attribute => {
            return <div key={attribute?._id} className='attribute_checkbox'>
              <h3>{attribute?.name}</h3>
              {attribute?.values?.map(value => {
                return <div>
                  <input type="checkbox" onChange={attributeChange} id={value} name={attribute?.name} value={value} />
                  <label for={value}>    {value}</label>
                </div>
              })}
            </div>
          })}
        </div>
      </form>
    </div>
  )
}

export default ProductPageSideBar