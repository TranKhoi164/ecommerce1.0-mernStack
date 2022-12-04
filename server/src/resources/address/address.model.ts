import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const addressModel = new mongoose.Schema({
  account: {
    type: ObjectId,
    ref: 'Account',
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  ward: {
    type: String,
    trim: true,
    required: true,
  },
  district: {
    type: String,
    trim: true,
    required: true,
  },
  province: {
    type: String,
    trim: true,
    required: true,
  },
}, {
  timestamps: true
})

const Addresses = mongoose.model('Address', addressModel)
export default Addresses