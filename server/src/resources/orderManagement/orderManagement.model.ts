import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const orderManagementModel = new mongoose.Schema({
  account: {
    type: ObjectId,
    ref: 'account',
    unique: true
  },
  pending: [{
    type: ObjectId,
    ref: 'order',
  }],
  beingShipped: [{
    type: ObjectId,
    ref: 'order',
  }],
  accomplished: [{
    type: ObjectId,
    ref: 'order',
  }],
  cancelled: [{
    type: ObjectId,
    ref: 'order',
  }]
})

const OrderManagement = mongoose.model('orderManagement', orderManagementModel)
export default OrderManagement