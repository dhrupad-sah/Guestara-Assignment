const Item = require('../models/Item');
const SubCategory = require('../models/Subcategory');
const Category = require('../models/Category');

// CREATE Item
// This function handles the creation of a new item
exports.createItem = async (req, res) => {
  try {
    // Destructure subcategoryId and categoryId from the request parameters
    const { subcategoryId, categoryId } = req.params;
    let parent;

    // Determine the parent (SubCategory or Category) based on the provided IDs
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

    // Destructure the required properties from the request body
    const { name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;

    // Calculate the total amount
    const totalAmount = baseAmount - discount;

    // Create a new item instance using the Item model
    const item = new Item({
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      totalAmount,
      category: categoryId,
      subcategory: subcategoryId
    });

    // Save the new item to the database
    await item.save();

    // If the item is created under a subcategory, add the item to the subcategory's items array
    if (subcategoryId) {
      parent.items.push(item._id);
      await parent.save();
    }

    // Return the created item with a 201 (Created) status code
    res.status(201).json(item);
  } catch (err) {
    // If an error occurs during item creation, return a 400 (Bad Request) status code with the error message
    res.status(400).json({ error: err.message });
  }
};

// GET all items
// This function retrieves all items from the database
exports.getAllItems = async (req, res) => {
  try {
    // Find all items using the Item model
    const items = await Item.find();

    // Return the fetched items as the response
    res.json(items);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET items by category
// This function retrieves all items under a specific category
exports.getItemsByCategory = async (req, res) => {
  try {
    // Find the category by its ID using the Category model and populate the 'items' field
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).populate('subcategories');
    const subcategory = await SubCategory.findById(category.subcategories[0]._id).populate('items');
    // If the category is not found, return a 404 (Not Found) status code with an error message
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Return the fetched items as the response
    res.json(subcategory.items);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET items by subcategory
// This function retrieves all items under a specific subcategory
exports.getItemsBySubCategory = async (req, res) => {
  try {
    // Find the subcategory by its ID using the SubCategory model and populate the 'items' field
    const subcategoryId = req.params.subcategoryId;
    const subcategory = await SubCategory.findById(subcategoryId).populate('items');

    // If the subcategory is not found, return a 404 (Not Found) status code with an error message
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    // Return the fetched items as the response
    res.json(subcategory.items);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET item by ID
// This function retrieves a specific item by its ID
exports.getItemById = async (req, res) => {
  try {
    // Find the item by its ID using the Item model
    const item = await Item.findById(req.params.id);

    // If the item is not found, return a 404 (Not Found) status code with an error message
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Return the fetched item as the response
    res.json(item);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// GET item by Name
// This function retrieves an item by its name
exports.getItemByName = async (req, res) => {
  try {
    // Get the name from the request parameters
    const name = req.params.name;

    // Find the item by its name using the Item model
    const item = await Item.find({ name: name });

    // If the item is not found, return a 404 (Not Found) status code with an error message
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Return the fetched item as the response
    res.json(item);
  } catch (err) {
    // If an error occurs during item retrieval, return a 500 (Internal Server Error) status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// UPDATE item
// This function updates an existing item by its ID
exports.updateItem = async (req, res) => {
  try {
    // Destructure the properties to be updated from the request body
    const { name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;

    // Find the item by its ID and update its properties using the Item model
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, image, description, taxApplicability, tax, baseAmount, discount },
      { new: true } // Return the updated document instead of the original
    );

    // If the item is not found, return a 404 (Not Found) status code with an error message
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Return the updated item as the response
    res.json(item);
  } catch (err) {
    // If an error occurs during item update, return a 400 (Bad Request) status code with the error message
    res.status(400).json({ error: err.message });
  }
};