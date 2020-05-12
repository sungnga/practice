REACT-ROUTER
-------------

### React-Router 101
- React-router source: https://reacttraining.com/react-router/

**Setup React-router:**
- Install the react-router for web: npm install react-router-dom
- Import into app.js file and destructure items we want to use: 
- `import { BrowserRouter, Route } from 'react-router-dom'`

**To create the router configuration:**
 - Only use a single instance of BrowserRouter
 - Inside the BrowserRouter, set up as many instances of Route as pages we have
 - The Route takes two main props: path and component
 - Path: the URL to use for this route
 - Component: when that URL matches, what to show to the screen. We can reference a component we want to show
 - The first/root route needs a 3rd prop to match the exact path: `exact={true}`
```javascript
const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
        </div>
    </BrowserRouter>
)
```
- The server is not well equipped to handle client-side routing, because it's not sending back the html page when a request like '/help' is made. It will send back a 404 not found page
- To fix this, need to configure the dev server in the webpack.config.js file, telling the dev server to always serve up the index.html file for all 404 routes: `historyApiFallback: true`

**Setting up a 404 page:**
 - Import Switch from react-router-dom: 
 - `import { Switch } from 'react-router-dom'`
 - Switch will go through each Route one by one to see if the path matches with the requested path
 - If Switch finds a matched path, it will stop looking
 - The last Route inside Switch is a 404 not found component. This component gets rendered if the path does not match
 ```javascript
<BrowserRouter>
    <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
    </Switch>
</BrowserRouter>
```

**Linking between routes: Link and NavLink**
 - Import Link and NavLink from react-router-dom: 
 - `import { Link, NavLink } from 'react-router-dom'`
 - Use Link when we want to change or switch between pages/routes
 - Link and NavLink have a "to" attribute to specify the path of the link route
 - `<Link to="/">Go home</Link>`
 - The nice thing about Link is that we're using client-side routing as oppose to server-side routing
 - This means that it's not going through the full page refresh. Intead, Javascript just swaps things out on the fly. It makes a new call to `ReactDOM.render()` to render the new page
 - Use Link whenever we want to take advantage of client-side routing instead of using an anhcor tag
 - Use NavLink for navigation. This way, we can call out that specific link that we're on
 - `<NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>`

**Query Strings and URL Parameters:**
- When React-router finds a path that matches, it renders an instance of that component
- Not only is it rendering the instance of the component, it's also passing a few props down
- So anytime we're a component inside a Route, we have access to some special information which are useful to build our application
- These props are: history, location, and match. And these props are objects
- If a user passes additional URL parameters or query string, we can access them via component props
- We can capture the dynamic URL id that comes after the '/' and grab its value with the ':id' syntax: `path="/edit/:id"`
- To view the value of that id: `props.match.params.id`



WEBPACK
--------------------

### WEBPACK OVERVIEW
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

### UNINSTALLING GLOBAL MODULES
- `sudo npm uninstall -g babel-cli`

### INSTALLING MODULES/DEPENDENCIES LOCALLY (specific to a project)
- make sure you're in the project directory
- `npm init`
- `npm install babel-cli`
- define a script to run these dependencies
```javascript
"scripts": {
    "nameOfKey": "value"
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
}
```
- `npm run <nameOfKey>`
- `npm run build`

