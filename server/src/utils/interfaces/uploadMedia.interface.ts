import {Request, Response} from'express'

interface uploadInterface {
  uploadAvatar(req: Request, res: Response): Response
  uploadImage(req: Request, res: Response): Response
}

export default uploadInterface