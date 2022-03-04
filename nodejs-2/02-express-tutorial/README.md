## SECTION 2: EXPRESS TUTORIAL
- Folder directory: /02-express-tutorial/

### [01. Initialize Express project with starter project]()
- Get start project file from https://github.com/john-smilga/node-express-course/tree/main/02-express-tutorial
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon and express libraries
- Then run the script `npm start` to start up the project

### [02. HTTP - basics]()
- File: 01-http-basics.js
  ```js
  // Setup the server
  // http module is built-in to Node
  const http = require('http');

  // In the http cycle, there's a request message object and a response message object
  // In the callback, we have access to the request and response objects
  // every time when a user hits the server, we have access to these two objects
  // In the request object, we want to know
  // - the request method
  // - the resource user is trying to get (in url)
  // - the body where the user provides additional info
  // The response.end() method signals to the server that all of the response headers
  // and body have been sent; that server should consider this message complete
  // The method response.end() MUST be called on each response
  const server = http.createServer((req, res) => {
    console.log('User hits the server');
    res.end('Home page');
  });

  // A port is a communication endpoint
  // In development, the port number can be arbitrary
  // In production, the port must be specific
  server.listen(5000);
  ```
  - In the web browser, navigate to `localhost:5000` and we should see the response message "Home page" displayed

### [03. HTTP - headers, request objects, HTML files]()
- File: 02-http.js
- **HTTP - headers**
  ```js
  const http = require('http');

  const server = http.createServer((req, res) => {
    // .writeHead() method sends a response header to the request
    // 1st arg is the HTTP response status code
    // - this status code lets the browser knows what is going with the request
    // - 100s is information responses
    // - 200s is successful responses
    // - 300s is redirection messages
    // - 400s is client error responses
    // 2nd arg is the content type being sent back
    res.writeHead(200, { 'content-type': 'text/html' });
    // .write() method writes data to the stream
    res.write('<h1>home page</h1>');
    // must always call res.end() to end the communication
    res.end();
  });

  server.listen(5000);
  ```
- **HTTP - request object**
  ```js
  const http = require('http');

  // req is a huge request object that contains all sort of info about the request
  const server = http.createServer((req, res) => {
    // the method property contains the request method the client is making
    console.log(req.method);
    // the url property contains the path to the resource the client is requesting
    console.log(req.url);
    const url = req.url;
    // home page
    if (url === '/') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write('<h1>home page</h1>');
      res.end();
    }
    // about page
    else if (url === '/about') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write('<h1>about page</h1>');
      res.end();
    }
    // 404
    // 404 status code is the requested content is not found
    else {
      res.writeHead(404, { 'content-type': 'text/html' });
      res.write('<h1>page not found</h1>');
      res.end();
    }
  });

  server.listen(5000);
  ```
  - In the browser, type in `http://localhost:5000/`, `http://localhost:5000/about`, or `http://localhost:5000/aboutdd` to make the request
- **HTTP - HTML files**
  - We can read an HTML file using the `readFileSync` method from the `fs` module. And then the server can write the data from this file to the stream when a client makes a request
  - Create a file called index.html
    ```js
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home page</title>
    </head>
    <body>
      <h1>Home page</h1>
      <h4>Hello world!</h4>
    </body>
    </html>
    ```
  - In 02-http.js file
    ```js
    const http = require('http');
    const { readFileSync } = require('fs');

    // get all files
    const homePage = readFileSync('./index.html');

    // req is a huge request object that contains all sort of info about the request
    const server = http.createServer((req, res) => {
      const url = req.url;
      // home page
      if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        // .write() method writes data to the stream
        res.write(homePage);
        res.end();
      }
    });

    server.listen(5000);
    ```

