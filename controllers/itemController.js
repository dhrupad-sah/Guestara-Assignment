const Item = require('../models/Item');
const SubCategory = require('../models/Subcategory');
const Category = require('../models/Category');

// CREATE Item
exports.createItem = async (req, res) => {
  try {
    const { subcategoryId, categoryId } = req.params;
    let parent;
    if (subcategoryId) {
      parent = await SubCategory.findById(subcategoryId);
      if (!parent) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
    } else if (categoryId) {
      parent = await Category.findById(categoryId);
      if (!parent) {
        return res.status(404).json({ error: 'Category not found' });
      }
    } else {
      return res.status(400).json({ error: 'Either subcategoryId or categoryId is required' });
    }

    const { name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;
    const totalAmount = baseAmount - discount;
    const item = new Item({ name, image, description, taxApplicability, tax, baseAmount, discount, totalAmount, category: categoryId, subcategory: subcategoryId });
    await item.save();
    if (subcategoryId) {
      parent.items.push(item._id);
      await parent.save();
    }
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET items by category
exports.getItemsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).populate('items');
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET items by subcategory
exports.getItemsBySubCategory = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const subcategory = await SubCategory.findById(subcategoryId).populate('items');
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.json(subcategory.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET item by Name
exports.getItemByName = async (req, res)=> {
  try {
    const name = req.params.name;
    const item = await Item.find({name: name});
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE item

exports.updateItem = async (req, res) => {
    try {
      const { name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;
      const item = await Item.findByIdAndUpdate(
        req.params.id,
        { name, image, description, taxApplicability, tax, baseAmount, discount },
        { new: true }
      );
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };