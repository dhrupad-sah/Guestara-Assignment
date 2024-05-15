const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: API endpoints for Categories
 */

/**
 * @swagger
 * /subcategories/create/{categoryId}:
 *   post:
 *     summary: Create a new subcategory
 *     tags: 
 *       - Subcategories
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         description: ID of the category under which the subcategory will be created
 *         required: true
 *         type: string
 *     requestBody:
 *       description: Subcategory details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the subcategory
 *               image:
 *                 type: string
 *                 description: URL of the image for the subcategory
 *               description:
 *                 type: string
 *                 description: Description of the subcategory
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: ID of the created subcategory
 *             name:
 *               type: string
 *               description: Name of the subcategory
 *             image:
 *               type: string
 *               description: URL of the image for the subcategory
 *             description:
 *               type: string
 *               description: Description of the subcategory
 *       400:
 *         description: Bad request
 */

// CREATE SubCategory
router.post('/create/:categoryId', subcategoryController.createSubCategory);

/**
 * @swagger
 * /subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: 
 *       - Subcategories
 *     responses:
 *       200:
 *         description: List of subcategories
 *  
 *       500:
 *         description: Internal server error
 */

// GET all subcategories
router.get('/', subcategoryController.getAllSubCategories);

/**
 * @swagger
 * /subcategories/category/{categoryId}:
 *   get:
 *     summary: Get subcategories by category
 *     tags: 
 *       - Subcategories
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         description: ID of the category
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of subcategories for the specified category
 *        
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

// GET subcategories by category
router.get('/category/:categoryId', subcategoryController.getSubCategoriesByCategory);

/**
 * @swagger
 * /subcategories/{id}:
 *   get:
 *     summary: Get subcategory by ID
 *     tags: 
 *       - Subcategories
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the subcategory
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Subcategory details
 *         
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */

// GET subcategory by ID
router.get('/:id', subcategoryController.getSubCategoryById);

/**
 * @swagger
 * /subcategories/update/{id}:
 *   put:
 *     summary: Update a subcategory
 *     tags: 
 *       - Subcategories
 *     parameters:
 *       - name: id
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
 *     responses:
 *       200:
 *         description: Updated subcategory
 *         
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */

// UPDATE subcategory
router.put('/update/:id', subcategoryController.updateSubCategory);

module.exports = router;