### INSTALLING AND CONFIGURING WEBPACK
- `npm install webpack`
- defined a script to run webpack
- `"scripts": {"build": "webpack --watch"}`
- create a webpack.config.js file in root directory
- inside the webpack.config.js file: 
```javascript
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
- run: `npm run build`
- this will generate the bundle.js file inside the public directory
- now, delete the scripts folder that is inside the public directory
- inside the index.html file
  - delete the react and the react-DOM scripts
  - the only script tag you have in index.html file is the bundle.js file
  - `<script src="./bundle.js"></script>`
- there should only be 2 files in the public directory: index.html and bundle.js
- run this to open the project in the browser: `npm run server`
- run this to serve up webpack in the browser: `npm run build`

### ES6 IMPORT/EXPORT
- 2 types of exports:
1. default export: every file can have a single default export
2. named exports: can have as many named exports as you like

**To export named exports:**
- export at the bottom of the file
- the export statement: `export {}`
- define the named export inside the curly braces
- they are references to things we want to export
- note that the curly braces is not an object definition
- `export { add, square };`
- An alternative way to export a named export is to place the 'export' keyword in front of the variable declaration
- `export const square = (x) => x * x;`

**To import the named exports:**
- Inside the file that wants to use the named exports, import the named exports inside the curly braces and provide the path to the file
- `import { square, add } from './utils.js'`
- Only import the named exports you want to use. No need to import them all
- Make sure the name in the import/export match each other
- The order inside the curly braces does not matter

**Default export:**
- can only have a single default export
- attach 'as default' after the reference name
- `export { refName as default }`
- to access the default export, in the import file: `import nameOfDefaultExport from 'path to file'`
- don't include the curly braces when accessing the default export
- for default export, when importing, the name can be whatever you want
- importing default export and named exports: `import anythingIWant, { add, square } from 'path to file'`
- an alternative way of exporting default is to put it in a single expression. Can not use it with a statement
- `const subtract = () => {...}`  (a statement)
- `export default subtract`  (an expression. reference the subtract variable)

### IMPORTING NPM MODULES
- 3-step process to working with npm modules: install, import, use

**Install a module:**
- `npm install react`  (using the react library)
- `npm install react-dom` (this library renders the react components to the browser)
- this will install locally to the project
- it's saved as a dependency in package.json file with its version
- its code now lives in the node_modules folder

**Import a module:**
- refer to the documentation of the package for how to import
- `import React from 'react'`
- `import ReactDOM from 'react-dom'`
- NOTE: we're grabbing the default export of React here. And we're not providing a relative path, so webpack will look for React in the node_modules folder

**Use a module:**
- refer to the library doc to learn how to use it
- `const template = React.createElement('p', {}, 'testing 123')`
- `ReactDOM.render(template, document.querySelector('#app'))`

### SETTING UP BABEL WITH WEBPACK
- We need to first configure Babel to work with webpack before we can use JSX in webpack
- We do this by running babel-loader
- Babel-loader allows us to run Babel in webpack under certain conditions
- run: `npm install @babel/core babel-loader @babel/preset-env @babel/preset-react`
-  Configure the babel-loader in webpack.config.js file. Babel will run all files that end in .js
```javascript
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    mode: 'development'
}
```
- Create .babelrc file and include all the presets there
```javascript
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```
- Now we can use JSX
- run again to see JSX renders in the browser: npm run build

### SOURCE MAPS WITH WEBPACK
 - Source maps is a great setup/config to debug errors in our code
 - When an error occurs, it will point directly to the file that the error was generated
 - If this was not set up, the error will point to the bundle.js file instead
 - Setup the devtool property in webpack.config.js file:
 - `devtool: 'cheap-module-eval-source-map'`

### WEBPACK DEV SERVER
 - Webpack devServer is a replacment for Web Live Server but with webpack features such as the "webpack --watch"
 - Install webpack devServer: `npm install webpack-dev-server`
 - Setup the devServer property in webpack.config.js file:
```javascript
devServer: {
    contentBase: path.join(__dirname, 'public')
}
```
 - Setup the script in package.json file:
```javascript
"scripts": {
    "serve": "live-server public/",
    "build": "webpack",
    "dev-server": "webpack-dev-server"
}
```
 - Now with "dev-server" as a script, it'll run the Live devServer and webpack will "--watch" for any changes made to the files
 - run: `npm run dev-server`
 - It will specify the port it's running on: `localhost:8080`
 - NOTE: When we run `npm run build`, it'll generate the bundle.js file. The file size is big. We do this when the app is ready for production. Otherwise, run: `npm run dev-server` during development mode

### ES6 CLASS PROPERTIES
 - Install: `npm install babel-plugin-transform-class-properties`
 - Configure in .babelrc file:
 ```javascript
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "transform-class-properties"
    ]
}
```

**To use the new class syntax:**
 - This Babel plugin allows us to define a class component without having to setup a constructor function
 - Instead, we can just setup a key/value pair to define properties for the class
 - We're now able to set the state outside of the constructor function. `state = { key: value }`
 - We're also able to set class properties to arrow functions
 - This is a great candidate for things like event handlers. Event handlers usually have a problem maintaining the 'this' binding. But with arrow functions we no longer have to worry about this
 - We can define methods as properties of the class using arrow functions instead of regular functions
 - Arrow functions don't bind their own 'this' value. They're just going to use whatever 'this' is in scope
 - And for arrow functions on class properties, that is the class instance itself
```javascript
// Old syntax
class OldSyntax {
    constructor() {
        this.name = 'Mike'
        this.getGreeting = this.getGreeting.bind(this)
    }
    getGreeting() {
        return `My name is ${this.name}.`
    }
}
const oldSyntax = new OldSyntax()
const getGreeting = oldSyntax.getGreeting
console.log(getGreeting())
// New syntax
class NewSyntax {
    name = 'Jack'
    getGreeting = () => {
        return `My name is ${this.name}.`
    }
}
const newSyntax = new NewSyntax()
const newGetGreeting = newSyntax.getGreeting
console.log(newGetGreeting())
```

**FINAL WEBPACK.CONFIG.JS FILE SETUP:**
```javascript
const path = require('path')

