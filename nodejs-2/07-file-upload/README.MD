## SECTION 7: FILE UPLOAD
- Folder directory: /07-file-upload/

### Goals of this project
- Learn how to upload image file onto the server
- Use Express file upload library and Cloudinary to store images on the cloud
- A small front-end app that has a form to upload an image file (onto Cloudinary) and then display the image on the page
- Upload images using Postman

### [01. Initialize project with starter files](https://github.com/sungnga/practice/commit/f88154b9254c43bb3b08c9a49376312af6c10bf6?ts=2)
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/07-file-upload/starter
- cd into project directory: `cd 07-file-upload`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, mongoose, http-status-codes,jsonwebtoken, helmet, cors, express-rate-limit, rate-limiter express-fileupload, cloudinary, and joi libraries. This will also generate the package-lock.json file
- At the root of project directory, create a `.env` file
  - Add MONGO_URI variable and set it to the connect string from MongoDB. Get the connect string by going to the project dashboard in MongoDB and click on the "Connect" button and then select "Connect your application"
  - `MONGO_URI=<connect_string_from_mongoDB>`
- Create a `.gitignore` file. Add these files to the list: package-lock.json, /node_modules, and .env
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

### [02. Setup Product model](https://github.com/sungnga/practice/commit/9f599b021d4bc889eb84d43a5684cf6c37120d42?ts=2)
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

### [03. Setup basic structure for controllers and routes](https://github.com/sungnga/practice/commit/f01f14f287f11d5eccb3b063f80060e362535bed?ts=2)
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

### [04. Setup basic routes in Postman](https://github.com/sungnga/practice/commit/2861d22e3253a6f2381cb1d15da81bdb7e0a001d?ts=2)
- Let's setup the basic routes in Postman for this project
- Create a new collection and give the collection a name
- The base URL, which we created a global variable for is `http://localhost:3000/api/v1` and it's stored in `{{URL}}`
  - Remember that our root route is: `/api/v1/products`
- We will have three routes:
  - A POST route to create product: `{{URL}}/products`
  - A GET route to get all products: `{{URL}}/products`
  - A POST route to upload image: `{{URL}}/products/uploads`

### [05. Implement uploadProductImage controller](https://github.com/sungnga/practice/commit/d8e06c87665673601b685b8e12cbd29eada1a816?ts=2)
- The way we set up our ProductSchema model is we must provide the values for name, price, and image properties. The value of the `image` property is a string and it's a path to the image that we must first upload to a cloud server (eventually to Cloudinary). For now, we're uploading it to our development server which stores the image in a public directory. We will create a separate folder to store the uploaded image as a path
- **Uploading an image file using POSTMAN:**
  - Make a POST request to the upload image route: `{{URL}}/products/uploads`
  - Click on the Body tab and select form-data to upload a file
  - Provide a name for the image upload as the KEY. Call it `image` for example. For the VALUE, select an image file from the file system
- A NOTE WHEN UPLOADING A FILE USING POSTMAN
  - Since we're uploading a file (not providing raw data) in the Body content, by default, we don't have access to the file data in `req.body` object
  - We need to use an external library `express-fileupload` in order to access the file data
  - Once the library is installed, we have access to the file/image data in `req.files`
- Install express-fileupload library: `npm i express-fileupload`
- **Implementing the express-fileupload package:**
  - File: app.js
    - Import the express-fileupload library
    - Invoke it as a middleware
    ```js
    const fileUpload = require('express-fileupload');

    app.use(fileUpload());
    ```
- **Storing the image data in a public path:**
  - The next step we want to do is to create a public path that stores the uploaded image data. This in turn makes the image a public image asset
  - Inside the `public` directory, create a folder called `uploads`
  - Then, the express-fileupload library has a `.mv()` method that we can call on the file object to move the file/image to a specified path
  - We use the `path` module that comes with Node.js to create the path in the `uploads` folder
  - File: controllers/uploadsController.js
    - Import the path module that comes with Node.js
    - Console log req.files to see the file data
    - Create an imagePath in the uploads folder in the public directory
    - Call .mv() method on the productImage object to move the image data to the imagePath
    - Then send back the status code along with an image object that contains the source to the image path
    - If successful, the productImage object will be moved to the imagePath that we created in the `uploads` folder inside the `public` directory
    - This officially uploads a file image to our development server that we can view in the browser
    ```js
    const path = require('path');
    const { StatusCodes } = require('http-status-codes');

    const uploadProductImage = async (req, res) => {
      console.log(req.files);
      let productImage = req.files.image;

      // create a path in uploads folder
      const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
      );
      // moving image data to the imagePath in uploads folder
      // the .mv() method is provided by express-fileupload library
      await productImage.mv(imagePath);
      return res
        .status(StatusCodes.OK)
        .json({ image: { src: `/uploads/${productImage.name}` } });
    };
    ```
