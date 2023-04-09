import React, {useState, useEffect, useRef} from 'react'
import queryString from 'query-string';

import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

import { useParams, useSearchParams } from 'react-router-dom'
import { parseQueryUrlClient, queryUrlServer } from '../../utils/stringFunc/manipulateString'
import { ProductJwtApi } from '../../../api/productApi'
import productPageStyle from '../../../styles/productPage.style'
import ProductPageSideBar from '../../sidebar/ProductPageSideBar'

import { useSelector } from 'react-redux'
import { selectAccount } from '../../../features/account/accountSlice'
import ProductBox from './utils/ProductBox'
import { SubPageJwtApi } from '../../../api/subPageApi';

let perPage = 8
function ProductsList({products, setProducts, searchQuery, getProducts, page, accountData, isLoading, classes}) {
  
  const triggerLoadMoreProduct = () => {
    getProducts({...searchQuery, page: page.current + 1})
    page.current += 1;
  }
 
  return (
    <>
      <div className={classes.productList_container}>
        <div className="product_list">
          {products.map(product => {
            return <ProductBox product={product} products={products} accountData={accountData} setProducts={setProducts} classes={classes}/>
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '30px'}}>
        {!isLoading
        ? (products.length % perPage === 0 && <Button onClick={triggerLoadMoreProduct} variant='outlined' color='secondary'>Xem thêm sản phẩm</Button>)
        : <CircularProgress color='secondary' />}
        </div>
      </div>
    </>
  )
}

function ProductPage() {
  const classes = productPageStyle()
  const {getProductsApi, getProductsDetailApi} = ProductJwtApi()
  const {getSubPageBySlugApi} = SubPageJwtApi()
  const {page_slug, subPage_slug} = useParams()

  const parsed = queryString.parse(document.location.search, {arrayFormat: 'index', type: Object})
  
  
  const page = useRef(1)
  const [isLoading, setIsLoading] = useState(false)
  const accountData = useSelector(selectAccount)
  const [productIds, setProductIds] = useState([])
  const [products, setProducts] = useState([])
  const [subPageObj, setSubPageObj] = useState({})
  const [searchQuery, setSearchQuery] = useState(parseQueryUrlClient(parsed))
  
  console.log('products: ', products);
  console.log('productIds: ', productIds);

  useEffect(() => {
    getSubPageBySlugApi({pageSlug: page_slug, subPageSlug: subPage_slug})
    .then((data) => setSubPageObj(data.sub_page))
  }, [page_slug, subPage_slug])

  useEffect(() => {
    const temp = {...parsed}
    setSearchQuery(parseQueryUrlClient(temp))
    getProducts({...parseQueryUrlClient(temp), page: 1})
  }, [document.location.search])
  

  useEffect(() => {
    setSearchQuery({...searchQuery ,subpage: subPageObj?._id})
  }, [subPageObj])

  useEffect(() => {
    page.current = 1
    getProducts({...searchQuery, page: 1})
  }, [searchQuery.subpage])
  

  const getProducts = async (searchObj) => {
    try {
      setIsLoading(true)
      let temp = {...searchObj}
      const query = queryUrlServer(temp)
     //const temp = products.concat(productsReq)
     console.log('query: ', query);
      if (searchObj.page % perPage === 1) {  
        const productsReq = await getProductsApi(query)
        setProductIds(productsReq.products);

        let a = productsReq.products?.slice(0, perPage)
        const productsIdArr = a.map(el => el?._id)
        
        getProductsDetailApi({products: productsIdArr})
        .then(data => setProducts(data.products))
        .catch(data => console.log(data))
      } else {
        console.log('bitch: ', (searchObj.page-1)*perPage);
        console.log('bitch2: ', (searchObj.page)*perPage);
        let a = productIds?.slice((searchObj.page-1)*perPage,(searchObj.page*perPage))
        const productsIdArr = a.map(el => el?._id)

        getProductsDetailApi({products: productsIdArr})
        .then(data => {
          // console.log('data: ', data)
          // console.log('products: ', data);
          setProducts([...products, ...data.products])
        })
        .catch(err => console.log(err))
      }
      setIsLoading(false)
    } catch(e) {
      throw new Error(e)
    }
  }

  return (
    <div className={classes.productPage_container}>
      <ProductPageSideBar pageSlug={page_slug} subPageSlug={subPage_slug} page={page} subPage={subPageObj} searchQuery={searchQuery} setSearchQuery={setSearchQuery} getProducts={getProducts} classes={classes} />
      <ProductsList page={page} isLoading={isLoading} searchQuery={searchQuery} products={products} getProducts={getProducts} setProducts={setProducts} accountData={accountData} classes={classes} />
    </div>
  )
}

export default ProductPage