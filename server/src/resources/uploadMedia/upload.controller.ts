import cloudinary from 'cloudinary'
import { Request, Response } from 'express'
import UploadInterface from '../../utils/interfaces/uploadMedia/upload.ctrl.interface'
import fileUpload = require('express-fileupload')
import Accounts from '../accountManagement/models/account.model'
import handleException from '../../utils/handleExceptions'
import fs from 'fs'

type FileArray = fileUpload.FileArray
type UploadedFile = fileUpload.UploadedFile
type Options = fileUpload.Options;

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

class UploadController implements UploadInterface {
  uploadAvatar(req: Request, res: Response): void {
    const file = req.files?.file as fileUpload.UploadedFile

    cloudinary.v2.uploader.upload(file?.tempFilePath, {
      folder: 'ecommerce/avatar', width: 150, height: 150, crop: 'fill'
    }, async (e: any, result: any) => {
      if (e) {
        handleException(400, e.message, res)
        return
      }

      await Accounts.findOneAndUpdate({_id: req.body._id}, {avatar: result.secure_url})
      res.json({message: 'Cập nhập thành công'})
    })
    fs.unlink(file?.tempFilePath, function(err: any) {
      if (err) {
        throw new Error(err)
      }
    })
  }

  uploadProductImage(req: Request, res: Response): void {
    try {
      const file = req.files?.file as fileUpload.UploadedFile

      cloudinary.v2.uploader.upload(file?.tempFilePath, {
        folder: 'ecommerce/product',
      }, async (e: any, result: any) => {
        if (e) {
          handleException(400, e.message, res)
          return
        }
        res.json({image_url: result.secure_url, public_id: result.public_id})
      })
      fs.unlink(file?.tempFilePath, function(err: any) {
        if (err) {
          throw new Error(err)
        }
      })
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  deleteImages(req: Request, res: Response): void {
    try {
      //images is array of public_id
      const images = req.body.images

      for (let image of images) {
        cloudinary.v2.uploader.destroy(image, (e: any, result: any) => {
          if (e) {
            handleException(400, e.message, res)
            return
          }
        })
      }
      res.json({message: 'Xóa thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default UploadController