- **Making a folder public:**
  - File: app.js
    - Here, we're making the public directory as a public folder
    ```js
    app.use(express.static('./public'));
    ```
- **To view the uploaded image file in the browser:**
  - Go to POSTMAN to upload an image in the upload image route
  - If successful, we should get back an image object that contains the path to the uploaded image
    ```js
    {
      "image": {
        "src": "/uploads/computer-2.jpeg"
      }
    }
    ```
  - To see the image in the browser: `http://localhost:3000/uploads/computer-2.jpeg`

### [06. Implement createProduct, getAllProducts controllers](https://github.com/sungnga/practice/commit/4519fc8171c5b3069d10213dcc3011f6bbb457f5?ts=2)
- **Implementing createProduct functionality:**
- File: controllers/productController.js
  - In the createProduct controller:
    - console log the req.body object to see the data being submitted
    - call Product.create() method to create a product instance
    - send back the status code and the product instance in json format
  ```js
  const Product = require('../models/Product');
  const { StatusCodes } = require('http-status-codes');

  const createProduct = async (req, res) => {
    // console.log(req.body);
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  };
  ```
- Let's create a product using POSTMAN:
  - First, upload an image in the upload image route: `{{URL}}/products/uploads`. If successful, we should get back an image object that contains the image path. We need this image path when we create a product
    ```js
    {
      "image": {
        "src": "/uploads/computer-2.jpeg"
      }
    }
    ```
  - Make a POST request in the create product route: `{{URL}}/products`
  - In the Body content, provide the values for the name, price, and image properties. Copy and paste the image path as a string value for the image property
    ```js
    {
      "name": "product 2",
      "price": 600,
      "image": "/uploads/computer-2.jpeg"
    }
    ```
  - If successful, we should get back a product object
    ```js
    {
      "product": {
        "_id": "62a04c00d3ed0fc6b82377c9",
        "name": "product 2",
        "price": 600,
        "image": "/uploads/computer-2.jpeg",
        "__v": 0
      }
    }
    ```
- **Implementing getAllProducts functionality:**
- File: controllers/productController.js
  - In the getAllProducts controller:
    - Call the .find() method on the Product model and pass in an empty object. This, by default, will find all the products
    - Send back a status code and the array of products in an object
  ```js
  const getAllProducts = async (req, res) => {
    // passing in empty object {} will find all the products
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });
  };
  ```
- Let's get all products using POSTMAN:
  - Make a GET request in the get all products rout: `{{URL}}/products`
  - If successful, we should get back the products object that contains an array of products
    ```js
    {
      "products": [
        {
          "_id": "62a04c00d3ed0fc6b82377c9",
          "name": "product 2",
          "price": 600,
          "image": "/uploads/computer-2.jpeg",
          "__v": 0
        },
        {
          "_id": "62a04d78d3ed0fc6b82377cb",
          "name": "product 3",
          "price": 600,
          "image": "/uploads/computer-3.jpeg",
          "__v": 0
        }
      ]
    }
    ```

### [07. Additional validation for image upload](https://github.com/sungnga/practice/commit/80a9e2eee6050af8a82375260519e366a69d5c40?ts=2)
- Let's add additional checks to the uploadProductImage controller to see whether the user has uploaded a file, whether the file is an image file, and whether the file exceeds a specified size
- File: controllers/uploadsController.js
  - First, console log the req.files object to see the properties that we're checking for
  - Import the entire custom error object from errors/index.js file
  - In the uploadProductImage controller:
    - Check to see if the file exists
    - Check to see if the file type is an image file
    - Check to see if the file size exceeds 1KB
    - For each of these three errors, we throw our custom BadRequestError handler
  ```js
  // we're getting the entire error object from errors/index.js file
  const CustomError = require('../errors');

  const uploadProductImage = async (req, res) => {
    console.log(req.files);

    // check if file exists
    if (!req.files) {
      throw new CustomError.BadRequestError('No file uploaded');
    }

    const productImage = req.files.image;

    // check format
    if (!productImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please upload image');
    }

    // maxSize is 1MB
    const maxSize = 1024 * 1024;
    // check size
    if (productImage.size > maxSize) {
      throw new CustomError.BadRequestError(
        'Please upload image smaller than 1KB'
      );
    }

    // <---the rest of the code -->
  };
  ```

