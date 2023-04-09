import mongoose, { Document, Model, ObjectId} from "mongoose";
import Products from "./product.model";

interface QueryStringType {
  page: number
  sort?: number
  subPage?: string
  category?: string
  subCategory?: string
  attributes?: Array<string>
  price?: number
}

class ProductFeature {
  query: any
  queryString: QueryStringType

  constructor(queryString: QueryStringType) {
    this.queryString = queryString
  }
  
  private stringifyQuery(queryObj: any) {
    const excludedFields = ['page']
    excludedFields.forEach((el: string) => delete queryObj[el as keyof QueryStringType])
    return JSON.stringify(queryObj)
  }
  //only return ids
  public async filter() {
    const perPage = 8
    const queryObj = {...this.queryString}
    console.log(queryObj);
    
    let queryStr: string = this.stringifyQuery(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex|in|or|elemMatch|eq)\b/g, match => '$'+match)
    
    this.query = await Products.find(JSON.parse(queryStr))
              .select('_id') 
              .skip(perPage * (this.queryString?.page - 1))
              .limit(perPage*(this.queryString?.page-1)+perPage*5)
              .exec()

    //.select('name sku images price minPrice maxPrice')

    return this
  }
}

export default ProductFeature