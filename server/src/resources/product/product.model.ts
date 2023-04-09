import mongoose, { ObjectId, Types } from "mongoose";

const {ObjectId} = mongoose.Schema.Types

export interface IProduct {
  page: Types.ObjectId
  subPage: Types.ObjectId
  category?: Types.ObjectId
  subCategory?: Types.ObjectId
  name: string
  slug: string
  sku: string
  description?: string
  attributes?: object
  images: Array<string>
  detail?: object
  price?: number
  minPrice?: number
  maxPrice?: number
  inventories?: Array<Types.ObjectId>
  rating?: Array<Types.ObjectId>
}

export interface ProductDocument extends IProduct, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  _doc?: any
}

const productModel = new mongoose.Schema<ProductDocument>({
  page: {
    type: ObjectId,
    ref: 'page'
  },
  subPage: {
    type: ObjectId,
    ref: 'subPage'
  },
  category: {
    type: ObjectId,
    ref: 'category'
  },
  subCategory: {
    type: ObjectId,
    ref: 'subCategory'
  },
  name: String,
  slug: String,
  sku: {
    type: String,
    unique: true
  },
  description: String,
  attributes: Object,
  images: Array,
  detail: Object,
  price: Number,
  minPrice: Number,
  maxPrice: Number,
  inventories: [{
    type: ObjectId,
    ref: 'inventory'
  }],
}, {
  timestamps: true
})

const Products = mongoose.model<ProductDocument>('product', productModel)
export default Products