import mongoose from "mongoose";

const attributeModel = new mongoose.Schema({
  name: String,
  values: Array
})

const Attributes = mongoose.model('attribute', attributeModel)
export default Attributes