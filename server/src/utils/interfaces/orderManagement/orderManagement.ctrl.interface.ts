import { Request, Response } from "express";

interface OrderManagementInterface {
  getOrderManagementInfor(req: Request, res: Response): Promise<void>
  getOrdersInCart(req: Request, res: Response): Promise<void>
  getPurchasedOrdersOfAccount(req: Request, res:Response): Promise<void>
  getPurchasedOrders(req: Request, res: Response): Promise<void>
  confirmOrder(req: Request, res: Response): Promise<void>
  cancelOrder(req: Request, res: Response): Promise<void>
  purchaseOrders(req: Request, res: Response): Promise<void>
  pushOrder(req: Request, res: Response): Promise<void>,
  removeOrder(req: Request, res: Response): Promise<void>
}

export default OrderManagementInterface