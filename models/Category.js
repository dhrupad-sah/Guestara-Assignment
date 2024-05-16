const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Category model
const categorySchema = new Schema({
  name: { type: String, required: true }, // Category name (required)
  image: { type: String, required: true }, // Category image URL (required)
  description: { type: String, required: true }, // Category description (required)
  taxApplicability: { type: Boolean, required: true }, // Indicates if tax is applicable for the category (required)
  tax: {
    type: Number,
    required: function() { return this.taxApplicability; } // Tax is required if taxApplicability is true
  },
  taxType: { type: String }, // Type of tax (optional)
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }] // Array of subcategory IDs associated with this category
});

// Create the Category model from the schema
const Category = mongoose.model('Category', categorySchema);

// Export the Category model for use in other parts of the application
module.exports = Category;