### [04. HTTP - App example]()
- File: 03-http-app-example.js
  ```js
  const http = require('http');
  const { readFileSync } = require('fs');

  // get all files
  const homePage = readFileSync('./navbar-app/index.html');
  const homeStyles = readFileSync('./navbar-app/styles.css');
  const homeImage = readFileSync('./navbar-app/logo.svg');
  const homeLogic = readFileSync('./navbar-app/browser-app.js');

  // req is a huge request object that contains all sort of info about the request
  const server = http.createServer((req, res) => {
    // the method property contains the request method the client is making
    // console.log(req.method);

    // the url property contains the path to the resource the client is requesting
    // req.url shows all the urls that the client is requesting from the server
    // these urls are requested in index.html file
    console.log(req.url);

    const url = req.url;
    // home page
    if (url === '/') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(homePage);
      res.end();
    }
    // styles
    // make sure the path matches exactly shown in req.url
    // make sure to indicate the correct content type
    // make sure to pass in the correct variable to the .write() method
    else if (url === '/styles.css') {
      res.writeHead(200, { 'content-type': 'text/css' });
      res.write(homeStyles);
      res.end();
    }
    // image/logo
    else if (url === '/logo.svg') {
      res.writeHead(200, { 'content-type': 'image/svg+xml' });
      res.write(homeImage);
      res.end();
    }
    // logic
    else if (url === '/browser-app.js') {
      res.writeHead(200, { 'content-type': 'text/javascript' });
      res.write(homeLogic);
      res.end();
    }
    // 404
    else {
      res.writeHead(404, { 'content-type': 'text/html' });
      res.write('<h1>page not found</h1>');
      res.end();
    }
  });

  server.listen(5000);
  ```
- In the browser, navigate to `http://localhost:5000`. This will trigger the requests to the server for the data necessary to display the homepage navbar, logo, css styles, and logic
- First, get all the files by calling the `readFileSync` method from the `fs` module
- Then create the server using the `http.createServer` method from the `http` module. From this, we have access to the request and response object in a callback function. In this callback, the server can send the data and its content-type back to the client (browser) via the response object

### [05. Express - basics]()
- Express docs: www.expressjs.com
- Express is a framework for Node.js designed to make developing web apps and APIs much faster and easier
- Install Express: `npm i express --save`
- File: 04-express-basics.js
  ```js
  const express = require('express');
  // Invoke the express method to instantiate the app object
  const app = express();

  // the .get() method is client requesting for data
  // 1st arg is the path to the resource
  // 2nd arg is the callback function. This callback runs every time when a request made to this path
  // In the callback, the server sends back the status code and the data
  app.get('/', (req, res) => {
    console.log('client hits the resource');
    res.status(200).send('Home page');
  });

  app.get('/about', (req, res) => {
    res.status(200).send('About page');
  });

  app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
  });

  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });

  // ------ HTTP METHODS ------
  // app.get - read data
  // app.post - insert data
  // app.put - update data
  // app.delete - delete data

  // app.all - handles all http methods
  // app.use - responsible for middleware
  // app.listen - the port the server is listening on
  ```

### [06. Express - App example]()
- This app example is using the Express server instead of the `http` module that comes with Node. Express has built-in middleware, `express.static()` method, that allows us to easily serve static content
- At the root of 02-express-tutorial folder, create a folder called `public`. Then copy the browser-app.js, logo.svg, and styles.css files from the navbar-app folder into this folder
- File: 05-express-app-example.js
  ```js
  const express = require('express');
  // Invoke the express method to instantiate the app object
  const app = express();
  const path = require('path');

  // Setup static and middleware
  // app.use - responsible for middleware
  // Static is Express's built-in middleware
  // The 'public' folder stores static assets. The server doesn't need to change
  app.use(express.static('./public'));

  app.get('/', (req, res) => {
    // The __dirname provides absolute path
    // Can also use path.join()
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
  });

  app.all('*', (req, res) => {
    res.status(404).send('resource not found');
  });

  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
  ```

### [07. Express - all static]()
- Technically, the index.html file in the navbar-app folder is also a static asset file. We can place this index.html file in the public folder. The Express's middleware `static()` method will automatically serve this file in the static public folder. This is the entry point file for the public folder. So we don't need to make a get request to get this file to serve the home page
- File: 06-all-static.js
  ```js
  const express = require('express');
  const path = require('path');
  // Invoke the express method to instantiate the app object
  const app = express();

  // Setup static and middleware
  // app.use - responsible for middleware
  // Static is Express's built-in middleware
  // The 'public' folder stores static assets. The server doesn't need to change
  app.use(express.static('./public'));

  // app.get('/', (req, res) => {
  // 	// The __dirname provides absolute path
  // 	// Can also use path.join()
  // 	res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
  // 	// Adding this index.html file to static assets folder 'public'
  // });

  app.all('*', (req, res) => {
    res.status(404).send('resource not found');
  });

  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
  ```

