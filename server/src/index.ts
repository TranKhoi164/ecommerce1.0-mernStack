import App from "./app";
import dotenv from 'dotenv'
import { Request, Response } from "express";

dotenv.config()

const app = new App(Number(process.env.PORT))

app.express.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.listen()