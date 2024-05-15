const Category = require('../models/Category');

// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    const { name, image, description, taxApplicability, tax, taxType } = req.body;
    const category = new Category({ name, image, description, taxApplicability, tax, taxType });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET category by name or ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  try {
    const { name, image, description, taxApplicability, tax, taxType } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, image, description, taxApplicability, tax, taxType },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};