### API vs SSR
- We use Express server to either setup API or template with server-side rendering (SSR)
- With APIs, the server provides the data. Any front-end apps that want to access it can simply perform HTTP request. To use the data, setup the API and functionality
- **API:**
  - In Express or HTTP, an API is setting an HTTP interface to interact with our data
  - Data is sent using JSON - Javascript Object Notation
  - `res.json()` - a method to send back a response. This method sets up the proper content-type and stringifies the data
- **SSR:**
  - SSR - we setup templates
  - Send template - send back the entire HTML, CSS, and Javascript
  - `res.render()` - sends back the template with HTML, CSS, and Javascript

### [08. JSON - basics]()
- File: 07-json-basics.js
  ```js
  const express = require('express');
  const app = express();
  // import the products array module from data.js file
  const { products } = require('./data');

  app.get('/', (req, res) => {
    // sends a JSON response w/ the correct content-type
    res.json(products);
  });

  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
  ```
- In the web browser, navigate to `http://localhost:5000` to see the JSON data. Also, go to the Network tab to see the content-type in the Response Headers section. It should say `application/json`

### [09. Params, query string - setup]()
- When a client queries for data, the server can specify what data and how much data to send back
- File: 08-params-query.js
  ```js
  const express = require('express');
  const app = express();
  // import the products array module from data.js file
  const { products } = require('./data');

  app.get('/', (req, res) => {
    res.send('<h1>Home page</h1><a href="/api/products">products</a>');
  });

  // We can be selective of what data we want to send back to the client
  // In this example, we can choose not to send the price and description of products
  app.get('/api/products', (req, res) => {
    // newProducts is a new array of products
    // Each product element in newProducts array has id, name, and image properties
    const newProducts = products.map((product) => {
      // destructuring id, name, and image properties from product element
      const { id, name, image } = product;
      return { id, name, image };
    });
    // Sending back newProducts in JSON
    res.json(newProducts);
  });

  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
  ```

### [10. Route parameters]()
- File: 09-route-params.js
  ```js
  const express = require('express');
  const app = express();
  // import the products array module from data.js file
  const { products } = require('./data');

  app.get('/', (req, res) => {
    res.send('<h1>Home page</h1><a href="/api/products">products</a>');
  });

  // Can name the route parameter anything you want
  // Route params always starts with a colon
  app.get('/api/products/:productID', (req, res) => {
    // Use req.params to access the route params that the client makes the request
    console.log(req.params); //the route params is always returned in string format

    // Destructuring the productID property from req.params
    // This property matches with the route params the client provides
    const { productID } = req.params;

    // Convert productID to integer
    // because the product id in products array is an integer
    const singleProduct = products.find(
      (product) => product.id === Number(productID)
    );

    // if productID not found, return status 404 and a message
    if (!singleProduct) {
      return res.status(404).send('Product does not exist');
    }

    // Return the data in JSON
    return res.json(singleProduct);
  });

  // A more complex route params
  app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params); //returns productID and reviewID route params
    res.send('Hello world');
  });

  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
  ```

