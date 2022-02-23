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