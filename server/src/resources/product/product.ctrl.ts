import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import ProductCtrlInterface from "../../utils/interfaces/product/product.ctrl.interface";
import { slugify } from "../../utils/stringFunc/slugify";
import Products, { ProductDocument } from "./product.model";
import Inventories from "../inventory/inventory.model";
import ProductFeature from "./product.feature";
import Ratings from "../rating/rating.model";
import { getDataFromCache, saveDataToCache, deleteDataFromCache, getMultipleEntries } from "../../service/redis/redis.service";


interface QueryType {
  page: number
  sort?: number
  subPage?: string
  category?: string
  subCategory?: string
  attributes?: Array<string>
  price?: number
}

class ProductCtrl implements ProductCtrlInterface {
  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const {name, price, quantity, sku} = req.body.product
      const newProduct = new Products({...req.body.product, slug: slugify(name)})
      await newProduct.save()

      const inven = new Inventories({product: newProduct?._id, sku: sku, price: price, quantity: quantity})
      await Products.findByIdAndUpdate(newProduct._id, {$push: {inventories: inven._id}})
      await inven.save();
      res.json({message: 'Tạo sản phẩm thành công', product_id: newProduct._id})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getProduct(req: Request, res: Response): Promise<void> {
    try { 
      const {product_sku} = req.params
      // const product = await Products.findOne({sku: product_sku})
      // .populate('inventories')
      const cacheProduct = await getDataFromCache('product:'+product_sku)

      if (cacheProduct) {
        res.json({product: JSON.parse(cacheProduct)})
        return
      } else {
        const product = await Products.findOne({sku: product_sku})
        .populate('inventories')
        await saveDataToCache(`product:${product?.sku}`, JSON.stringify(product), 60*60)
        
        res.json({product: product} )
        return
      }
    } catch (e: any) {
      handleException(500, e.mesage, res)
    }
  }
  public async getProducts(req: Request<{}, {}, {}, QueryType>, res: Response): Promise<void> {
    try {
      const productService = new ProductFeature(req.query)
      await productService.filter()
      const products = await productService.query

      res.json({products: products})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async getProductsDetail(req: Request<{},{},{products: Array<string>},{}>, res: Response): Promise<void> {
    try {
      const {products} = req.body

      console.log(req.body);
      let productsKey = []

      for (let id of products) {
        productsKey.push('products:product:'+id)
      }

      const entries: any = await getMultipleEntries(productsKey)
      let productsDetail = []

      for (let i = 0; i < entries.length; i++) {
        if (!entries[i]) {
          const findProduct = await Products.findById(products[i])
                    .select('name sku images price minPrice maxPrice')

          productsDetail[i] = {...findProduct?._doc}
          await saveDataToCache(`products:product:${products[i]}`, JSON.stringify(findProduct),60*60*24)
        } else {
          productsDetail[i] = JSON.parse(entries[i])
        }
      }
      res.json({products: productsDetail})
      
    } catch (e: any) {
      handleException(500, e.message, res)
    } 
  }
  public async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await Products.findByIdAndDelete(req.body.product._id, async (err: any, data: any) => {
        await deleteDataFromCache('product:'+data.sku)
        await deleteDataFromCache('products:product:'+req.body.product._id)
      })
      await Inventories.deleteMany({product: req.body.product?._id})
      res.json({message: 'Đã xóa thành công'})
    } catch (e: any) {
      handleException(500, e.mesage, res)
    }
  }
}

export default ProductCtrl