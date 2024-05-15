const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for Categories
 */

/**
 * @swagger
 * /categories/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
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
 *               taxType:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Category created successfully
 *       '400':
 *         description: Bad request
 */

router.post('/create', categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: List of categories retrieved succesfully
 *       '500':
 *         description: Internal server error
 */


// GET all categories
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category data retrived using id
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */


// GET category by ID
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /categories/update/{id}:
 *   put:
 *     summary: Modify Category details
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Category to modify
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
 *               taxType:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Doctor details modified successfully
 *       '401':
 *         description: Unauthorized access
 *       '409':
 *         description: Wrong password entered
 *       '500':
 *         description: Internal server error
 */

// UPDATE category
router.put('/update/:id', categoryController.updateCategory);

module.exports = router;