### [11. Query string params]()
- Query string parameters or also called the URL parameters is a way to send a small amount of information using the URL. Send back only the data that matches the query string params
- The way the query string params is setup is provide key-value pairs after the question mark `?`
- If there are more than one query string params, use an `&` to separate between each key-value pair. For example, `/api/v1/query?search=a&limit=1`
- If no query string params is provided, then the server will send back the entire data collection
- File: 10-query-string.js
  ```js
  // If no query string params is provided, the server will return the entire data collection
  app.get('/api/v1/query', (req, res) => {
    // The query string params can be found in req.query
    console.log(req.query);
    // Destructuring the key properties off of req.query
    const { search, limit } = req.query;
    // Create a new products array from the existing products array
    let sortedProducts = [...products];

    // If string param search is provided,
    // filter the product name by the value of the search key
    if (search) {
      sortedProducts = sortedProducts.filter((product) => {
        return product.name.startsWith(search);
      });
    }
    if (limit) {
      // Because the value for the limit key is a string
      // need to convert to an integer
      sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    // If the sortedProducts array is empty and there's nothing wrong with the query
    // send a custom json object with a success status code and an empty data array
    if (sortedProducts.length < 1) {
      res.status(200).send('No products matched your search');
      return res.status(200).json({ success: true, data: [] });
    }

    // Send back data in JSON format
    res.status(200).json(sortedProducts);
  });
  ```

### [12. Middleware - basics]()
- Middleware in Express.js are functions that execute during the request to the server. Each middleware function has access to the `request` and `response` object and `next` function. Middleware functions are everywhere in Express
- Inside the HTTP method, the middleware sits between the request route params and the callback function
  - app.METHOD('ROUTE_PARAMS', MIDDLEWARE, CALLBACK_FUNCTION)
  - `app.get('/', logger, (req, res) => { ... })`
- **NOTE:** When setting up a middleware function, after you write your logic, you must always either terminate the middleware by sending back a response (`res.send()`) OR pass it on to the next middleware by calling `next()`
  ```js
  // A middleware function
  // Express provides req, res, and next
  const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);

    // After writing the logic above...
    // MUST PERFORM ONE OF THESE TWO METHODS
    res.send('Home'); //terminate the middleware by sending a response
    // OR
    next(); //pass it on to the next middleware
  };
  ```
- A middleware function can be used multiple times in different requests
- File: 11-middleware-basics.js
  ```js
  const express = require('express');
  const app = express();

  // A middleware sits between a request and the response
  // Between the route params and the callback function
  // req => middleware => res

  // A middleware function
  // Express provides req and res objects and next method
  const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);

    next(); //pass it on to the next middleware
    // The other option is to send back a response here
  };

  // 2nd arg is referencing the logger middleware
  app.get('/', logger, (req, res) => {
    res.send('Home page');
  });

  // Using the logger middleware
  app.get('/about', logger, (req, res) => {
    res.send('About page');
  });

  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
  ```

### [13. Middleware - app.use() method]()
- File: 12-middleware-use-method.js
- When working with middleware in Express.js, it is best practice to have all middleware in a separate file
- Create a file called logger.js. Move the logger middleware function into this file and export it as a module
  ```js
  // Express provides req, res, and next
  const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);

    next(); //pass it on to the next middleware
    // The other option is to send back a response here
  };

  module.exports = logger;
  ```
- Another thing is we don't need to reference a middleware for every route request we make. Instead, we can use `app.use()` method and pass in the name of the middleware. This makes the middleware available to all routes that want to use the middleware
  ```js
  // Import the logger middleware module
  const logger = require('./logger');

  // app.use() method makes middleware be available to all routes
  // NOTE: order of code matters. Invoke the middleware first
  // 1st arg is the path that the middleware will apply
  // 2nd arg is the middleware
  app.use('/api', logger);

  // No need to pass in a middleware as 2nd arg
  app.get('/', (req, res) => {
    res.send('Home page');
  });
  ```

### [14. Multiple middleware, middleware options]()
- **Applying multiple middleware to all routes:**
  - We can apply multiple middleware functions to all routes simply by passing an array of middleware to the `app.use()` method. Note that the order of these middleware matters. They're being executed in this order
  - `app.use([logger, authorize]);`
- File: authorize.js
  - Create a middleware function called authorize and export as a module
  - What this middleware does is it takes the value of user from the string query params and then performs some logic
  ```js
  const authorize = (req, res, next) => {
    // destructuring user from string query params
    const { user } = req.query;

    // if request string params doesn't match john, send Unauthorize
    if (user === 'john') {
      // Attaching the user property to the request object
      req.user = { name: 'john', id: 3 };
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };

  module.exports = authorize; 
  ```
