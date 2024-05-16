const SubCategory = require('../models/Subcategory');
const Category = require('../models/Category');

// CREATE SubCategory
// This function handles the creation of a new subcategory under a specific category
exports.createSubCategory = async (req, res) => {
  try {
    // Get the categoryId from the request parameters
    const categoryId = req.params.categoryId;

    // Find the category by its ID
    const category = await Category.findById(categoryId);

    // If the category is not found, return a 404 (Not Found) status code with an error message
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Destructure the required properties from the request body
    const { name, image, description } = req.body;

    // Set the taxApplicability and tax values based on the parent category
    const taxApplicability = category.taxApplicability;
    const tax = category.tax;

    // Create a new subcategory instance using the SubCategory model
    const subcategory = new SubCategory({ name, image, description, taxApplicability, tax, category: categoryId });

    // Save the new subcategory to the database
    await subcategory.save();

    // Add the subcategory to the category's subcategories array
    category.subcategories.push(subcategory._id);
    await category.save();

    // Return the created subcategory with a 201 (Created) status code
    res.status(201).json(subcategory);
  } catch (err) {
    // If an error occurs during subcategory creation, return a 400 (Bad Request) status code with the error message
    res.status(400).json({ error: err.message });
  }
};

// GET all subcategories
// This function retrieves all subcategories from the database
exports.getAllSubCategories = async (req, res) => {
  try {
    // Find all subcategories using the SubCategory model
    const subcategories = await SubCategory.find();

    // Return the fetched subcategories as the response
    res.json(subcategories);
  } catch (err) {
    // If an error occurs during subcategory retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET subcategories by category
// This function retrieves all subcategories under a specific category
exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    // Get the categoryId from the request parameters
    const categoryId = req.params.categoryId;

    // Find the category by its ID and populate the 'subcategories' field
    const category = await Category.findById(categoryId).populate('subcategories');

    // If the category is not found, return a 404 (Not Found) status code with an error message
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Return the fetched subcategories as the response
    res.json(category.subcategories);
  } catch (err) {
    // If an error occurs during subcategory retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET subcategory by ID
// This function retrieves a specific subcategory by its ID
exports.getSubCategoryById = async (req, res) => {
  try {
    // Find the subcategory by its ID using the SubCategory model
    const subcategory = await SubCategory.findById(req.params.id);

    // If the subcategory is not found, return a 404 (Not Found) status code with an error message
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    // Return the fetched subcategory as the response
    res.json(subcategory);
  } catch (err) {
    // If an error occurs during subcategory retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// UPDATE subcategory
// This function updates an existing subcategory by its ID
exports.updateSubCategory = async (req, res) => {
  try {
    // Destructure the properties to be updated from the request body
    const { name, image, description } = req.body;

    // Find the subcategory by its ID and update its properties using the SubCategory model
    const subcategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, image, description },
      { new: true } // Return the updated document instead of the original
    );

    // If the subcategory is not found, return a 404 (Not Found) status code with an error message
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    // Return the updated subcategory as the response
    res.json(subcategory);
  } catch (err) {
    // If an error occurs during subcategory update, return a 400 (Bad Request) status code with the error message
    res.status(400).json({ error: err.message });
  }
};