// where the entry point is -> output
// to find out the absolute path, run: node webpack.config.js
// console.log(__dirname) -> /Users/nga/Desktop/practice/reactjs/1-indecision-app
// use node.js built-in module, path, to join the absolute path to the public folder
console.log(path.join(__dirname, 'public')) 

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
    mode: 'development'
}
```

STYLING REACT
-------------

### SETTING UP WEBPACK WITH SCSS
 - Install style loader and css loader: `npm install style-loader css-loader`
 - Configure webpack.config.js file:
 ```javascript
{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader'
    ]
}
```
 - We will be styling our application using sass instead of regular css
 - Behind the scenes, sass loader is going to use node-sass to convert/compile the sass file down to css for us
 - Install: `npm install sass-loader node-sass`
 - Configure webpack.config.js file:
 ```javascript
{
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
}
```
 - Import into app.js file: `import './styles/styles.scss'`

### WORKING WITH SCSS
 - There should be a main entry point styles file that gets imported into the app.js file, example styles.scss file that lives in the styles folder
 - This main styles.scss file functions very similar to the app.js file. It does not contain any styles and selectors here. Instead, it contains imports of selectors and styles defined elsewhere 
 - This allows us to break up our application styles into multiple files as oppose to having everything defined in a single file of styles.scss 
 - When a scss file starts with an underscore (_), it's known as a partial
 - Partials contain part of the application styles and they get loaded into the entry point styles file
 - To import a partial in the main styles.scss file: `@import './base/base'`
 - `@import` is the SCSS import syntax. And then the file path, leaving off the underscore and the extension

**Font-size:**
 - By default, 1rem equals 16pixels
 - To make the conversion a little easier to work with, set this as global font-size family:
 ```scss  
html {
    font-size: 62.5 %;
}
```
 - So now if we want a 22pixels font-size, we can type: `font-size: 2.2rem;`

**BEM (block element modifier) Naming Convention:**
 - Source: getbem.com
 - To target an element that is inside another element(block), use double underscore (__) followed by a name you want to give to that child element
 - For example, targeting the title element inside the header class(block): `.header__title {...}`
 - The modifier is to take a styled block and make some changes to it
 - The naming convention for a modifier is to use double hyphens (--) followed by a name you want to give it
 - For example, to modify the existing button block: `.button--link {...}`
 - When applying the styles to an element make sure to call both the existing block and the modifier. For example, `<button className="button button--link">`

 **CSS Reset:**
 - A css reset is just make sure that all browsers are starting at the same base
 - Normalize css is a library that can reset the default browsers
 - Install: `npm install normalize.css`
 - Import this file into app.js file: `import 'normalize.css/normalize.css'`
 - Need to configure webpack.config.js file to support both css and scss files by adding a ? after the s: `{test: /\.s?css$/}`

**Theming with Variables:**
 - Create a file called _settings.scss inside the base folder
 - This file is a place to define the theme for the application
 - It uses variables to set the style values that can then be used and reused by referencing the variable name
 - Import this _settings.scss file in the main styles.scss file AT THE VERY TOP: `@import './base/settings';`
 - When we're creating a scss variable we need to start off with a '$' symbol followed by the variable name
 - `$off-black: #20222b;`  (define the style by the variable name)
 - `background: @off-black;`  (referencing the style using the variable name)
 - When we want to tweak the value of this style, we can do it in the _settings.scss file and it will update all the style files with this new value
