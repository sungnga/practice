## SECTION 1: NODE TUTORIAL
- Folder directory: /01-node-tutorial/

### 01. Using the CLI
- File: 01-cli.js
- We can use the integrated VSCode terminal to execute our node files
- Create an 01-cli.js file in this 01-node-tutorial directory
- In the terminal, cd into 01-node-tutorial folder. Then run: `node 01-cli.js`
- We should be able to see messages printed out in the terminal

### 02. Globals - no window!
- File: 02-globals.js. In the terminal, run: `node 02-globals.js` to execute this file
- In vanilla JS, we have access to the Window object from the browser and this gives us built-in methods to use. In Node.js, there's no Window object. There is, however, global variables that we have access to 
- Here are some examples of global variables:
  - __dirname - path to current directory
  - __filename - file name
  - require - function to use modules (CommonJS)
  - module - info about current module (file)
  - process - info about env where the problem is being executed

### 03. Modules
- File: 03-modules.js
- `module` is a global variable
- Node uses the CommonJS library under the hood. So every file in Node is a module (by default)
  - If we write `console.log(module)` inside a file and run this file in the terminal, we get a lot of information about this file in the `Module` object
  - The property we're most interested in in this Module object is the `exports` property. `exports` is an object and we can specify what piece of information or code within this file(module) that we want to share globally by putting it in this `exports` object
- Modules - Encapsulated Code (only share minimum)
- **To export a module:**
  - Inside a file that we want to export(share) certain piece of information
  - Export an object: `module.exports = { object1, object2 };`
  - Export a function: `module.exports = nameOfFunction;`
  - Export as-we-go: `module.exports.items = ['item1', 'item2'];`
  - Export an object:
    ```js
    const person = {
      name: 'bob'
    };

    module.exports.singlePerson = person;
    ```
- **To import a module:**
  - Inside another file that we want to consume a module
  - Write `require('path_name')`. We can also assign the result to a variable
    - `const names = require('./04-names');`
  - NOTE: when you require a module, you actually invoking it. For example, if the module that you're importing is a function and that function is called in the file that the function is written in, you essentially invoke the function when requiring the module
    - file1.js:
      ```js
      const num1 = 5;
      const num2 = 10;

      function addValues() {
        console.log(`The sum is: ${num1 + num2}`);
      }

      addValues();
      ```
    - file2.js:
      ```js
      require('./file1');
      ```
  
### 04. Built-in modules
- Some of useful Node's built-in modules:
  - OS
  - PATH
  - FS
  - HTTP
- We do not have to install built-in modules to use it. They come with Node
- When require a built-in module, we don't need to provide a path to the module. We simply call the name of the module
- **OS - built-in module:**
  - File: 08-os-module.js
  ```js
  // now we have access to all the properties and methods the os module provides
  const os = require('os');

  // info about current user
  const user = os.userInfo();
  console.log(user);

  // method returns the system uptime in seconds
  console.log(`The System Uptime is ${os.uptime()} seconds`);

  const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
  };

  console.log(currentOS);
  ```
- **PATH - built-in module:**
  - File: 09-path-module.js
  ```js
  const path = require('path');

  // returns a back-slash
  console.log(path.sep); // /(slash)

  // get the normalized path
  const filePath = path.join('/content', 'subfolder', 'test.txt');
  console.log(filePath); // /content/subfolder/test.txt

  // returns base filename
  const base = path.basename(filePath);
  console.log(base); // test.txt

  // returns an absolute path
  const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
  console.log(absolute); // /Users/nga/Desktop/practice/nodejs-2/01-node-tutorial/content/subfolder/test.txt
  ```
- **SYNC FS - built-in module:**
  - File: 10-fs-sync.js
  ```js
  // destructure the methods we want to use out of the fs module
  const { readFileSync, writeFileSync } = require('fs');
  // console.log('start')

  // readFileSync() is a method that reads files
  // 1st arg is the file path
  // 2nd arg is the encoding option
  const first = readFileSync('./content/first.txt', 'utf8');
  const second = readFileSync('./content/second.txt', 'utf8');
  console.log(first, second);

  // WriteFileSync() is a method that writes a file
  // 1st arg is the name of file. If it doesn't exist, Node will create one
  // 2nd arg is the value. By default, if the file already exists, it'll overwrite the value
  // 3rd arg is a flag object to append a value instead of overwriting it
  writeFileSync(
    './content/result-sync.txt',
    `Here is the result: ${first}, ${second} `,
    { flag: 'a' }
  );
  ```
- **ASYNC FS - built-in module:**
  - File: 11-fs-async.js
  - NOTE: This code is considered "a callback hell" because a callback function is nesting within a callback function within a callback function. An alternative to using callbacks is to use promises and async/await
  ```js
  // An async function returns an error or a result
  // We can do something with the result that we get back in a callback function

  // readFile() and writeFile() methods are an ASYNC functions from the fs module
  const { readFile, writeFile } = require('fs');

  // 1st arg is the path of the file
  // 2nd arg is the encoding value. If we don't provide, it'll return the buffer
  // 3rd arg is the callback function
  readFile('./content/first.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(result);

    const first = result;
    
    readFile('./content/second.txt', 'utf8', (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      const second = result;
      
      // 1st arg the file path to write to. If it doesn't exist, Node will create one
      // 2nd arg is the values to write to
      // 3rd arg is the callback function
      // When this file runs, a new file called result-async.txt will be created in the content folder
      writeFile(
        './content/result-async.txt',
        `Here is the result: ${first}, ${second} `,
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(result);
        }
      );
    });
  });
  ```
