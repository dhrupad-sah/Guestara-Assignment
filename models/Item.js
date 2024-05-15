const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean, required: true },
  tax: { type: Number, required: function() { return this.taxApplicability; } },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  subcategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' }
});

// // Middleware to calculate totalAmount
// itemSchema.pre('save', function(next) {
//   const tax = this.taxApplicability ? this.tax : 0;
//   const taxAmount = (this.baseAmount * tax) / 100;
//   this.totalAmount = this.baseAmount + taxAmount - this.discount;
//   next();
// });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;