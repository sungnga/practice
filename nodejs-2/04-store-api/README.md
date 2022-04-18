## SECTION 4: STORE API
- Folder directory: /04-store-api/

### Goals of this project
- We will learn about filtering, sorting, and dynamically populating our database
- We are in charge of the store API and we are providing options for the clients to query the store database
- Clients can make HTTP calls to search for products, search by category, filter by company name, filter by price, etc.

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/04-store-api/starter
- cd into project directory: `cd 04-store-api`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, and mongoose libraries
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

### [02. Setup basic Express app]()
- File: app.js
  - The error middleware have already prepared for us, so we can use it here in `app.use()`
  - Write an async start function that starts the Express server only if we successfully connect to the database. We will connect to the database later
  - We going to setup the PORT variable here using dotenv
  ```js
  require('dotenv').config();

  const express = require('express');
  const app = express();

  const notFoundMiddleware = require('./middleware/not-found');
  const errorMiddleware = require('./middleware/error-handler');

  // middleware
  app.use(express.json());

  // root
  app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
  });

  // products route

  // async errors
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  const port = process.env.PORT || 3000;

  const start = async () => {
    try {
      // connectDB
      app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };
  start();
  ```

### [03. Connect to the database]()
- Go to MongoDB dashboard page, in the Nodejs-03-Task-Manager project and under the Database menu item, click on the Connect button. Then select 'Connect your application'. Copy the connection string to the clipboard 
- At the root of the project directory, create a file called .env
- File: .env
  - Paste the connection string here
  - Replace `myFirstDatabase` with 04-STORE-API
  - Replace `<password>` with a password
  ```js
  MONGO_URI=mongodb+srv://03-task-manager:<password>@nodejs-03-task-manager.k3slk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  ```
- The connectDB function is already setup in db/connect.js file. We already covered this in section 03
  ```js
  const mongoose = require('mongoose');

  const connectDB = (url) => {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  };

  module.exports = connectDB;
  ```
- File: app.js
  - Import the connectDB module
  - In the try block of the async start function, call the `connectDB()` function and pass in the connection string in the .env file as an argument. Add the await keyword in front of it since this is an async operation
  ```js
  const connectDB = require('./db/connect');

  const start = async () => {
    try {
      // connectDB
      await connectDB(process.env.MONGO_URI);
      app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };
  start();
  ```
- Stop and restart the server. If the connection is successful, you should see 'Server is listening to port 3000...' printed in the console

### [04. Setting up the router]()
- File: controllers/products.js
  - Create and export a basic getAllProductsStatic and getAllProducts controllers
  ```js
  const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: 'products testing route' });
  };

  const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'products route' });
  };

  module.exports = { getAllProductsStatic, getAllProducts };
  ```
- File: routes/products.js
  - Require in the express module and from there, execute the `express.Router()` class to instantiate a `router` object
  - Import the getAllProductsStatic and getAllProducts controller modules
  - Setup the base route to getAllProducts using the `.get()` method
  - Setup the /static route to getAllProductsStatic using the `.get()` method
  - Export as a module the `router` middleware
  ```js
  const express = require('express');
  const router = express.Router();

  const {
    getAllProductsStatic,
    getAllProducts
  } = require('../controllers/products');

  router.route('/').get(getAllProducts);
  router.route('/static').get(getAllProductsStatic);

  module.exports = router;
  ```
- File: app.js
  - Import the router middleware
  - Here, we want to use the router middleware by using `app.use()`
    - Provide the base path as first argument
    - Provide the router middleware as second argument
  ```js
  const productsRouter = require('./routes/products');

  // base route
  // 1st arg is the base path
  // 2nd arg is the router middleware
  app.use('/api/v1/products', productsRouter);
  ```
- To test out our router setup:
  - Testing base route: In the browser, navigate to `http://localhost:3000/api/v1/products`. If successful, we should see `"msg": "products route"` printed
  - Testing /static route: In the browser, navigate to `http://localhost:3000/api/v1/products/static`. If successful, we should see `"msg": "products testing route"` printed

### [05. Using the express-async-errors library]()
- Instead of writing our own async error wrapper, we're going to use a library to help us do this
- With this library, it handles the try-catch block for us and has the `next()` method that passes the error to our error-handler middleware. We simply need to `throw new Error('write_message_here')` object in the controller and our `errorHandlerMiddleware` function in error-handler.js file will handle the error
  - Install: `npm install express-async-errors`
- File: app.js
  - Require in the express-async-errors library
  ```js
  require('express-async-errors');
  ```
- File: controllers/products.js
  - Add `throw new Error('testing async errors');` to each controller. Also, no need to pass `next` to the controller either
  ```js
  const getAllProductsStatic = async (req, res) => {
    throw new Error('testing async errors');
    res.status(200).json({ msg: 'products testing route' });
  };
  ```
- File: middleware/error-handler.js
  - Console log the error
  ```js
  const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'Something went wrong, please try again' });
  };

  module.exports = errorHandlerMiddleware;
  ```

