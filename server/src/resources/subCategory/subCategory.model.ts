import mongoose from "mongoose"

const {ObjectId} = mongoose.Schema.Types

const subCategoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
  subPage: {
    type: ObjectId,
    ref: 'SubPage'
  },
  category: {
    type: ObjectId,
    ref: 'Category',
  }
})

const SubCategories = mongoose.model('subCategory', subCategoryModel)
export default SubCategories

