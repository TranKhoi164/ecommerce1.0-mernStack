import express, { Express, Application } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import accountRoutes from "./resources/accountManagement/accountManagement.routes";
import addressRoutes from "./resources/address/address.routes";
import fileUpload from "express-fileupload";
import cors from 'cors'
import cookies from 'cookie-parser'
import uploadRoutes from "./resources/uploadMedia/upload.routes";
import pageRoutes from "./resources/page/page.routes";
import subPageRoutes from "./resources/subPage/subPage.routes";
import categoryRoutes from "./resources/category/category.routes";
import subCategoryRoutes from "./resources/subCategory/subCategory.routes";
import attributeRoutes from "./resources/attribute/attribute.routes";
import productRoutes from "./resources/product/product.routes";
import inventoryRoutes from "./resources/inventory/inventory.routes";
import orderRoutes from "./resources/order/order.routes";
import orderManagementRoutes from "./resources/orderManagement/orderManagement.routes";
import ratingRoutes from "./resources/rating/rating.routes";

class App {
  public express: Application
  public port: number

  constructor(port: number) {
    this.express = express()
    this.port = port
    this.initializeMiddleware()
    this.initializeDatabaseConnection()
    this.initializeRouter()
  }
 
  private initializeMiddleware(): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded({extended: false}))
    this.express.use(fileUpload({useTempFiles: true}))
    this.express.use(cors({origin: process.env.CLIENT_URL}))
    this.express.use(cookies())
  }

  private initializeRouter(): void {
    this.express.use('/account', accountRoutes)
    this.express.use('/address', addressRoutes)
    this.express.use('/upload', uploadRoutes)
    this.express.use('/page', pageRoutes)
    this.express.use('/page', subPageRoutes)
    this.express.use('/category', categoryRoutes)
    this.express.use('/category', subCategoryRoutes)
    this.express.use('/attribute', attributeRoutes)
    this.express.use('/product', productRoutes)
    this.express.use('/inventory', inventoryRoutes)
    this.express.use('/order', orderRoutes)
    this.express.use('/orderManagement', orderManagementRoutes)
    this.express.use('/rating', ratingRoutes)
  }

  private initializeDatabaseConnection(): void {
    const mongoUrl = process.env.MONGO_URI
    mongoose.connect(String(mongoUrl), (err: any) => {
      if (err) throw new Error(err)
      else console.log("Connect to mongodb");
    })
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    })
  }
}

export default App