### [06. Setup Product model]()
- Setup the product schema using the Mongoose library
- File: models/product.js
  - Require in Mongoose package
  - Then call `new mongoose.Schema()` to create a product schema
  - Specify all the properties for the Product model in the schema
  - Lastly, export the Product model as a module
  ```js
  const mongoose = require('mongoose');

  const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'product name must be provided']
    },
    price: {
      type: Number,
      required: [true, 'product price must be provided']
    },
    featured: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4.5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    company: {
      type: String,
      enum: {
        values: ['ikea', 'liddy', 'caressa', 'marcos'],
        message: '{VALUE} is not supported'
      }
      // enum: ['ikea', 'liddy', 'caressa', 'marcos']
    }
  });

  module.exports = mongoose.model('Product', productSchema);
  ```

### [07. Populate the database with products]()
- We already have an array of products in products.json file and we're going to write a function that connects to our MongoDB and populate these products into our database
- File: populate.js
  - Write an async start function that
    - connects to our MongoDB
    - deletes any existing products in the database
    - creates new products that's coming from products.json file
    - if all of the above is successful, exit the process. We don't need to listen to the file anymore
    - if not successful, console log the error and exit the process
  ```js
  require('dotenv').config();

  const connectDB = require('./db/connect');
  const Product = require('./models/product');

  // an array of products
  const jsonProducts = require('./products.json');

  const start = async () => {
    try {
      // connect to DB
      // pass in the connection string
      await connectDB(process.env.MONGO_URI);

      // delete any existing products in DB
      await Product.deleteMany();

      // populate the products array in DB
      await Product.create(jsonProducts);

      console.log('Success!!');
		  // if successful, exit the process
		  process.exit(0);
    } catch (error) {
      console.log(error);
		  process.exit(1);
    }
  };
  start();
  ```
- In the terminal and at root of project, run: `node populate`
  - If the operation is successful, we should see 'Success!!' printed out
- This will connect to MongoDB and populate the products array in 04-STORE-API collection 
- In MongoDB dashboard page, navigate to Nodejs-03-Task-Manager project and select the Collects tab at the top
  - We should see the 04-STORE-API collection has been created
  - In it contains the 'products' collection of the products array

### [07. Basic find]()
- Visit the Mongoose website to see all the query methods that we can use to interact with our database in MongoDB
- File: controllers/products.js
  - Require in the Product model
  - Use the .find() method on the Product model to get all products in DB
    - By default, passing in an empty object `{}` will return all items in the collection
    - Can also find specific items by passing in options
  ```js
  const Product = require('../models/product');

  const getAllProductsStatic = async (req, res) => {
    // passing in empty object will return all products
    const products = await Product.find({});

    //specifying options - filter by hardcoded values
    const products = await Product.find({
      name: 'vase table'
    });

    res.status(200).json({ products });
  };
  ```

### [08. Find products with query params]()
- The next thing we want to work on is enable our users to filter the products collection by name of product, company, and product is featured or not
- A user can send requests for specific products using the query string params
- When a user queries our database using query string params, we have access to those values in `req.query`
- The query string params are key-value pairs of the properties of the model object
- In the URL, the query params comes after the `?` character. Separate multiple query strings with `&`
  - `{{URL}}/products?name=john&featured=true`
  - name and featured are properties
- File: controllers/products.js
  ```js
  const getAllProducts = async (req, res) => {
    // find products by query params
    // get the values of query string params from req.query
    const products = await Product.find(req.query);
    res.status(200).json({ products, nbHits: products.length });
  };
  ```

### [09. Refactor to queryObject]()
- Right now with our current setup, if the user provides a query params that does not match any of the properties that we set up for the model, Mongoose will return the products of an empty array. What we want instead is if the query params doesn't math, we want to return the entire products collection
- To make this work, we want to refactor our getAllProducts controller where we first create our own queryObject and append any properties we want to this object. Then pass this queryObject to the `Product.find()` method. If queryObject is an empty object, Mongoose will return all products items. By default, passing in an empty object `{}` to the `.find()` method will return all items in the collection
- File: controllers/products.js
  - Let's handle the featured and company properties
  ```js
  const getAllProducts = async (req, res) => {
    // get the values of query params from req.query
    // destructure the properties from req.query
    const { featured, company } = req.query;
    const queryObject = {};

    // if featured query params exists, add featured prop to queryObject
    if (featured) {
      // use ternary operator
      // if the value of featured is true, set featured prop to true
      // else set to false
      queryObject.featured = featured === 'true' ? true : false;
    }

    // if company query params exists
    if (company) {
      // add company prop to queryObject
      // and set its value to the value from query params
      queryObject.company = company;
    }
    console.log(queryObject);

    // if none of the properties matches, queryObject is an empty object
    // passing in an empty object Mongoose will return all products
    const products = await Product.find(queryObject);
    res.status(200).json({ products, nbHits: products.length });
  };
  ```

