import {Request, Response} from'express'

interface UploadInterface {
  uploadAvatar(req: Request, res: Response): void
  uploadProductImage(req: Request, res: Response): void
  deleteImages(req: Request, res: Response): void
}

export default UploadInterface