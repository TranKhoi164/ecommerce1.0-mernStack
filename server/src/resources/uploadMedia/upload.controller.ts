import cloudinary from 'cloudinary'
import { Request, Response } from 'express'
import uploadInterface from '../../utils/interfaces/uploadMedia.interface'

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

class uploadController implements uploadInterface {
  uploadAvatar(req: Request, res: Response): Response {
    return res.json({msg: 'Hello world'})
  }
  uploadImage(req: Request, res: Response): Response {
    return res.json({msg: 'Hello world'})
  }
}