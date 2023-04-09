import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: String,
  page: {
    type: ObjectId,
    ref: 'page'
  },
  subPage:{
    type: ObjectId,
    ref: 'subPage'
  },
  subCategories: [
    {
      type: ObjectId,
      ref: 'subCategory'
    }
  ],
})

const Categories = mongoose.model('category', categoryModel)
export default Categories