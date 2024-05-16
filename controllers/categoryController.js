const Category = require('../models/Category');

// CREATE Category
// This function handles the creation of a new category
exports.createCategory = async (req, res) => {
  try {
    // Destructure the required properties from the request body
    const { name, image, description, taxApplicability, tax, taxType } = req.body;

    // Create a new category instance using the Category model
    const category = new Category({ name, image, description, taxApplicability, tax, taxType });

    // Save the new category to the database
    await category.save();

    // Return the created category with a 201 (Created) status code
    res.status(201).json(category);
  } catch (err) {
    // If an error occurs during category creation, return a 400 (Bad Request) status code with the error message
    res.status(400).json({ error: err.message });
  }
};

// GET all categories
// This function retrieves all categories from the database
exports.getAllCategories = async (req, res) => {
  try {
    // Find all categories using the Category model
    const categories = await Category.find();

    // Return the fetched categories as the response
    res.json(categories);
  } catch (err) {
    // If an error occurs during category retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET category by name or ID
// This function retrieves a specific category by its ID
exports.getCategoryById = async (req, res) => {
  try {
    // Find the category by its ID using the Category model
    const category = await Category.findById(req.params.id);

    // If the category is not found, return a 404 (Not Found) status code with an error message
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Return the fetched category as the response
    res.json(category);
  } catch (err) {
    // If an error occurs during category retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// UPDATE category
// This function updates an existing category by its ID
exports.updateCategory = async (req, res) => {
  try {
    // Destructure the properties to be updated from the request body
    const { name, image, description, taxApplicability, tax, taxType } = req.body;

    // Find the category by its ID and update its properties using the Category model
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, image, description, taxApplicability, tax, taxType },
      { new: true } // Return the updated document instead of the original
    );

    // If the category is not found, return a 404 (Not Found) status code with an error message
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Return the updated category as the response
    res.json(category);
  } catch (err) {
    // If an error occurs during category update, return a 400 (Bad Request) status code with the error message
    res.status(400).json({ error: err.message });
  }
};