- File: 13-middleware-multiple-options.js
  - Import the authorize middleware
  - When we want to pass multiple middleware function to app.use() method, we put them in an array. NOTE: the order of the middleware matters! app.use() method executes these middleware in this order
  ```js
  const logger = require('./logger');
  const authorize = require('./authorize');

  // app.use() method makes middleware be available to all routes
  // NOTE: order of code matters. Invoke the middleware first
  // 1st arg is the path that the middleware will apply
  // 2nd arg is the middleware
  // Pass in multiple middleware function in an array
  // NOTE: the order of the middleware in the array matters
  app.use([logger, authorize]);

  app.get('/api/items', (req, res) => {
    console.log(req.user);
    res.send('Items');
  });
  ```
  - Now all the routes have access to the authorize middleware. The way this middleware is setup is if someone makes a request to a route and does not provide the a request string params of user, that person is not authorized
  - In the browser, type `http://localhost:5000/api/items/?user=john`. If the user name matches, then this user can access the requested page. If not, you should see a text "Unauthorized" displayed
- **Applying multiple middleware to one route:**
  - Another way to apply multiple middleware functions to only a specific route is by passing the middleware array as 2nd argument to that route method
  ```js
  // Applying multiple middleware functions to just one route
  app.get('/api/items', [logger, authorize], (req, res) => {
    console.log(req.user);
    res.send('Items');
  });
  ```
  - Now the user must provide the query string when making a request to this particular route
- **Middleware options:**
  - The `app.use()` method expects a middleware to be passed in
  - There are three middleware options we can use: our own, Express, or third party
  - An example of our custom middleware:
    - Use middleware: `app.use([logger, authorize]);`
  - We don't need to install Express's middleware. We just need to invoke it
    - Use middleware: `app.use(express.static('./public'));`
  - We must install third party's middleware
    - Install morgan: `npm i morgan`
    - Import the middleware: `const morgan = require('morgan);`
    - Use: `app.use(morgan('tiny'));`

### [15. HTTP methods]()
- **HTTP methods:**
  - `app.get()` - read data - get data
  - `app.post()` - insert data - send data
  - `app.put()` - update data - path params + send data

  - `app.use()` - responsible for middleware
  - `app.delete()` - delete data - path params  - `app.all()` - handles all http methods
  - `app.listen()` - the port the server is listening on
- File: 14-methods.js
- **GET method:**
  - Get the data using the path params
  - By default, the server performs the `.get()` method on an HTTP request
  ```js
  const express = require('express');
  const app = express();
  // destructure people array from data.js file
  let { people } = require('./data');

  app.get('/api/people', (req, res) => {
    // responding with status code and the data in json format
    res.status(200).json({ success: true, data: people });
  });

  app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
  ```
- **POST method - using form:**
  - We cannot just perform a POST request from the browser. We either need to use an outside tool such as POSTMAN or a working application to make a POST request
  - The `methods-public` folder contains static assets that we're going to use in this example. Use `app.use()` method to invoke Express's built-in middleware `express.static()` and pass in the path to this public folder as an argument
    - `app.use(express.static('./methods-public'));`
    - Browse to `http://localhost:5000/` to see these static assets being served. It's a simple form that we can use to send data using the POST method
  - File: methods-public/index.html
    ```js
    <form action="/login" method="POST">
      <h3>Traditional Form</h3>
      <div class="form-row">
        <label for="name"> enter name </label>
        <input type="text" name="name" id="name" autocomplete="false" />
      </div>
      <button type="submit" class="block">submit</button>
    </form>
    ```
  - File: 14-methods.js
    ```js
    const express = require('express');
    const app = express();

    // static assets
    app.use(express.static('./methods-public'));

    // parse the form data
    // and add the value to req.body property in POST method
    // express.urlencoded() is express built-in middleware
    // that parses incoming requests with urlencoded payloads
    app.use(express.urlencoded({ extended: false }));

    // Handling a POST request
    app.post('/login', (req, res) => {
      console.log(req.body); //to see the value submitted from form
      const { name } = req.body;
      if (name) {
        return res.status(200).send(`Welcome ${name}`);
      }
      res.status(401).send('Please provide credential');
    });
    ```
  - NOTE that the `Content-Type` in the Request Headers object is `application/x-www-form-urlencoded`
