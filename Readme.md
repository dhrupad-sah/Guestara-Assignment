# Guestara Menu Management Application

This is a Node.js backend application for menu management. It allows you to create, read, update, and delete categories, subcategories, and items in a menu.

## Prerequisites

- Node.js (version X.X.X or higher)
- MongoDB (or any other database of your choice)

## Getting Started

### 1. Clone the repository:

git clone https://github.com/your-username/menu-management.git

### 2. Install the dependencies:

cd menu-management
npm install

### 3. Set up the environment variables:

Create a `.env` file in the root directory and add the following variables:  
MONGODB_URI=mongodb://localhost:27017/menu-management

Replace the `MONGODB_URI` value with your MongoDB connection string.

### 4. Start the application:

The server will start running on `http://localhost:3000`.

## API Documentation

You can find the API documentation in the `docs` directory or by visiting `http://localhost:3000/api-docs` after starting the server.

## Database

I have chosen MongoDB as the database for this application because it is a NoSQL database that provides a flexible schema for storing hierarchical data like categories, subcategories, and items. Additionally, MongoDB integrates well with Node.js and has a powerful querying language.

## Learnings

1. Implementing CRUD operations with Mongoose and Express.
2. Managing hierarchical data structures in a database.
3. Documenting and showcasing a project through a README file and API documentation.

## Difficulties

The most difficult part of the assignment was establishing the relationships between the models (Category, SubCategory, and Item) and ensuring proper data retrieval and manipulation for nested data structures.

## Improvements

Given more time, I would have implemented additional features such as authentication and authorization, data validation, and error handling. Additionally, I would have created more comprehensive unit tests and explored deployment options for the application.


