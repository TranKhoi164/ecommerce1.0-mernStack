import {Request, Response} from 'express'

interface addressInterface {
  createNewAddress(req: Request, res: Response): Response
  getAddressDetail(req: Request, res: Response): Response
}

export default addressInterface