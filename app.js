// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const mongoose = require("mongoose");

// Import route handlers
const categoryRoutes = require('./routes/categoryRoute');
const itemRoutes = require('./routes/itemRoute');
const subcategoryRoutes = require('./routes/subcategoryRoute');

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Guestara API Testing',
            version: '1.0.0',
            description: 'A swagger way to view and test your API by Dhrupad',
        },
    },
    apis: ['./routes/categoryRoute.js', './routes/subcategoryRoute.js', './routes/itemRoute.js']
};

// Generate swagger documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define port and MongoDB URI
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup logging using morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Create rotating log file stream
var accessLogStream = rfs.createStream("Guestara", { interval: '1h', path: path.join(__dirname, 'log') });

// Use combined format for logging
app.use(morgan('combined', { stream: accessLogStream }));

// Define routes
app.use("/categories", categoryRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/items', itemRoutes);

// Default route
app.get("/", (req, res) => {
    res.status(200).send("api is live")
})

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
