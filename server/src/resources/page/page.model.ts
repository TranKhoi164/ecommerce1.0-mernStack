import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const pageModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subPages: [
    {
      type: ObjectId,
      ref: 'subPage',
    }
  ],
  slug: String,
})

const Pages = mongoose.model('page', pageModel)
export default Pages