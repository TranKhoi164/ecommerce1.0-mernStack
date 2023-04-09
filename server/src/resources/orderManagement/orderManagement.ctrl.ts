import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import OrderManagementInterface from "../../utils/interfaces/orderManagement/orderManagement.ctrl.interface";
import Orders from "../order/order.model";
import OrderManagement from "./orderManagement.model";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types

class OrderManagementCtrl implements OrderManagementInterface {
  // public async getOrdersByAccountId(req: Request, res: Response): Promise<void> {
  //   try {
  //     const orders = await OrderManagement.find({account: req.body._id})
  //     res.json({orders: orders})
  //   } catch (e: any) {
  //     handleException(500, e.message, res)
  //   }
  // }
  // .populate({
  //   path: 'cart',
  //   populate: [
  //     {
  //       path: 'inventory',
  //       select: '-quantity -_id -__v',
  //       populate: {
  //         path: 'product',
  //         select: 'name -_id'
  //       }
  //     },
  //     { path: 'shippingAddress', select: '-account  -_id -__v' }
  //   ],
  //   select: '-account',
  // })
  public async getOrderManagementInfor(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body._id);
      const orderManagement = await OrderManagement.findOne({account: req.body._id})
      .populate({
        path: 'pending accomplished beingShipped cancelled',
        populate: [
          {
            path: 'inventory', select: '-_id -__v',
            populate: { path: 'product', select: 'name -_id' }
          },
          { path: 'shippingAddress', select: '-account  -_id -__v' }
        ],
      }).select('-__v -account')

      res.json({order_management: orderManagement})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getOrdersInCart(req: Request, res: Response): Promise<void> {
    try {
      const orders = await OrderManagement.findOne({account: req.body._id})
        .populate({
          path: 'pending',
          select: '-accomplished -beingShipped -cancelled',
          populate: [
            {
              path: 'inventory',
              select: '-_id -__v',
              populate: {
                path: 'product',
                select: 'name -_id'
              }
            },
            { path: 'shippingAddress', select: '-account  -_id -__v' }
          ],
          
        }).select(['-cancelled', '-accomplished', '-beingShipped', '-account'])
      
        res.json({orders: orders})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }


  public async getPurchasedOrdersOfAccount(req: Request, res: Response): Promise<void> {
     try {
      const orders = await OrderManagement.findOne({account: req.body._id})
        .populate([
          {
            path: 'beingShipped accomplished cancelled',
            populate: [
              {
                path: 'inventory',
                select: '-_id -__v',
                populate: {
                  path: 'product',
                  select: 'name -_id'
                }
              },
              { path: 'shippingAddress', select: '-account  -_id -__v' }
            ],
            select: '-account',
          },
        ]).select(['-pending', '-account'])

      res.json({orders: orders})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async getPurchasedOrders(req: Request, res: Response): Promise<void> {
    try {
      const orderManagements = await OrderManagement.find({ 
        $or: [
          { beingShipped: { $exists: true, $ne: [] } },
          { accomplished: { $exists: true, $ne: [] }},
          { cancelled: { $exists: true, $ne: [] }},
        ]
       })
        .populate([
          {
            path: 'beingShipped accomplished cancelled',
            populate: [
              {
                path: 'inventory',
                select: '-_id -__v',
                populate: {
                  path: 'product',
                  select: 'name -_id'
                }
              },
              { path: 'shippingAddress', select: '-account  -_id -__v' },
            ],
            select: '-account'
          },
          { path: 'account', select: 'email fullName avatar ' },
        ]).select(['-pending'])

      res.json({orderManagements: orderManagements})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async purchaseOrders(req: Request, res: Response): Promise<void> {
    try {
      const { orders } = req.body
      await OrderManagement.findOneAndUpdate({account: req.body._id}, {
        $pullAll: {
          pending: orders
        },
        $addToSet: {
          beingShipped: { $each: orders }
        }
      })
      console.log(orders)
      await Orders.updateMany({ _id: {$in: orders}},{status: 'beingShipped'})
      res.json({message: 'Request thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async confirmOrder(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = req.body.order

      await OrderManagement.findOneAndUpdate({account: req.body._id}, {
        $pull: {
          beingShipped: _id
        },
        $addToSet: {
          accomplished: _id
        }
      })
      await Orders.findOneAndUpdate({ _id: _id},{status: 'accomplished'})
      res.json({message: 'Đã xác nhận đơn hàng'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async cancelOrder(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = req.body.order
      await OrderManagement.findOneAndUpdate({account: req.body._id}, {
        $pull: {
          beingShipped: _id
        },
        $addToSet: {
          cancelled: _id
        }
      })
      await Orders.findOneAndUpdate({ _id: _id},{status: 'cancelled'})
      res.json({message: 'Đã hủy đơn hàng'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async pushOrder(req: Request, res: Response): Promise<void> {
    try {
      await OrderManagement.findOneAndUpdate({account: req.body._id}, 
        { $push: {orders: req.params.order_id} },
        { upsert: true }
      )
      res.json({message: 'Thêm đơn hàng thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async removeOrder(req: Request, res: Response): Promise<void> {
    try {
      await OrderManagement.updateOne({ account: req.body._id }, {
        $pullAll: {
            orders: [req.params.order_id],
        },
      });
      res.json({message: 'Xóa đơn hàng thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default OrderManagementCtrl