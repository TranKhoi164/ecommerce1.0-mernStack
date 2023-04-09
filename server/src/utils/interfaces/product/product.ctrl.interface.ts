import { Request, Response } from "express";

interface QueryType {
  page: number
  sort?: number
  subPage?: string
  category?: string
  subCategory?: string
  attributes?: Array<string>
  price?: number
}

interface ProductCtrlInterface {
  createProduct(req: Request, res: Response): Promise<void>
  // getProductList(req: Request, res: Response): Promise<void>
  // updateProduct(req: Request, res: Response): Promise<void>
  getProducts(req: Request<{}, {}, {}, QueryType>, res: Response): Promise<void>
  getProductsDetail(req: Request<{}, {}, {products: Array<string>}, {}>, res: Response): Promise<void>
  getProduct(req: Request, res: Response): Promise<void>
  deleteProduct(req: Request, res: Response): Promise<void>
}

export default ProductCtrlInterface