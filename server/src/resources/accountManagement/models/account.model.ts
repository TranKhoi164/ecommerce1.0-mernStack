import mongoose from "mongoose";
const ObjectId = new mongoose.Types.ObjectId

const accountModel = new mongoose.Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  address: {
    type: ObjectId,
    ref: 'address',
  },
  fullName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String
  },
  avatar: {
    type: String,
    default: ' default: "https://res.cloudinary.com/dfkkrqh2s/image/upload/v1644766813/ecommerce/avatar/Screenshot_2022-02-04_181853_u6m6cf.png"'
  },
  dateOfBirth: {
    type: Date
  },
  role: {
    type: Number,
  }
}, {
  timestamps: true
})

const Accounts = mongoose.model("Account", accountModel)
export default Accounts