const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Item model
const itemSchema = new Schema({
  name: { type: String, required: true }, // Item name (required)
  image: { type: String, required: true }, // Item image URL (required)
  description: { type: String, required: true }, // Item description (required)
  taxApplicability: { type: Boolean, required: true }, // Indicates if tax is applicable for the item (required)
  tax: {
    type: Number,
    required: function() { return this.taxApplicability; } // Tax is required if taxApplicability is true
  },
  baseAmount: { type: Number, required: true }, // Base amount of the item (required)
  discount: { type: Number, default: 0 }, // Discount applied to the item (default is 0)
  totalAmount: { type: Number, required: true }, // Total amount after applying tax and discount (required)
  category: { type: Schema.Types.ObjectId, ref: 'Category' }, // Reference to the parent category
  subcategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' } // Reference to the parent subcategory (optional)
});

// Create the Item model from the schema
const Item = mongoose.model('Item', itemSchema);

// Export the Item model for use in other parts of the application
module.exports = Item;