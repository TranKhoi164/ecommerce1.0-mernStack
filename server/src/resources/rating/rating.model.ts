import mongoose from "mongoose"

const {ObjectId} = mongoose.Schema.Types

const ratingModel = new mongoose.Schema({
  starRating: {
    type: Number,
    required: 'Chưa có đánh giá'
  },
  comment: String,
  images: [],
  product: {
    type: ObjectId,
    ref: 'product',
    required: true,
  },
  account: {
    type: ObjectId,
    ref: 'account',
    required: true,
  },
  inventory: {
    type: ObjectId,
    ref: 'inventory',
  }
}, {
  timestamps: true
})

const Ratings = mongoose.model('rating', ratingModel)
export default Ratings

