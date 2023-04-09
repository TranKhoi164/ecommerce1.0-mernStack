import {Request, Response} from 'express'

interface addressInterface {
  createNewAddress(req: Request, res: Response): Promise<void> 
  getUserAddressList(req: Request, res: Response): Promise<void>
  updateAddress(req: Request, res: Response): Promise<void>  
  deleteAddress(req: Request, res: Response): Promise<void> 
}

export default addressInterface