- **POST method - using Javascript:**
  - In this example, we're still using a form on front-end to submit the data, but we're going to use Javascript to send the HTTP request
  - We're also going to use Axios package to setup the HTTP request instead of using the built-in `fetch()`. Axios provides cleaner API and better error messages
  - File: methods-public/javascript.html
    - Here the form element doesn't perform a POST method
    - Include an axios script
    - On the front-end, use axios to perform a GET method to fetch the people array data from '/api/people' file. Then iterate over the people array and display each name element beneath the form
    - In terms of submitting the form data to the server, use axios to perform a POST method to the '/api/people' path along with the submitted form value
    ```js
    <form>
      <h3>Javascript Form</h3>
      <div class="form-row">
        <label for="name"> enter name </label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-input"
          autocomplete="false"
        />
        <small class="form-alert"></small>
      </div>
      <button type="submit" class="block submit-btn">submit</button>
    </form>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"
      integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ=="
      crossorigin="anonymous"
    ></script>

    <script>
      const result = document.querySelector('.result')

      const fetchPeople = async () => {
        try {
          const { data } = await axios.get('/api/people')

          const people = data.data.map((person) => {
            return `<h5>${person.name}</h5>`
          })
          result.innerHTML = people.join('')
        } catch (error) {
          result.innerHTML = `<div class="alert alert-danger">Can't Fetch Data</div>`
        }
      }
      fetchPeople()
      // submit form
      const btn = document.querySelector('.submit-btn')
      const input = document.querySelector('.form-input')
      const formAlert = document.querySelector('.form-alert')
      btn.addEventListener('click', async (e) => {
        e.preventDefault()
        const nameValue = input.value

        try {
          const { data } = await axios.post('/api/people', { name: nameValue })
          const h5 = document.createElement('h5')
          h5.textContent = data.person
          result.appendChild(h5)
        } catch (error) {
          // console.log(error.response)
          formAlert.textContent = error.response.data.msg
        }
        input.value = ''
      })
    </script>
    ```
  - File: 14-methods.js
    ```js
    // parse json data
    // this middleware makes it possible for the json data
    // be available in req.body in POST method
    app.use(express.json());

    // Handling a POST request using Javascript
    // Handling a POST request using Javascript
    app.post('/api/people', (req, res) => {
      console.log(req.body); //to see the parsed json data
      const { name } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ success: false, msg: 'Please provide name value' });
      }
      // the form value is stored in the person key
      res.status(201).json({ success: true, person: name });
    });
    ```
  - NOTE that the `Content-Type` in the Request Headers object is `application/json`. Axios automatically adds this for us
- **PUT method:**
  - The PUT method is used to update a piece of data. We need to specify the route params that targets the data we want to update and we also provide the data that we want to update it to
  - File: 14-methods.js
    - Handling the PUT request
    ```js
    // the name after the : can be anything
    app.put('/api/people/:id', (req, res) => {
      const { id } = req.params; //get the value in the route params
      const { name } = req.body; //we have access to json data because of express.json() middleware

      // find the person in people array that matches with the id in route params
      const person = people.find((person) => person.id === Number(id));

      // if person not found, send back a 404 status code and a message
      if (!person) {
        return (
          res
            // 404 status is if we can't find the resource
            .status(404)
            .json({ success: false, msg: `No person with id ${id}` })
        );
      }
      const newPeople = people.map((person) => {
        // if the person id in people array matches the id in the params
        // update the person's name to the name provided from the PUT request
        if (person.id === Number(id)) {
          person.name = name;
        }
        return person;
      });
      res.status(200).json({ success: true, data: newPeople });
    });
    ```
  - To test out our PUT method, use POSTMAN tool and perform a PUT request
    - In the dropdown menu, select the `PUT` method
    - Provide the route params: `http://localhost:5000/api/people/2`
    - Select the `Body` tab, and select `raw` as body type, and select `JSON` as body format
    - Then provide the new data that we want to modify in JSON format. In our case, change the name of the person based on their id in the people array
      ```js
      {
          "name": "Sarah"
      }
      ```
