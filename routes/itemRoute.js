const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const Item = require('../models/Item');

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API endpoints for Items
 */

// CREATE Item

/**
 * @swagger
 * /items/create/subcategory/{subcategoryId}:
 *   post:
 *     summary: Create an item under a subcategory
 *     tags: 
 *       - Items
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         description: ID of the subcategory
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *               baseAmount:
 *                 type: number
 *               discount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */

router.post('/create/subcategory/:subcategoryId', itemController.createItem);

/**
 * @swagger
 * /items/create/category/{categoryId}:
 *   post:
 *     summary: Create an item under a category
 *     tags: 
 *       - Items
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         description: ID of the category
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *               baseAmount:
 *                 type: number
 *               discount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

router.post('/create/category/:categoryId', itemController.createItem);

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: 
 *       - Items
 *     responses:
 *       200:
 *         description: List of items
 *       500:
 *         description: Internal server error
 */

// GET all items
router.get('/', itemController.getAllItems);

/**
 * @swagger
 * /items/category/{categoryId}:
 *   get:
 *     summary: Get items by category
 *     tags: 
 *       - Items
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         description: ID of the category
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of items belonging to the specified category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

// GET items by category
router.get('/category/:categoryId', itemController.getItemsByCategory);

/**
 * @swagger
 * /items/subcategory/{subcategoryId}:
 *   get:
 *     summary: Get items by subcategory
 *     tags: 
 *       - Items
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         description: ID of the subcategory
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of items belonging to the specified subcategory
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */

// GET items by subcategory
router.get('/subcategory/:subcategoryId', itemController.getItemsBySubCategory);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: 
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the item
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Details of the item
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */

// GET item by ID
router.get('/:id', itemController.getItemById);

/**
 * @swagger
 * /items/update/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: 
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the item
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *               baseAmount:
 *                 type: number
 *               discount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */


// UPDATE item
router.put('/update/:id', itemController.updateItem);

router.get("/getByName/:name", itemController.getItemByName);

module.exports = router;