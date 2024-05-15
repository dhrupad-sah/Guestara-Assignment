const SubCategory = require('../models/Subcategory');
const Category = require('../models/Category');

// CREATE SubCategory
exports.createSubCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const { name, image, description } = req.body;
    const taxApplicability = category.taxApplicability;
    const tax = category.tax;
    const subcategory = new SubCategory({ name, image, description,taxApplicability,tax, category: categoryId });
    await subcategory.save();

    category.subcategories.push(subcategory._id);
    await category.save();
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all subcategories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET subcategories by category
exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).populate('subcategories');
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category.subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET subcategory by ID
exports.getSubCategoryById = async (req, res) => {
  try {
    const subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.json(subcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE subcategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const subcategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, image, description },
      { new: true }
    );
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.json(subcategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};