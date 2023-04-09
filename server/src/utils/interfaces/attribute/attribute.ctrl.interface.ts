import {Request, Response} from 'express'

interface AttributeCtrlInterface {
  createAttribute(req: Request, res: Response): Promise<void> 
  getAttributeList(req: Request, res: Response): Promise<void>
  addAttributeValue(req: Request, res: Response): Promise<void>  
  deleteAttributeValue(req: Request, res: Response): Promise<void>
  deleteAttribute(req: Request, res: Response): Promise<void> 
}

export default AttributeCtrlInterface