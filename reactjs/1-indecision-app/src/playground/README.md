**WEBPACK OVERVIEW**
- webpack resource: webpack.js.org
- a module bundler for modern javascript apps
- first advantage of webpack is it allows use to organize our javascript 
- when we run our app through webpack we're going to get a single javascript file back
- that file, what's called the bundle, is going to contain everything our application needs to run
- it contains our dependencies and our application code
- this means in the end of the day we'll have a single script tag as opposed to needing as many script tags as we have javascript files
- this can get unwieldy if you were to add more dependencies. We would have more script tags
- if we wanted to break up our app into multiple files, we would have to add even more script tags and that can really slow down your website needing to make all those requests before your app even runs. This can take a lot of time
- so instead we're just going to make a single request for a single script file
- webpack is breaking up all of the files in our app into their own little islands
- these islands can then communicate using the ES6 import export syntax
- this means that we're going to be able to break up our application into multiple files that can communicate with one another
- this means that we're able to take everything that lives in our application and put it into its own little location
- it's going to be more scalable
- that means we'll be taking our components and breaking that out into its own file
- we'll be able to grab our third party dependencies that we installed w/ npm or yarn that live in the node modules directory
- we'll be able to manage our dependencies and package.json so we can intall our dependencies, uninstall them, and upgrade done with ease by running a few commands
- we're in a new world where we have a ton of client side javascript: we have our code we wrote, we have 3rd-party javascript that we want to have access. That's why tools like webpack are becoming popular
- when we run webpack, we're going to end up with a single file in the public folder called bundle.js
- this is the one file that we're actually be loading ing via a script tag
- the great thing about webpack is that besides allowing us to break up our app into multiple files, it also allows us to compress the code inside of bundle.js
- webpack can even run Babel for us, so we don't have to run a separate Babel command
- as we add more code we can add it into separate small files and it's going to prevent us from getting into a situation where we have a ton of code sitting in a single file, making things really hard to debug and test

**UNINSTALLING GLOBAL MODULES**
- ```sudo npm uninstall -g babel-cli```

**INSTALLING MODULES/DEPENDENCIES LOCALLY** (specific to a project)
- make sure you're in the project directory
- ```npm init```
- ```npm install babel-cli```
- define a script to run these dependencies
``` 
"scripts": {
    "nameOfKey": "value"
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
}
```
- ```npm run <nameOfKey>```
- ```npm run build```

**INSTALLING AND CONFIGURING WEBPACK**
- ```npm install webpack```
- defined a script to run webpack
- ```"scripts": {"build": "webpack --watch"}```
- create a webpack.config.js file in root directory
- inside the webpack.config.js file: 
```
const path = require('path')

// where the entry point is -> output
// to find out the absolute path, run: node webpack.config.js
// console.log(__dirname) -> /Users/nga/Desktop/practice/reactjs/1-indecision-app
// use node.js built-in module, path, to join the absolute path to the public folder
// console.log(path.join(__dirname, 'public')) 

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    mode: 'development'
}
```
- run: ```npm run build```
- this will generate the bundle.js file inside the public directory
- now, delete the scripts folder that is inside the public directory
- inside the index.html file
  - delete the react and the react-DOM scripts
  - the only script tag you have in index.html file is the bundle.js file
  - ```<script src="./bundle.js"></script>```
- there should only be 2 files in the public directory: index.html and bundle.js
- run this to open the project in the browser: ```npm run server```
- run this to serve up webpack in the browser: ```npm run build```

**ES6 IMPORT/EXPORT**
- 2 types of exports:
 1. default export: every file can have a single default export
 2. named exports: can have as many named exports as you like

To export named exports:
- export at the bottom of the file
- the export statement: ```export {}``` 
- define the named export inside the curly braces
- they are references to things we want to export
- note that the curly braces is not an object definition
- ```export { add, square };```
- An alternative way to export a named export is to place the 'export' keyword in front of the variable declaration
- ```export const square = (x) => x * x;```

To import the named exports:
- Inside the file that wants to use the named exports, import the named exports inside the curly braces and provide the path to the file
- ```import { square, add } from './utils.js'```
- Only import the named exports you want to use. No need to import them all
- Make sure the name in the import/export match each other
- The order inside the curly braces does not matter

Default export:
- can only have a single default export
- attach 'as default' after the reference name
- ```export { refName as default }```
- to access the default export, in the import file: import nameOfDefaultExport from 'path to file'
- don't include the curly braces when accessing the default export
- for default export, when importing, the name can be whatever you want
- importing default export and named exports: ```import anythingIWant, { add, square } from 'path to file'```
- an alternative way of exporting default is to put it in a single expression. Can not use it with a statement
- ```const subtract = () => {...}```  (a statement)
- ```export default subtract```  (an expression. reference the subtract variable)
