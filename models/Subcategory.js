const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean, required: true, default: null },
  tax: { type: Number, default: null },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const SubCategory = mongoose.model('SubCategory', subcategorySchema);

module.exports = SubCategory;