import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

interface findD {
  subPage: number
}

interface ProductBucketInterface {
  insertProduct(subPageId: String, productId: String): Promise<void>
  productPaging(subPageId: number, page: number, pageSize: number): Promise<HydratedDocument<findD>>
}

export default ProductBucketInterface