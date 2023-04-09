import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const subPageModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  categories: [
    {
      type: ObjectId,
      ref: 'category',
    }
  ],
  page: {
    type: ObjectId,
    required: true,
    ref: 'page'
  },
  slug: String,
  description: String
})

const SubPages = mongoose.model('subPage', subPageModel)
export default SubPages