### [08. Setup Cloudinary](https://github.com/sungnga/practice/commit/fc4387582e87143f7d08473308fc230968867083?ts=2)
- **Sign up for Cloudinary account:**
  - Go to the Account Details section in the dashboard page and we're looking for these three things:
    - Cloud name
    - API Key
    - API Secret
- **Setup in .env file:**
  ```js
  MONGO_URI=<mongoDB_connection_string>
  CLOUD_NAME=<cloudinary_name>
  CLOUD_API_KEY=<cloudinary_api_key>
  CLOUD_API_SECRET=<cloudinary_api_secret>
  ```
- **Install Cloudinary package:**
  - `npm i cloudinary`
- **Setup Cloudinary:**
  - File: app.js
    - Import cloudinary library and make sure to use version 2
    - Call cloudinary.config() method and pass in, as an object, the cloudinary .env information
    ```js
    // use version 2
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET
    });
    ```
  - Restart the server. If everything is working properly, it should print "Server is listening to port 3000..."

### [09. Upload image to Cloudinary](https://github.com/sungnga/practice/commit/5350d33d210ee41bc50eb10c1247e88fc2ef9073?ts=2)
- Up to this point, the uploadProductImage controller function that we wrote uploads an image file to our local server using Postman. Now we want to write controller that uploads the image file to Cloudinary and the steps are a little different. Rename the current `uploadProductImage` controller to `uploadProductImageLocal` and save it for reference
- The controller that uploads an image file to Cloudinary takes the following steps:
  - First, we want to utilize the `express-fileupload` library in the app.js file to perform two tasks. The first is it parses the image file we get from the user. Second, it creates a `temp` folder inside our project directory. It stores the image data in this folder. To enable this feature, we set the `useTempFiles` option to true. After this, when an image is uploaded, we see the `tempFilePath` property in the `req.files.image` object. It's a path to the image file data
  - In the `uploadProductImage` controller, we call the `cloudinary.uploader.upload()` method and pass in the `tempFilePath` to upload the image file data to cloudinary. We can also specify the name of the folder in Cloudinary that we want to store the image
- File: app.js
  - In the fileUpload middleware, pass in the useTempFiles option and set it to true
  - The express-fileupload package will parse the uploaded image file and then it creates a temp folder inside our project and stores the image file data in this folder
  ```js
  const fileUpload = require('express-fileupload');

  // the express-fileupload lib first parses the upload image file
  // then creates a temp directory in the project and stores the parsed file
  app.use(fileUpload({ useTempFiles: true }));
  ```
- File: controllers/uploadsController.js
  - First, rename to current uploadProductImage controller to uploadProductImageLocal
  - The image file data is stored in the tempFilePath property. Console log `req.files.image` to see this property
  - Call the cloudinary.uploader.upload() method and pass in the tempFilePath as the 1st arg. 2nd arg is an object where we can specify the name of the folder where we want to store the image
  ```js
  // this controller uploads image to Cloudinary
  const uploadProductImage = async (req, res) => {
    console.log(req.files.image); //will see the tempFilePath property where the image file is stored

    // 1st arg is the path
    // 2nd arg is options where to store the image on Cloudinary
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: 'Nodejs-07-File-Upload'
      }
    );

    console.log(result); //the image path on Cloudinary is in the secure_url property
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
  };
  ```
- Let's test out the functionality using Postman:
  - Upload an image file in the upload image route
  - If successful, we should get back an image object that contains the path to the image on Cloudinary server
  - We should also see a `temp` folder created in our project by `express-fileupload` library. The image path is stored here
  - To see the image, visit this path in the browser
  - We can also see the image stored in the Nodejs-07-File-Upload folder on Cloudinary website

### [10. Remove temp files](https://github.com/sungnga/practice/commit/fe22b0b9bec82b4556444d6ba7bde2aebd2e0e3c?ts=2)
- Every time we upload an image file we're storing it on Cloudinary server and also on our local server in the `temp` folder. We can write a function inside the `uploadProductImage` controller to remove it from the file system once it has been successfully uploaded to Cloudinary
- File: controllers/uploadsController.js
  - Import the file system library
  - Call fs.unlinkSync() method and pass in the req.files.image.tempFilePath as an argument
  - Now every time an image has been successfully uploaded to Cloudinary, the tempFilePath will be removed from the temp folder on the local server
  ```js
  const fs = require('fs');

  // removing the tempFilePath from temp folder
  // once the image has been uploaded to Cloudinary
  fs.unlinkSync(req.files.image.tempFilePath);
  ```