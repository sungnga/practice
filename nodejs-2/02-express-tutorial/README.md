## SECTION 2: EXPRESS TUTORIAL
- Folder directory: /02-express-tutorial/

### [01. Initialize Express project with starter project]()
- Get start project file from https://github.com/john-smilga/node-express-course/tree/main/02-express-tutorial
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon and express libraries
- Then run the script `npm start` to startup the project

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
- File: 02-http-app.js