- **HTTP - setup module:**
  - File: 12-http.js
  - Run this file in the terminal: `node 12-http.js`
  - Now the server is listening on port 5000
  - To stop the server, run: `control c`
  - Go to a web browser and type in `localhost:5000` to see the printed message
  ```js
  const http = require('http');

  // the req is the incoming request object
  // the res is what is sending back
  const server = http.createServer((req, res) => {
    res.write('Welcome to our home page');
    // end the request
    res.end();
  });
  
  // provide the port number the server is listening to
  server.listen(5000);
  ```
- **HTTP - some features:**
  - File: 12-http.js
  ```js
  const http = require('http');

  // the req is the incoming request object
  // the res is what is sending back
  const server = http.createServer((req, res) => {
    // console.log(req);
    if (req.url === '/') {
      // end the request
      res.end('Welcome to our home page');
    } else if (req.url === '/about') {
      res.end('Here is our short history');
    } else {
      res.end(`
      <h1>Oops!</h1>
      <p>We can't seem to fine the page your are looking for</p>
      <a href="/">back home</a>
    `);
    }
  });

  // provide the port number the server is listening to
  server.listen(5000);
  ```

### 04. NPM - Node Package Manager
- Node Package Manager (NPM) is a library, module, or dependency written by other developers and shared in the community
- **NPM command:**
  - `npm` is a global command, comes with Node
    - To find out the npm version you have, run: `npm --version`
  - Local dependency - use it only in this particular project
    - To install a package, run: `npm i <packageName>`
  - Global dependency - use it in any project
    - To install a dependency globally, add the `-g` flag: `npm i -g <packageName>`
    - On a mac: `sudo npm i -g <packageName>`
- **Creating package.json file:**
  - `package.json` is a manifest file (stores important info about project/package)
  - 1st approach to create the package.json file: the manual approach (create package.json in the root, create properties etc.)
  - 2nd approach: run `npm init` (step by step, press enter to skip)
  - 3rd approach: run `npm init -y` (everything default)
  - All the names of the dependencies installed locally for a project/application will be listed in the `dependencies` property in the package.json file
- **node_module folder:**
  - When installing a dependency via `npm install`, the dependency package (along with any other dependencies it needs) will be stored in a folder called `node_modules`. Node automatically creates one at the root of the project if it doesn't already have one
  - When downloading someone else's project we need to install the project dependencies ourselves by running `npm install`. Node will go to the package.json file and look for all the dependencies (and their version) and install them in the `node_modules` folder
- **Installing nodemon dependency:**
  - Nodemon is a dev dependency that watches for changes in a file and automatically re-executes the code without us having to type `node <fileName>` in the terminal every time
  - To install globally, run: `npm i -g nodemon`
    - By installing nodemon globally we can run nodemon in any project
    - To run nodemon on a file, run in the terminal: `nodemon <fileName>`. Now nodemon is watching that file
  - To install as dev dependency in a project, run: `npm i -D nodemon`
    - Now nodemon and its version is added to the `devDependencies` property in package.json file
    ```js
    "devDependencies": {
      "nodemon": "^2.0.15"
    }
    ```
  - Can also run nodemon in the `scripts` property in package.json file
    ```js
    "scripts": {
      "start": "nodemon app.js",
      "dev": "nodemon index.js"
    }
    ```
    - To run the script, simply run: `npm run start` or `npm run dev`
  - To stop running nodemon, run: `control + c`

### 05. The Node.js Event Loop
- The Node.js JavaScript code is synchronous and runs on a single thread. There is just one thing happening at a time. This is a limitation that's actually very helpful, as it simplifies a lot how we program without worrying about concurrency issues
- We just need to pay attention to how you write your code and avoid anything that could block the thread, like synchronous network calls or infinite loops. In general, in most browsers there is an event loop for every browser tab, to make every process isolated and avoid a web page with infinite loops or heavy processing to block your entire browser
- **Blocking the event loop**
  - Any JavaScript code that takes too long to return back control to the event loop will block the execution of any JavaScript code in the page, even block the UI thread, and the user cannot click around, scroll the page, and so on
  - Almost all the I/O primitives in JavaScript are non-blocking. Network requests, filesystem operations, and so on. Being blocking is the exception, and this is why JavaScript is based so much on callbacks, and more recently on promises and async/await
- **The call stack**
  - The call stack is a LIFO (Last In, First Out) stack
  - The event loop continuously checks the **call stack** to see if there's any function that needs to run
  - While doing so, it adds any function call it finds to the call stack and executes each one in order
