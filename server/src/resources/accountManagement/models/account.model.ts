import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

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
  fullName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    default: 'nam'
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dfkkrqh2s/image/upload/v1668354385/ecommerce/avatar/Screenshot_2022-02-04_181853_u6m6cf_w3hnjo.png'
  },
  dateOfBirth: {
    type: String
  },
  role: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Accounts = mongoose.model("Account", accountModel)
export default Accounts