### [10. Query by name]()
- Google search 'MongoDB query operators' to get a list of all query operators
- In our case, we want to use `$regex` to query for the name of a product and we want it to be case insensitive. In our project, the `name` property works very similar to search or query where the user can type anything they want to query products by name. We want to pass this `name` query string params as a pattern to the `$regex` query operator
- File: controllers/products.js
  ```js
  const getAllProducts = async (req, res) => {
    // get the values of query params from req.query
    // destructure the properties from req.query
    const { featured, company, name } = req.query;
    const queryObject = {};

    // if featured query params exists, add featured prop to queryObject
    if (featured) {
      // use ternary operator
      // if the value of featured is true, set featured prop to true
      // else set to false
      queryObject.featured = featured === 'true' ? true : false;
    }

    // if company query params exists
    if (company) {
      // add company prop to queryObject
      // and set its value to the value from query params
      queryObject.company = company;
    }

    if (name) {
      // $regex is one of many mongoDB query operators
      // pass in the pattern to $regex
      // option i is for case insensitive
      queryObject.name = { $regex: name, $options: 'i' };
    }
    console.log(queryObject);

    // if non of the properties matches, queryObject is an empty object
    // passing in an empty object Mongoose will return all products
    const products = await Product.find(queryObject);
    res.status(200).json({ products, nbHits: products.length });
  };
  ```

### [11. Implementing sort]()
- We can use the `.sort()` method to sort the products by ascending or descending order or sort by number from lowest to highest or vice versa
- A note that the `.sort()` method must be chained to one of the query methods, i.e. the `.find()` method. `Product.find({options}).sort({options})`
  - Add a negative `-` in front of alphabet sorting will result in descending order
  - Add a negative `-` in front of numeric sorting will result in descending order
  - Can pass in multiple sorting options separated by a space
    - `const products = await Product.find({}).sort('-name price');`
    - When we get multiple sort values in query params, they're separated by commas. So we need to replace the commas with spaces instead: `'-name,price,createdAt'` to `'-name price createdAt'`. This can be achieved by using Javascript's `list.split(',').join(' ')` methods
- File: controllers/products.js
  - Implementing sort on the products list from the database
  - First use the `.find()` method to get the products from DB, then chain on the `.sort()` method to sort the products
  - Note that we don't await during the `.find()` method. We await at the end after we get the products and implement sort (if it exists in query params)
  ```js
  const getAllProducts = async (req, res) => {
    // get the values of query params from req.query
    // destructure the properties from req.query
    const { featured, company, name, sort } = req.query;
    const queryObject = {};

    // ---other filter types here---

    // don't add the await keyword here
    let result = Product.find(queryObject);
    // ---implementing sort---
    // if sort exists in query params
    if (sort) {
      // split the sort array at comma and join back with a space
      const sortList = sort.split(',').join(' ');
      // sort the products list by the specified sort query params
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }

    // add the await keyword here
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
  };
  ```

### [12. Implementing select]()
- The `.select()` method allows the users to specify which properties(fields) of the Product model they want to see. For example, they may only want to see the company and price properties of the products
- The pattern is very similar to the `.sort()` method. Pass in the list of fields as a string to the `.select()` method
  - `.select('company price')`
  - When we get multiple field values in query params, they're separated by commas. So we need to replace the commas with spaces instead: `'name,price,createdAt'` to `'name price createdAt'`. This can be achieved by using Javascript's `list.split(',').join(' ')` methods
- File: controllers/products.js
  ```js
  const getAllProducts = async (req, res) => {
    // get the values of query params from req.query
    // destructure the properties from req.query
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {};

    // ---other filter types here---

    // don't add the await keyword here
    let result = Product.find(queryObject);
    // ---implementing sort---
    // if sort exists in query params
    if (sort) {
      // split the sort array at comma and join back with a space
      const sortList = sort.split(',').join(' ');
      // sort the products list by the specified sort query params
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }
    
    // ---implementing select---
    if (fields) {
      // split the fields array at comma and join back with a space
      const fieldsList = fields.split(',').join(' ');
      // sort the products list by the specified sort query params
      result = result.select(fieldsList);
    }

    // add the await keyword here
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
  };
  ```

### [13. Implementing limit, skip, pagination]()
- Both the `.limit()` and `.skip()` methods can be chained to a query method
  - Limit is specifying the number of items the user wants from a request. Just pass in an integer value to the `.limit()` method
  - Skip is how many items the user wants to skip. Pass in an integer value to the `.skip()` method
- NOTE that the values that we get from the `req.query` object will always be a string. Also, if there are multiple values provided for a property, it'll be separated by commas
  - For multiple values, we need to replace the commas with spaces before we can use them in our logic
  - Some values that are supposed to be integers we need to convert the string format to numeric values
- By default, Mongoose has the `.page` property in `req.query` that we can use. We can set the number of items per page using `.limit()` and use the `.skip()` method to go to the next page
- File: controllers/products.js
  ```js
  const getAllProducts = async (req, res) => {
    // get the values of query params from req.query
    // destructure the properties from req.query
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {};

    // don't add the await keyword here
    let result = Product.find(queryObject);

    // ---implementing pagination---
    // convert the query string value of page to a number
    // set the default page number to 1
    const page = Number(req.query.page) || 1;
    // limit number is the number of items per page
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    // add the await keyword here
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
  };
  ```