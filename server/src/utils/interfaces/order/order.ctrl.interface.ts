import { Request, Response } from "express";

interface OrderCtrlInterface {
  createOrder(req: Request, res: Response): void
  getOrderInfor(req: Request, res: Response): Promise<void>
  getPurchasedOrder(req: Request, res: Response): Promise<void>
  updateOrder(req: Request, res: Response): Promise<void>
  deleteOrder(req: Request, res: Response): Promise<void>
}

export default OrderCtrlInterface