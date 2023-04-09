import OrderCtrlInterface from "../../utils/interfaces/order/order.ctrl.interface";
import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import Orders from "./order.model";
import OrderManagement from "../orderManagement/orderManagement.model";
import Inventories from "../inventory/inventory.model";

class OrderCtrl implements OrderCtrlInterface {
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { status, inventory, payment, shippingAddress, quantity } = req.body.order
      console.log('body: ', req.body);

      const updateOrder = {
        status: status, inventory: inventory, payment: payment, shippingAddress: shippingAddress
      }

      const newOrder = await Orders.findOneAndUpdate({ account: req.body._id, inventory: inventory, shippingAddress: shippingAddress, status: 'pending' }, 
              {...updateOrder, $inc: { quantity: quantity }},
              { new: true, upsert: true}
            )

    

      await OrderManagement.findOneAndUpdate({account: req.body._id}, 
        { $addToSet: {[status]: newOrder._id} },
        { upsert: true }
      )
      await newOrder.populate([
        {
          path: 'inventory',
          select: '-_id -__v',
          populate: {
            path: 'product',
            select: 'name -_id'
          }
        },
        { path: 'shippingAddress', select: '-account  -_id -__v' }]
      )
      res.json({message: 'Tạo đơn hàng thành công', order: newOrder})
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }

  public async getOrderInfor(req: Request, res: Response): Promise<void> {
    try {
      const {order_id} = req.params
      const order = await Orders.findById(order_id).populate([
        {
          path: 'inventory',
          select: '-__v',
          populate: {
            path: 'product',
            select: 'name sku _id'
          }
        },
        { path: 'shippingAddress', select: '-account  -_id -__v' },
        { path: 'account', select: 'username email fullName'}]
      )
      res.json({order: order})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async getPurchasedOrder(req: Request, res: Response): Promise<void> {
    try {
      const products = await Orders.find({status: { $in: ['beingShipped', 'accomplished']}})
      .populate([
        {
          path: 'inventory',
          select: '-_id -__v',
          populate: {
            path: 'product',
            select: 'name sku -_id'
          }
        },
        { path: 'shippingAddress', select: '-account  -_id -__v' },
        { path: 'account', select: 'username email fullName'}]
      )
      res.json({products: products})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  
  public async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const queryObj = req.query
      
      let queryStr: string = JSON.stringify(queryObj)
      queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex|in|or|elemMatch|eq)\b/g, match => '$'+match)

      await Orders.updateMany(JSON.parse(queryStr), {...req.body.order})
      res.json({message: 'Cập nhập đơn hàng thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const {status, _id} = req.body.order

      console.log(status + ' ' + _id);
      await Inventories.findOneAndUpdate({})
      await OrderManagement.findOneAndUpdate({account: req.body._id}, {
        $pull: { [status]:_id}
      })
      await Orders.findByIdAndDelete(req.body.order._id, async (err: any, data: any) => {
        await Inventories.findByIdAndUpdate(data.inventory, {
          $inc: {quantity: data.quantity}
        }) 
      })
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default OrderCtrl