## SECTION 7: FILE UPLOAD
- Folder directory: /07-file-upload/

### Goals of this project
- Learn how to upload image file onto the server
- Use Express file upload library and Cloudinary to store images on the cloud
- A small front-end app that has a form to upload an image file (onto Cloudinary) and then display the image on the page
- Upload images using Postman

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/07-file-upload/starter
- cd into project directory: `cd 07-file-upload`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, mongoose, http-status-codes,jsonwebtoken, helmet, cors, express-rate-limit, rate-limiter express-fileupload, cloudinary, and joi libraries. This will also generate the package-lock.json file
- At the root of project directory, create a `.env` file
  - Add MONGO_URI variable and set it to the connect string from MongoDB. Get the connect string by going to the project dashboard in MongoDB and click on the "Connect" button and then select "Connect your application"
  - `MONGO_URI=<connect_string_from_mongoDB>`
- Create a `.gitignore` file. Add these files to the list: package-lock.json, /node_modules, and .env
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

### [02. Setup Product model]()
- File: models/Product.js
  ```js
  const mongoose = require('mongoose');

  const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    image: {
      type: String,
      require: true
    }
  });

  module.exports = mongoose.model('Product', ProductSchema);
  ```

### [03. Setup basic structure for controllers and routes]()
- Let's setup the basic structure for the controllers and their routes
- We will have two types of controllers: productController and uploadsController
  - The product controllers (two of them) will go to the home route: `/`
  - The upload product image controller goes to uploads route: `/uploads`
- File: controllers/productController.js
  - Setup basic structure for the createProduct and the getAllProducts controllers
  ```js
  const Product = require('../models/Product');
  const { StatusCodes } = require('http-status-codes');

  const createProduct = async (req, res) => {
    res.send('create product');
  };

  const getAllProducts = async (req, res) => {
    res.send('list of products');
  };

  module.exports = { createProduct, getAllProducts };
  ```
- File: controllers/uploadsController.js
  ```js
  const { StatusCodes } = require('http-status-codes');

  const uploadProductImage = async (req, res) => {
    res.send('upload product image');
  };

  module.exports = { uploadProductImage };
  ```
- File: routes/productRoutes.js
  - Setup the routes for the three controllers
  ```js
  const express = require('express');
  const router = express.Router();

  const { createProduct, getAllProducts } = require('../controllers/productController');
  const { uploadProductImage } = require('../controllers/uploadsController');

  router.route('/').post(createProduct).get(getAllProducts);
  router.route('/uploads').post(uploadProductImage);

  module.exports = router;
  ```
- File: app.js
  ```js
  // product router
  const productRouter = require('./routes/productRoutes');

  // to get access to all the data in req.body
  app.use(express.json());

  // use productRouter as middleware
  // 1st arg is the root route
  app.use('/api/v1/products', productRouter);
  ```

### [04. Setup basic routes in Postman]()
- Let's setup the basic routes in Postman for this project
- Create a new collection and give the collection a name
- The base URL, which we created a global variable for is `http://localhost:3000/api/v1` and it's stored in `{{URL}}`
  - Remember that our root route is: `/api/v1/products`
- We will have three routes:
  - A POST route to create product: `{{URL}}/products`
  - A GET route to get all products: `{{URL}}/products`
  - A POST route to upload image: `{{URL}}/products/uploads`