- **The Message Queue**
  - When setTimeout() is called, the Browser or Node.js starts the timer. Once the timer expires, in this case immediately as we put 0 as the timeout, the callback function is put in the **Message Queue**
  - The Message Queue is also where user-initiated events like click or keyboard events, or fetch responses are queued before our code has the opportunity to react to them. Or also DOM events like `onload`
  - **The loop gives priority to the call stack, and it first processes everything it finds in the call stack, and once there's nothing in there, it goes to pick up things in the message queue**
  - We don't have to wait for functions like `setTimeout`, fetch or other things to do their own work, because they are provided by the browser, and they live on their own threads. For example, if we set the `setTimeout` timeout to 2 seconds, we don't have to wait 2 seconds - the wait happens elsewhere
- **ES6 Job Queue**
  - ECMAScript 2015 introduced the concept of the Job Queue, which is used by Promises (also introduced in ES6/ES2015). It's a way to execute the result of an async function as soon as possible, rather than being put at the end of the call stack

  - Promises that resolve before the current function ends will be executed right after the current function

  - Similar to a rollercoaster ride at an amusement park: the message queue puts you at the back of the queue, behind all the other people, where you will have to wait for your turn, while the job queue is the fastpass ticket that lets you take another ride right after you finished the previous one
  ```js
  const bar = () => console.log('bar')

  const baz = () => console.log('baz')

  const foo = () => {
    console.log('foo')
    setTimeout(bar, 0)
    new Promise((resolve, reject) =>
      resolve('should be right after baz, before bar')
    ).then(resolve => console.log(resolve))
    baz()
  }

  foo()

  // Terminal
  foo
  baz
  should be right after baz, before bar
  bar
  ```
  - That's a big difference between Promises (and Async/await, which is built on promises) and plain old asynchronous functions through setTimeout() or other platform APIs

### 06. Blocking code, promises, and async/await patterns
- File: 13-promises-async-await.js
- **Blocking code:**
  - A `for` loop is a blocking code because it takes sometime to finish
  ```js
  const http = require('http');

  const server = http.createServer((req, res) => {
    if (req.url === '/') {
      res.end('Home page');
    } else if (req.url === '/about') {
      // Blocking code
      for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
          console.log(`${i} ${j}`);
        }
      }
      res.end('About page');
    } else res.end('Error page');
  });

  server.listen(5000, () => {
    console.log('Server listening on port 5000');
  });
  ```
- **Promise pattern:**
  ```js
  const { readFile } = require('fs');

  // the getText() function returns a promise
  // pass in a callback function to the new Promise object
  // the callback receives a resolve and a reject functions as arguments
  const getText = (path) => {
    return new Promise((resolve, reject) => {
      readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  // call the getText() function and provide the path
  // chain on the .then() and .catch() methods when a function returns a promise
  getText('./content/first.txt')
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  ```
- **Async/await pattern:**
  - When using async/await, it waits for the promise to be resolved before moving on
  - Use a try/catch block when writing an async function
  - Can perform multiple operations in an async function
  ```js
  // when writing an async function use a try/catch block
  const start = async () => {
    // performing multiple operations
    try {
      const first = await getText('./content/first.txt');
      const second = await getText('./content/second.txt');
      console.log(first, second);
    } catch (error) {
      console.log(error);
    }
  };

  start();
  ```
- **Async/await pattern - Node's native option:**
  - Chain on `.promises` on a module and the functions from the module will return promises
  ```js
  // chain on .promises to the module and the functions will return promises
  const { readFile, writeFile } = require('fs').promises;

  const start = async () => {
    try {
      const first = await readFile('./content/first.txt', 'utf8');
      const second = await readFile('./content/second.txt', 'utf8');
      await writeFile(
        './content/result-mind-grenade.txt',
        `THIS IS AWESOME: ${first} ${second}`,
        { flag: 'a' }
      );
      console.log(first, second);
    } catch (error) {
      console.log(error);
    }
  };

  start();
  ```

### 07. Events Emitter
- File: 14-event-emitter.js
  ```js
  // get back the class from the events module
  // if want custom extend from class
  // otherwise just for emitting and handling events create instance
  const EventEmitter = require('events');

  const customEmitter = new EventEmitter();

  // the on() and emit() methods
  // the order when these methods are called is important
  // additional arguments
  // other built-in modules utilize it all the time
  // response is the name of the event
  // the callback function is where we write the logic of what to do with the data
  customEmitter.on('response', (name, id) => {
    console.log(`data received user ${name} with id:${id}`);
  });

  customEmitter.on('response', () => {
    console.log('some other logic here');
  });

  customEmitter.emit('response', 'john', 34);
  ```

### 08. Events emitter - HTTP module example
- An example of `http` module is utilizing events emitter behind the scenes
  ```js
  const http = require('http');

  // const server = http.createServer((req, res) => {
  //   res.end('Welcome')
  // })

  // Using Event Emitter API
  const server = http.createServer();
  // behind the scenes, server emits the request event
  // then we can subscribe to it / listen for it / respond to it using the .on() method
  server.on('request', (req, res) => {
    res.end('Welcome');
  });

  server.listen(5000);
  ```