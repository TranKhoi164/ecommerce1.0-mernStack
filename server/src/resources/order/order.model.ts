import mongoose from "mongoose";
import OrderManagement from "../orderManagement/orderManagement.model";

const {ObjectId} = mongoose.Schema.Types

const orderModel = new mongoose.Schema({
  inventory: {
    type: ObjectId,
    ref: 'inventory',
  },
  account: {
    type: ObjectId,
    ref: 'account'
  },
  isRated: {
    type: Number,
    default: 0,
  },
  status: String,
  quantity: Number,
  payment: String,
  shippingAddress: {
    type: ObjectId,
    ref: 'address'
  }
}, {
  timestamps: true
})

const Orders = mongoose.model('order', orderModel)
export default Orders