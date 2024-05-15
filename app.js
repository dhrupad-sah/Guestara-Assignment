require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const morgan = require('morgan');
const path = require('path')
const rfs = require('rotating-file-stream');
const mongoose = require("mongoose");

const categoryRoutes = require('./routes/categoryRoute');
const itemRoutes = require('./routes/itemRoute');
const subcategoryRoutes = require('./routes/subcategoryRoute');

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

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

var accessLogStream = rfs.createStream("Guestara", { interval: '1h', path: path.join(__dirname, 'log') });

app.use(morgan('combined', { stream: accessLogStream }));

app.use("/categories", categoryRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/items', itemRoutes);

app.get("/", (req, res) => {
    res.status(200).send("api is live")
})

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));