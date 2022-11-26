import express, { Express, Application } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import accountRoutes from "./resources/accountManagement/accountManagement.routes";
import addressRoutes from "./resources/address/address.routes";
import fileUpload from "express-fileupload";

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
  }

  private initializeRouter(): void {
    this.express.use('/account', accountRoutes)
    this.express.use('/address', addressRoutes)
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