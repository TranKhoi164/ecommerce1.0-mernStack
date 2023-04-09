import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const inventoryModel = new mongoose.Schema({
  sku: {
    type: String,
    unique: true,
  },
  product: {
    type: ObjectId,
    ref: 'product'
  },
  attribute: Object,
  quantity: {
    type: Number,
    min: [0, 'Không đủ sản phẩm trong kho'],
  },
  price: Number,
  image: String
})

const Inventories = mongoose.model('inventory', inventoryModel)
export default Inventories