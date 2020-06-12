# DESIGN PATTERNS
---------------------

- Sum up the values of an object
    ```javascript
    getTotalScore() {
        const { score } = this.props;
        let totalScore = 0;
        // Loop thru the key of scores object
        // Sum together the values of those keys, if they are not 'undefined'
        // 'if (scores[key])' means if the value at that key is not 'undefined'
        for (let key in scores) {
            if (scores[key]) totalScore += scores[key];
        }
        return totalScore;
    }
    ```
- If a prop doesn't ever change, define it in defaultProps attribute right above the constructor function
    ```javascript
    class Die extends Component {
        static defaultProps = {
            numberWords: ['one', 'two', 'three', 'four', 'five', 'six']
        };
        constructor(props) { ... }
    }
    ```
- Methods and events don't bind to its own this value. Must bind it in the constructor function
    ```javascript
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    ```

### USING FONT AWESOME
- Install font awesome package: `npm install --save-dev @fortawesome/fontawesome-free`
- Import in the index.js file. Font awesome can be used throughout the project
    - `import '@fortawesome/fontawesome-free/css/all.css';`
- To use the icon, call the icon's name in the className attribute of an element: 
    - `<i className="fas fa-dice-five" onClick={this.handleClick} />`

# JSX

- command line to run:
`babel src/playground/jsx_and_counter_example.js --out-file=public/scripts/app.js --presets=env,react --watch`

**In index.html file:**
- Load React and ReactDOM scripts and the Javascript app.js script in the body tag
- `<script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>`
- `<script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>`
- `<script src="./scripts/app.js"></script>`

### JSX - Javascript XML
- Is a javascript syntax extension
- It is not part of the core JS language.
- It is provided by React. React offers us a new way to define our templates and to inject data into those templates
- The browser doesn't understand JSX. But we will use Babel to compile JSX code

### BABEL
- https://babeljs.io
- Is a javascript compiler
- The most common use case for Babel is taking features from ES6 & ES7 and compiling them down to ES5 code

**Setting up Babel:**
1. Install Babel itself
2. Install env preset
3. Install react preset
- Run to install babel cli globally: `sudo npm install -g babel-cli`
- `babel --help`
- Run to create package.json file: `npm init -y`
- Now install the 2 babel dependencies: 
  - `npm install babel-preset-env`
  - `npm install babel-preset-react`

**Using Babel:**
- Babel will watch the app.js file in src folder for changes. If there's a change, it will convert the code to ES5 code and stores it in Javascript app.js file in the public/scripts directory
- Run: `babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`
- Include the `--watch` flag to the command above to watch for changes in the app.js file in src folder
- You can see the changes render in the browser automatically when you have babel and live server running in the background

**To install the node_modules folder to have access to the dependcies:**
- Run: `npm install`

### JSX IN COUNTER EXAMPLE
```javascript
const app = {
    title: 'Indecision App',
    subtitle: 'Are you ready?',
    options: ['One', 'Two']
}

// Define JSX, which the browser doesn't understand
// When working with JSX, can only have a single root element. Wrap multiple elements inside the root element
// For readability purposes, wrap the elements inside parenthises ()
// If subtitle exists, render the subtitle. Using && logical operation
// Check the length of array for options property. Using ternary operator
const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
        <ol>
            <li>Item one</li>
            <li>Item two</li>

        </ol>
    </div>
)

const user = {
    name: 'Nga',
    age: 99,
    location: 'San Francisco'
}
function getLocation(location) {
    // If location isn't found, the return value is implicitly set to undefined
    if (location) {
        return <p>Location: {location}</p>
    }
}

// The data inside JSX should not be defined here. Instead, they should come from variables that we reference
// This way we can reuse this template
// {user.name} A variable name inside curly braces is a Javascript expression
// By adding javascript expressions into JSX we can have JSX that is dynamic
// CONDITIONAL RENDERING IN JSX:
//  - Conditionals: if statements, ternary operators, logical && operator
//  - Undefined, null, and booleans(true/false) ARE IGNORED BY JSX
//  - Calling a function is AN EXPRESSION: getLocation()
//  - We can inject a function expression into JSX. The return value from the function is what's going to show up
//  - IF A JSX EXPRESSION IS RESOLVED TO UNDEFINED, NOTHING IS GOING TO SHOW UP
//  - If {getLocation(user.location)} is undefined. Meaning there's no location found, the location property won't even render
//  - A ternary operator is AN EXPRESSION and not a statement
//  - We can add conditional expressions like tenery operator into JSX
// Logical && operator:
//  - true && 'some age' //returns "some age"
//  - fales && 'some age' //returns false (which JSX will ignore)
//  - If what's on the left of && is true, what's on the right will be used. If false, age property will get ignored by JSX
const templateTwo = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
)

// EVENTS AND ATTRIBUTES
// NOTE: the class attribute has been renamed to 'className' because 'class' is a reserved word in JS
// templateThree is an object. It contains a bunch of information about JSX
// onClick is an event listener
// When an event is triggered, we can pass in a function, a callback function, to run
let count = 0
// This function runs when onClick button is triggered
const addOne = () => {
    // Increment count
    count++
    // Re-render JSX and this updated count to the screen
    renderCounterApp()
}
const minusOne = () => {
    count--
    renderCounterApp()
}
const reset = () => {
    count = 0
    renderCounterApp()
}

// Select the element to where we want to display the var template in the browser. Assign it to appRoot variable
const appRoot = document.querySelector('#app')

// JSX DOES NOT HAVE BUILT-IN DATA BINDING
// The JSX express runs before anything is rendered to the screen
// Remember, we don't render anything to the screen until we call ReactDOM.render()
// When we create JSX, all the data that gets used inside of it, that happens at the time the code run
// In this case, count is always going to be 0 because count was zero when JSX first ran
// How to fix this?
// We just rerun the JSX expression and the ReactDOM.render() that has the JSX in it when the data changes. Later on we'll use React component to do that
// So we're going to write a simple function that re-renders JSX when the data changes
//  - It has the JSX
//  - ReactDOM.render() to render the initial JSX
//  - Don't forget to call the function
// Another note, when we're using ReactDOM.render(), we're using React-DOM capability. We're using the virtual DOM algorithm to efficiently render and re-render only the parts that are needed, not wasting a ton of resources
// This runs in Javascript. The virtual DOM algorithm calculates if any changes need to be made and if they do, it calculates the minimal number of changes
// templateThree is an object that represents the entire JSx tree. React uses algorithm to compare two objects tree to figure out what has been changed
const renderCounterApp = () => {
    const templateThree = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOne} className="button">+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
    // Render the JSX(templateThree) in the appRoot element in the browser
    ReactDOM.render(templateThree, appRoot)
}
renderCounterApp()
```

### JSX IN INDECISION APP EXAMPLE
```javascript
const app = {
    title: 'Indecision App',
    subtitle: 'Are you ready?',
    options: []
}

// When the event is called, we get the info about that event object back (e)
const onFormSubmit = (e) => {
    // To prevent the default full-page refresh on form submit
    e.preventDefault()

    const option = e.target.elements.option.value

    if (option) {
        app.options.push(option)
        e.target.elements.option.value = ''
        render()
    }
}

const onRemoveAll = () => {
    app.options = []
    render()
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length)
    const option = app.options[randomNum]
    alert(option)
    render()
}

const appRoot = document.querySelector('#app')

// We can inject an array into JSX: {[...]}
// We can inject JSX items into the array as well
//{[<li></li>,<li></li>,<li></li>]}
// .map() method will return a new array
const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {
                    app.options.map((option) => {
                    return <li key={option}>{option}</li>
                    })
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" placeholder="Enter a task"></input>
                <button>Add Option</button>
            </form>
        </div>
    )
    ReactDOM.render(template, appRoot)
}
render()
```



# REACT COMPONENTS

- command line to run:
`babel src/playground/state-component-indecision.js --out-file=public/scripts/app.js --presets=env,react --watch`

### REACT COMPONENTS
- Create a parent component where all other components will be nested in
- Since a component renders JSX, it can render other components
- This allows us to nest components inside another by referencing it
- React.Component is a class itself
- The IndecisionApp class extends the React.Component class
- Now IndecisionApp is a React component. It has all the features of React
- React components require one method to be defined. It is a special method that it calls. `render()`
- When IndecisionApp component calls `rend()`, it returns JSX
```javascript
class IndecisionApp extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Options />
            </div>
        )
    }
}
```

### COMPONENT PROPS: 
- Component props allows components to comnunicate with one another
- To do that, we pass data in when we initialize/define the instance of a component. for example: `<Header />`
- That data is known as props
- Props gets passed down from parent component to child component. One-way street
- The props is defined in the parent component
- Setting up component props is similar to setting up html attributes
- Setting key/value pair: `<Header title="Test value" />`
- The child component can then have access to this props by using this.props.keyName: `<h1>{this.props.title}</h1>`

**To use component props:**
- inside a component class, we have access to the 'this' keyword, which is a reference to the current instance of this component
- React gives us access to the instance's props on an object(comes in as key/value pair): this.props
- the props key is the name of the attribute in JSX when we initialize/define the instance: `<Header title={title} subtitle={subtitle} />`
- to display this props inside a JSX: `<h1>{this.props.title}</h1>`
```javascript
class Header extends React.Component {
    render() {
        //console.log(this.props)
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        )
    }
}
```

### THE BIND METHOD:
- the `.render()` method is able to bind to the 'this' value properly. `this.props` for example
- however, the METHODS AND EVENT HANDLER FUNCTIONS inside a component class does not bind to the 'this' value, because of the context it's being called
- to fix this in the most efficient way:
  - 1. setup a constructor function for the class component. Pass in the props object
    - The props in the constructor funct is the same props as the this.props in the `render()` method
  - 2. call the `super(props)` method. If we don't call `super(this)`, we won't have access to `this.props`
  - 3. define the method/event handler inside the constructor funct 
  - 4. call the `.bind()` method on the method and pass in 'this' keyword
    - This is making sure that wherever this method gets called, the context is correct
```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOne = this.handleAddOne.bind(this)
        this.handleMinusOne = this.handleMinusOne.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div>
                <h1>Counter: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}
```

### WORKING WITH COMPONENT STATE
1. Initialize the state in constructor function
    - The value of the state is an object
    - In this object, define properties and its initial values. Can have as many properties as you like
    - `this.state = {count: 0}`
2. Display the state by calling `this.state.statePropertyName` in JSX
    - `<h1>Counter: {this.state.count}</h1>`
3. To change the state, call the `.setState()` method: `this.setState(callback)`
    - Inside the callback function, you have access to the previous state in 'prevState' keyword. `(prevState) => {}`
    - To access its properties: `prevState.propertyName`
    - You can set a new value of a property in this callback
4. `.setState()` method will return the state object containing the updated properties and values

### PROPS VS. STATE
**Props:**
- an object
- can be used when rendering
- changes (from above) cause re-renders
- comes from above
- can't be changed by component itself

**State:**
- an object
- can be used when rendering
- changes cause re-renders
- defined in component itself
- can be changed by component itself


### REACT COMPONENT AND STATE IN COUNTER APP EXAMPLE 
```javascript
// Setup Counter component
// Render JSX with a title and 3 buttons
// Create 3 methods: handleAddOne, handleMinusOne, handleReset
// Wireup onClick & bind in the the constructor

// WORKING WITH STATES
// 1. Initialize the state in constructor function
//  - The value of the state is an object
//  - In this object, define properties and its initial values. Can have as many properties as you like
// 2. Display the state by calling this.state.statePropertyName in JSX
//  - <h1>Counter: {this.state.count}</h1>
// 3. To change the state, call the .setState() method: this.setState(callback)
//  - Inside the callback function, you have access to the previous state in 'prevState' keyword. (prevState) => {}
//  - To access its properties: prevState.propertyName
//  - You can set a new value of a property in this callback
// 4. .setState() method will return the state object containing the updated properties and values

class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOne = this.handleAddOne.bind(this)
        this.handleMinusOne = this.handleMinusOne.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            count: 0
        }
    }
    componentDidMount() {
        try {
            // Getting data from localStorage. It will return as json string
            const jsonCount = localStorage.getItem('count')
            // Parse the json string to js object
            const count = parseInt(jsonCount, 10)

            // Check if count is a number
            // If it is set the count as the current state count
            if (!isNaN(count)) {
                this.setState(() => ({count}))
            }
        } catch (e) {
            // Do nothing at all
        }
        console.log('compon did mount')
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            // 1st arg: key
            // 2nd arg: value
            localStorage.setItem('count', this.state.count)
            console.log('saving data')
        }
    }
    handleAddOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count +1
            }
        })
    }
    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count -1
            }
        })
    }
    handleReset() {
        this.setState(() => {
            return {
                count: 0
            }
        })
    }
    render() {
        return (
            <div>
                <h1>Counter: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter />, document.querySelector('#app'))
```

### STATE COMPONENT IN INDECISION APP EXAMPLE
```javascript
// Create a parent component where all other components will be nested in
// Since a component renders JSX, it can render other components
// This allows us to nest components inside another by referencing it
// COMPONENT PROPS: 
//  - Component props allows components to comnunicate with one another
//  - To do that, we pass data in when we initialize/define the instance of a component. for example: <Header />
//  - That data is known as props
//  - Props gets passed down from parent component to child component. One-way street
//  - The props is defined in the parent component
//  - Setting up component props is similar to setting up html attributes
//  - Setting key/value pair: <Header title="Test value" />
//  - The child component can then have access to this props by using this.props.keyName: <h1>{this.props.title}</h1>
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            options: []
        }
    }
    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            }
        })
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        alert(option)
    }
    handleAddOption(option) {
        // If user didn't type anything in
        if (!option) {
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        })
    }
    render() {
        const title = 'Indecision'
        const subtitle = 'Put your life in the hands of a computer'

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

// Component is a class itself
// The Header class extends the Component class
// Now Header is a React component. It has all the features of React
// React components require one method to be defined. It is a special method that it calls. render()
// When Header component calls rend(), it returns JSX
// To use component props:
//  - inside a component class, we have access to the 'this' keyword, which is a reference to the current instance of this component
//  - React gives us access to the instance's props on an object(comes in as key/value pair): this.props
//  - the props key is the name of the attribute in JSX when we initialize/define the instance: <Header title={title} subtitle={subtitle} />
//  - to display this props inside a JSX: <h1>{this.props.title}</h1>
class Header extends React.Component {
    render() {
        //console.log(this.props)
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        )
    }
}

class Action extends React.Component {
    render() {
        // Add the paren () to return longer JSX
        // Can have as many elements as you want INSIDE A ROOT ELEMENT
        return (
            <div>
                <button
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}
                >
                    What should I do?
                </button>
            </div>
        )
    }
}

// this.props.options is the props data that was defined when the instance of Options component was initialized: <Options options={options} />
// In this case, options is an array of items
// .map() over this options array to get the individual items
// Then pass each item to the instance of Option component as a props data when it's initialize here. <Option key={option} optionText={option} />)
// THE BIND METHOD:
//  - the .render() method is able to bind to the 'this' value properly. this.props for example
//  - however, the methods and event handler functions inside a component class does not bind to the 'this' value, because of the context it's being called
//  - to fix this in the most efficient way:
//  - 1. setup a constructor function for the class component. Pass in the props object
//       - The props in the constructor funct is the same props as the this.props in the render() method
//  - 2. call the super(props) method. If we don't call super(this), we won't have access to this.props
//  - 3. define the method/event handler inside the constructor funct 
//  - 4. call the.bind() method on the method and pass in 'this' keyword
//       - This is making sure that wherever this method gets called, the context is correct
//       - this way the method/event handler binds to the same 'this' value as the render() method does 
class Options extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {
                    this.props.options.map((option) => <Option key={option} optionText={option} />)
                }
            </div>
        )
    }
}

// This component is nested inside the Options component
// <div>{this.props.optionText}</div> displays the props data that was defined in the Option component instance when it was initialized
class Option extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
            </div>
        )
    }
}

class AddOption extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault()

        const option = e.target.elements.option.value.trim()
        // NOTE: this.props.handleAddOption() method is defined in the PARENT COMPONENT and gets called inside this function
        // Thus we need to setup the constructor function and call the parent Component to have access to the this.props
        // When this.props.handleAddOption() method is called and resulted in an error, store the error in the variable error
        const error = this.props.handleAddOption(option)
        
        // Update state to error with the error value
        // Then don't foreget to render this error state in JSX
        this.setState(() => {
            return { error }
        })
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" placeholder="Enter a task"></input>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

// To use the components, we provide the component names inside a JSX
// This JSX will then get rendered with ReactDOM.render()
// Don't forget to capitalize the first letter of the component name
// const jsx = (
//     <div>
//         <Header />
//         <Action />
//         <Options />
//         <AddOption />
//     </div>
// )

// To render the parent component, initialize the parent component here
// <IndecisionApp />
ReactDOM.render(<IndecisionApp />, document.querySelector('#app'))
```



# STATELESS FUNCTIONAL COMPONENTS

### STATELESS FUNCTIONAL COMPONENTS IN INDECISION APP
```javascript
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: []
        }
    }
    // LIFECYCLE METHODS
    //  - componentDidMount(), componentDidUpdate(), componentWillUnmount()
    //  - These methods fire at various times in a component lifecycle
    //  - Only have access to these methods in a class-base components
    //
    // This method fires when the component first gets mounted to the DOM 
    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => ({options}))
            }
        } catch (e) {
            // Do nothing at all
        }
    }
    // This method is going to fire after the component updates
    // So after the state values changed or the props values changed
    // Have access to this.props and this.states new values
    // Have access to arguments of prevProps and prevState objects
    // JSON.stringify() converts JS object into json string
    // JSON.parse() takes json string and converts it to JS object
    // With localStorage object:
    //  - setItem(key, value) to save the data
    //  - getItem(key) to fetch the data
    //  - removeItem(key) to delete
    componentDidUpdate(prevProps, prevState) {
        // Check to see if there actually is a change in the array
        if (prevState.options.length !== this.state.options.length) {
            // Take JS object and convert it to JSON string
            // Pass in the options array
            const json = JSON.stringify(this.state.options)
            // Set an item in localStore
            // 1st arg: THE KEY
            // 2nd arg: THE VALUE
            localStorage.setItem('options', json)
            console.log('saving data')
        }
    }
    // This method gets fire just when a component gets unmounted from the screen
    componentWillUnmount() {
        console.log('component will unmount')
    }
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }))
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        alert(option)
    }
    handleAddOption(option) {
        // If user didn't type anything in
        if (!option) {
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }))
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer'

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    )
}

// defaultProps is an object where we can specify the various props that we want to give the default value to
// So when we render a Header(<Header />) and we do not provide a title props, this default value for title will be used
Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    )
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    )
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText)
                }}>
                Remove 
            </button>
        </div>
    )
}

class AddOption extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault()

        const option = e.target.elements.option.value.trim()
        const error = this.props.handleAddOption(option)
        
        this.setState(() => ({ error }))

        if (!error) {
            e.target.elements.option.value = ''
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" placeholder="Enter a task"></input>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

// Stateless functional component
// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     )
// }

ReactDOM.render(<IndecisionApp />, document.querySelector('#app'))
```



# WEBPACK

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
- Run: `sudo npm uninstall -g babel-cli`

### INSTALLING MODULES/DEPENDENCIES LOCALLY (specific to a project)
- make sure you're in the project directory
- Run: `npm init`
- Install: `npm install babel-cli`
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
- Install: `npm install webpack`
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
  - default export: every file can have a single default export
  - named exports: can have as many named exports as you like

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

**1. Install a module:**
- `npm install react`  (using the react library)
- `npm install react-dom` (this library renders the react components to the browser)
- this will install locally to the project
- it's saved as a dependency in package.json file with its version
- its code now lives in the node_modules folder

**2. Import a module:**
- refer to the documentation of the package for how to import
- `import React from 'react'`
- `import ReactDOM from 'react-dom'`
- NOTE: we're grabbing the default export of React here. And we're not providing a relative path, so webpack will look for React in the node_modules folder

**3. Use a module:**
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



# STYLING REACT

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



# REACT-ROUTER

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
 - `Switch` will go through each `Route` one by one to see if the path matches with the requested path
 - If `Switch` finds a matched path, it will stop looking
 - The last `Route` inside Switch is a 404 not found component. This component gets rendered if the path does not match
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
 - Use `Link` when we want to change or switch between pages/routes
 - `Link` and `NavLink` have a "`to`" attribute to specify the path of the link route
 - `<Link to="/">Go home</Link>`
 - The nice thing about `Link` is that we're using client-side routing as oppose to server-side routing
 - This means that it's not going through the full page refresh. Intead, Javascript just swaps things out on the fly. It makes a new call to `ReactDOM.render()` to render the new page
 - Use `Link` whenever we want to take advantage of client-side routing instead of using an anhcor tag
 - Use `NavLink` for navigation. This way, we can call out that specific link that we're on
 - `<NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>`

**Query Strings and URL Parameters:**
- When React-router finds a path that matches, it renders an instance of that component
- Not only is it rendering the instance of the component, it's also passing a few props down
- So anytime we're a component inside a Route, we have access to some special information which are useful to build our application
- These props are: history, location, and match. And these props are objects
- If a user passes additional URL parameters or query string, we can access them via component props
- We can capture the dynamic URL id that comes after the '/' and grab its value with the ':id' syntax: `path="/edit/:id"`
- To view the value of that id: `props.match.params.id`



# REDUX

### WHY WE USE REDUX
- Resource: redux.js.org
- Components state and Redux are 2 tools both aim to solve the same problem, which is to manage the state for an application
- State is data that changes, which means that we need a way to actually change the data for component. It was this.setState() and we need a way to get the data out of that state container
- We need a way to render it to the screen and for components, we just use this.state.keyName to get the value
- So component state is tracking changing data
- Now in complex applications, there's no clear parent component where we can store that state. When we have separate component trees, there's no way to communicate between components
- The other problem is that when we use components state, our components end up communicating a lot
- This isn't inheritly bad, but when we do do it a lot, we create components that are not very reusable. Because they need so many things from the parents which means they can't just be dropped anywhere because the parent might not have the things they need

**The solution to this problem is with Redux**
- Each component can define two things: what data it needs and what data it needs to be able to change
- Redux is a state container, which is exactly what our class-based components are
- We create a redux store and it's just an object like this.state was an object inside our components
- With Redux Store, we're able to read data off of the store and change the data in the store
- The nice thing is that the individiual components they're going to be able to determine how they want to do those things
- Now the other components inside the app they're also going to need to be able to work with the store in one way or another, either reading or writing data
- This way the components aren't communicating between each other so much as the individual components are communicating with the store
- This creates components that are very reusable

**Setting up Redux:**
- Run: `npm install redux`
- Import a single named export, it's a function called createStore. We're gonna destructure it off of the Redux library
- `import { createStore } from 'redux'`
- createStore() is something that is called once to create the store. Once we have the store in place we don't need to call it again

**To create a Store:**
```javascript
const store = createStore((state = { count: 0 }) => {
    return state
})
```
- The createStore function expects a function as the first argument
- The 1st argument to the function that we passed to createStore is the current state: state = current state
- We can set the default state (as object) in the argument as well: `{count: 0}`
- When invoking `createStore()`, this function passed in gets called once right away and the default state is used
- We can fetch the current state object back using the `.getState()` method on the store
- The `.getState()` method returns the current state object
  - `store.getState()`

### ACTIONS
- Actions are our way of communicating with the store
- We can change the Redux store values using actions
- An action is nothing more than an object that gets sents to the store
- And this object describes the type of action we'd like to take
- Example of actions could be: increment, decrement, reset, etc
- This is going to allow us to change the store over time by dispatching various actions
- The method use to send/dispatch an action object to the store is: `store.dispatch()`

**To define an action object:**
- Define an object: with curly braces
- Define the action type property and set the value as the name of action
- Write the action type name all in caps and separatewords with underscore. This is by convention
```javascript
{
    type: 'INCREMENT'
}
```

**To dispatch an action object to the store:**
- The `.dispatch()` method sends an action object to the store
```javascript
store.dispatch({
    type: 'INCREMENT'
})
```

**To use the action inside the store:**
 - The createStore function expects a function to be the 1st arg
 - This function gets called everytime a .dispatch() is made to the store
 - Based on the action type, we can make meaningful changes to the state
 ```javascript
 // 1st arg: the current state. With default state value
 // 2nd arg: the action type that gets passed in
const store = createStore((state = { count: 0 }, action) => {
    // To handle the dispatch action, we're using a switch statement
    // We're switching what we do based off of a particular value. In this case, it's the actiondata type value
    // Inside the curly braces we can define the various cases we want to handle. In our case, wewant to handle the action type
    switch (action.type) {
        // Case when action.type is equal to 'INCREMENT'
        // After the colon, we provide what we want to do
        // Return the updated state object
        case 'INCREMENT':
            return {
                count: state.count + 1
            }
        // Case when action.type is equal to 'DECREMENT'
        case 'DECREMENT':
            return {
                count: state.count - 1
            }
        case 'RESET':
            return {
                count: 0
            };
        // Setup the default case, when the other cases don't run
        // Return the current state
        default: 
            return state
    }
})

store.dispatch({
    type: 'DECREMENT'
})
console.log(store.getState())
```

### Action generators:
- Action generators are functions that return action objects
- We can destructure the properties and set default values in the function argument
The function takes in the action property value passed by the user when this function was invoked in `store.dispatch()`
```javascript
// Action generator
// Destructure the incrementBy property and set a default value to 1
//  If the user provides a value for incrementBy property, we'll use that value. Else we'll increment by 1 by default
// It returns the updated action object with action type and incrementBy properties
// This return action object then get passed to the createStore as 'action' parameter
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

// Create a store
// 2nd arg: the action object received from the action generator
const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
    }
})

// Calling the action generator in in the dispatch method
// No action property is passed in, so action generator will use the ////default value
store.dispatch(incrementCount())

// Action property is provided
store.dispatch(incrementCount({incrementBy: 5}))
```

### REDUCERS
1. Reducers are pure functions
    - the output is only determined by the input. What it returns, it is only determined by the things that get passed in
    - it doesn't use anything else from outside of the function scope and it doesn't change anything outside of the function scope either
    - we don't want to change variables outside of the reducer's scope
    - and we don't want to rely on values from variables outise of the reducer's scope
    - we just want to use the input the state and the action to return the new state value
2. Never change state or action
    - mutating the state directly is going to have undesired effects
 
```javascript
// A reducer
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            }
        default: 
            return state
    }
}

// Passing in the reducer to create store
const store = createStore(countReducer)
```

### CombineReducers:
- Import to file: `import { createStore, combineReducers } from 'redux';`
- Instead of passing in just one reducer to createStore(), we can pass in multiple reducers using the `combineReducers()` method
- The combineReducers function will return an object
- The object returned by the combineReducers is how we want our Redux store to look like, which is an object with expenses and filters properties
```javascript
// The expensesReducer array will be the value on the expenses property
// The filtersReducer object will be the value on the filters property
// The expenses property is managed by the expensesReducer
// The filters property is managed by the filtersReducer
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);
```



# REACT WITH REDUX

### Higher Order Component (HOC)
- A higher order component is a React component (HOC) that renders another component (regular component)
- The goal of a HOC is to reuse code
- Render hijacking
- Prop manipulation
- Abstract state

### TO CREATE A HIGHER ORDER COMPONENT:
1. Create a regular function
    - `const withAdminWarning = () => {..}`
2. Pass in a wrapped component
    - `const withAdminWarning = (WrappedComponent) => {..}`
    - This function has access to a regular component(the wrapped component)
3. This function returns a new component. AND THIS NEW COMPONENT IS THE HOC
    - The HOC renders the new stuff AND the regular component (WrappedComponent)
    - To render the wrapped component, just create an instance of it: `<WrappedComponent />`
    - Can pass in any props this wrapped component has using the spread operator: `<WrappedComponent {...props}/>`
4. Now render the HOC instance and pass in any props you want
    - `ReactDOM.render(<AdminInfo isAdmin={true}/>, ...)`

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

// Regular stateless component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
)

// Create an HOC
const withAdminWarning = (WrappedComponent) => {
    // This returns the HOC
    // The HOC renders the new stuff AND the regular component (WrappedComponent)
    // To render the wrapped component, just create an instance of it
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

// This function gets called with Info component that gets passed in: withAdminWarning(Info)
// It returns a new component and stores it in a componet variable name: const AdminInfo. /// AdminInfo is the HOC
const AdminInfo = withAdminWarning(Info)

ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.querySelector('#app'))
```

### REACT-REDUX LIBRARY
- How do we get access to the store information from the React components?
- We don't want to pass a ton of props to components. They would not be reusable
- Install the react-redux library: npm i react-redux
- We get a Provider component and a connect function from this library
- We use the Provider component once at the root of the application
- We use the connect function for every single component that needs to connect to the Redux store

### THE PROVIDER COMPONENT: CONNECT THE STORE
- Provider is going to allow us to provide the store to all of the components that make up our application
- This is a super useful feature. It means that we do not need to manually pass the store around
- Instead, individual components that want to access the store can just access it

**To use the Provider:**
- Import to the file: `import { Provider } from 'react-redux'`
- Setup the Provider with the Provider tag: `<Provider></Provider>`
- There's a single prop that we have to pass in to provider, which is the store
- This is the store that we're trying to share with the rest of the application
- The prop name is store and we have to set it to the Redux store: `<Provider store={store}></Provider>`
- Inside the Provider tag, we want to render the instance of `<AppRouter>` component
- Now we have an application where all of the components do have access to the store
```javascript
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.querySelector('#app'))
```

### THE CONNECT FUNCTION: CONNECT THE COMPONENTS
- Create a regular component: usually a stateless functional component
- Now we need to create a higher order component
- We need to pass in a regular component to the connect function
- Inside the connect function, this is where we provide the information about what we want to connect
- There's a ton of info in the store, we just need a subset of it
- So the argument we provide to `connect()` is we define a function. This function lets us determine what info from the store we want our component to be able to access
- The store state actually gets passed in as 1st arg to this function
- From this function, we return an object with key/value pair as props we want to access
- The end result from connect is a HOC, a connected version of the regular component with the props from the store
```javascript
import {connect} from 'react-redux'

// A stateless functional component
const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.filters.text}
        {props.expenses.length}
    </div>
)

// A function that maps state to props
const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    }
}

// Export the HOC
export default connect(mapStateToProps)(ExpenseList);

//LONG VERSION:
const ConnectedExpenseList = connect((state) => {
    return {
        expenses: state.expenses
    }
})(ExpenseList);
export default ConnectedExpenseList;
```

**Steps for using the Provider and the connect:**
1. Setup Provider inside the root of the application
  - The Provider tag is inside a JSX
  - This lets us define the store that we want to provide to all of our components 
2. Create new higher order components using the connect function provided from React-Redux 
  - We define a function to define the things that we want to get off of the store. Pass this function to the connect() funct
  - Then we define the component that we want to create the connected version of
- The end result is a brand new component which is just our component with the props from the store
- This is going to allow us to create simple components and scale our app without worrying about putting all the glue into our code
- The component is rendered as is, without anything get passed down. All of this is handled via the connect

### DATE PICKER
- Source: momentjs.com
- airbnb react-dates datepicker library: http://airbnb.io/react-dates
- Install: `npm i moment`
- Install: `npm i react-dates`
- When it comes to working date, don't use the built-in Date object
- Moment library is the way to go when working with dates and time
- React-dates is a datepicker tool that works with `moment()`

**Working with Moment:**
- Import to the file: `import moment from 'moment'`
- To create a moment, just call the moment function: `const now = moment()`
- To format the date moment: `now.format('MMM Do, YYYY')`
- Refer to the documentation for formatting dates

**Working with airbnb react-dates:**
- Import 3 things to the file: 
  - `import { SingleDatePicker } from 'react-dates'`
  - `import 'react-dates/lib/css/_datepicker.css'`
  - `import 'react-dates/initialize'`
- Refer to the doc for different types of datepickers



# FIREBASE 101
- Documenation: firebase.google.com -> reference tab

### Create a Firebase Project:
- On firebase website dashboard, click create a project
- Name your project
- Back to dashboard, click 'connect firebase to a WEB app'
- Set rules to be able to READ and WRITE files
- Create a firebase folder in the src directory. Then create a firebase.js file in the firebase folder
- Copy the provided firebase configuration code to the firebase.js file
- Install firebase: `npm i firebase`
- Import firebase module in the firebase.js file: `import * as firebase from 'firebase'`
- To test that firebase database is connected to the app, run this:
```javascript
firebase.database().ref().set({
    name: 'Nga La'
})
```
- Visit firebase website and go to database tab. The data should show up

### Writing to the Database:
 - The database can store primitive values and objects
 - To access the Firebase database: `firebase.database()`
 - Assign the database to a variable: `const database = firebase.database()`
 - Use `.ref()` method to access the root of the database
 - Pass in a property name to `.ref()` to access that specific property: database.ref('age')
 - Use `.set()` method to set new or existing properties
 - If you set objects/values without passing anything into ref, you will override the existing properties in the database: `database.ref().set('Will override existing db')`
 - To update a property value, reference the property name in the ref, then set the value: `database.ref('location/city').set('Seattle')`

### Promises with Firebase:
 - There are many methods that can be called on reference (ref)
 - `.set()` is a method used to set values. It returns a promise
 - Since it returns a promise, we can chain on `.then()` and `.catch()` methods to resolve or catch the error

### Removing Data from Firebase:
 - Use `.remove()` method on ref to remove specific property
 - Make sure to pass the property name you want to delete into `.ref()`. If you don't specify a name, it will wipe the entire database
 - `database.ref('age').remove()`
 - Another way to delete a property is to set the new value to 'null'. Data at this location and all child location will be deleted
 - `database.ref('age').set(null)`
 - But calling `.remove()` is more explicit

### Updating Data:
 - Use `.update()` method on ref to update the database
 - Update() supports promises. So you can chain on `.then()` and `.catch()` methods
 - You can do multiple updates with a single `.update()` call
 - Unlike `.set()`, `.update()` expects an object to be passed in
 - With update, not only can you update properties that are already exist, you can also add on new properties
 - Inside the update object, you can set a property value to null to delete that property
 - To update a child location inside a property, wrap the path around a quote: `'location/city': 'New York'`

### Reading data from Firebase:
- `.once()` and `.on()` are two methods used to fetch data

**The .once() method:**
 - Use `.once()` method on ref
 - With `.once()` request, we do get an argument back
 - Unlike setting, updating, and removing, we requested some data and the data is available to us. This data is known as a snapshot
 - On this snapshot, we have access to our data
 - We can extract the object by using `snapshot.val()`. It returns the data we requested
 - To read only specific data in the db, pass in the path to ref: `.ref('location/city')`
```javascript
database.ref('location/city')
    .once('value')
    .then((snapshot) => {
        const val = snapshot.val()
        console.log(val)
    })
    .catch((e) => {
        console.log('Error fetching data', e)
    })
```

**The .on() subscription method:**
 - The `.on()` method listens for data changes at a particular location
 - There are 4 events we can listen to for data changes:
    - value event, child_added event, child_removed event, child_changed event
 - The `.on()` method allows us to listen for something over and over again
 - 1st arg: the value event we're making the request
 - 2nd arg: this callback function runs when the value comes back
 - 3rd arg: a function that subscribes to any errors coming back
 - With the .on() subscription, this callback runs every time the data changes. This callback gets re-executed
 - The `.on()` method returns the callback function. We can assign this return to a variable: `const onValueChange = database.ref().on(event, callback)`
 - We can then reference this callback anywhere else we like
 - Unlike with promises, which can only ever be resolved or rejected a single time with a single value
 - We have access to the data via snapshot. Call `.val()` on the snapshot to extract the data
 - The `.on()` method subscribes to the changes made to the db
 - To unsubscribe: `database.ref().off()`
 ```javascript
const onValueChange = database.ref()
    .on('value', (snapshot) => {
        console.log(snapshot.val(), (e) => {
        console.log('error with data fetching', e)
        })
    })
```

### Array Data in Firebase:
 - Firebase does not have array data structure. It has object data structure
 - `.push()` method generates a unique id identifier as a key. You can store an object as the value for this key
 - Here, a new object is generated with a unique id inside the notes tree
 ```javascript
database.ref('notes').push({
    title: 'Course Topics',
    body: 'React Native, Angular, Python'
})
database.ref('notes/-Klsdjfiewjrn3kre').remove()
```
- **Transform Firebase data to an array using forEach():**
```javascript
database.ref('expenses')
    .once('value')
    .then((snapshot) => {
        const expenses = [];

        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        })
        console.log(expenses)
    })
```

- **Subscribe to a change made to the database:**
```javascript
database.ref('expenses')
    .on('value', (snapshot) => {
        const expenses = [];
        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot,
                ...childSnapshot
            })
        })
        console.log(expenses)
    })
```

### FIREBASE WITH REDUX
- Existing code
  - component calls action generator
  - action generator returns object
  - component dispatches object
  - redux store changes

- With Firebase and Redux
  - components calls action generator
  - action generator returns function
  - component dispatches function
  - function runs (has the ability to dispatch other actions and do whatever it wants)



# FIREBASE AUTHENTICATION

- On project dashboard page in Firebase website, click the Authentication tab
Select the Sign-in method tab and enable Google authentication

### SETUP AUTHENTICAION FUNCTIONALITY:
- Resource: firebase.google.com/docs/ -> reference tab -> firebase.auth
- In firebase.js file: create an instance of a Provider
- A Provider is a way to provide authentication. We will use a Google provider
- `const googleAuthProvider = new firebase.auth.GoogleAuthProvider()`
- Export this googleAuthProvider as a named export
- Next we first need to check the authentication state of a user. In app.js file:
```javascript
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('log in')
    } else {
        console.log('log out')
    }
})
```
**Create a startLogin action:**
- Pass in the googleAuthProvider to `.signInWithPopup()`
```javascript
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}
```
**Dispatch the action in LoginPage.js file when a user clicks the Login button:**
```javascript
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
export const LoginPage = ({startLogin}) => (
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
)
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})
export default connect(undefined, mapDispatchToProps)(LoginPage)
```

### A RECAP ON AUTHENTICATION SETUP:
- Create a LoginPage component and wire that up in Route
- Setup a provider (google) in firebase.js. This allows us to setup firebase to authenticate with google
- If we're using google auth provider, we also need to enable that over in the firebase dashboard
- Then we need to pass this provider into a function, into `signInWithPopup()`
- That is what triggers the popup, shows your google accounts, and allows you to pick one
Over inside of app.js, we use `onAuthStateChanged()`. This allows us to run this function every single time the authentication state changed, including when we first load the application

### STEPS FOR WIRING UP THE LOGOUT BUTTON TO REDUX STORE:
- Create a button tag in a component
- Import the action (startLogout). Need to create this action
- Setup `connect()` to connect to Redux store
- With `connect()` set up, we now have access to dispatch
- Setup `mapDispatchToProps` to dispatch the action
- Grab the prop (startLogout) and attach it to onClick event in button tag
- To do this, destructure the prop name, startLogout and pass it in to Header component. Then pass this prop name to onClick event

### REDIRECTING LOGIN AND LOGOUT:
- We need to create browser history
- Install the router history library: `npm i history`
- history is a Javascript library that lets you easily manage session history anywhere Javascript runs. History abstracts away the differences in various environment and provides a minimal API that lets you manage history stack, navigation, confirm navigation, and persist state between session
- In AppRouter.js file import: `import {createBrowserHistory} from 'history'`
- To create a history: `const history = createBrowserHistory()`
- The `<BrowserRouter>` already has a built-in history, but we want to use our own history
- We can then export our history to use anywhere else: `export const history = createHistory()`
- We need to switch from using `<BrowserRouter>` to regular `<Router>` and pass in the history to the Router: `<Router history={history}>`
- In the app.js file import the named export history
- To navigate users between pages, use: `history.push()`. `.push()` method takes a path name
- When a user is logged out redirect them to login page: `history.push('/')`
- Login/logout redirect code:
```javascript
// When user is logged in, redirect to the dashboard page and connect them to the expenses
// When user is logged out, redirect to the login page
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.querySelector('#app'));
        hasRendered = true;
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            // If history location starts out at root directory, redirect to dashboard
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        });
        console.log('log in')
    } else {
        renderApp();
        history.push('/');
        console.log('log out')
    }
})
```

### THE AUTH REDUCER
- We need to create a new reducer to keep track whether a user is logged in by storing a user's uid
- Create auth.js file in reducers folder:
  - Create the reducer
  - This auth reducer handles the login and logout actions
- In the auth.js actions file:
  - Create the LOGIN and LOGOUT actions
  - The LOGIN action takes in the uid of the user
- Now that we have the reducer and the actions in place, we need to connect the reducer to the Redux store and dispatch LOGIN AND LOGOUT actions when appropriate
- To connect to the store, in the configureStore.js file in store folder:
  - Import: `import authReducer from '../reducers/auth'`
  - Add on the auth reducer object to the combineReducers: `{auth: authReducer}`
- Now we need to dispatch login and logout actions in app.js file
  - Import: `import { login, logout } from './actions/auth'`
  - Dispatch LOGIN action when the user is logged in: `store.dispatch(login(user.uid))`
  - Dispatch LOGOUT action when the user is logged out: `store.dispatch(logout())`

### PRIVATE ONLY ROUTE
- We're setting up a PrivateRoute component. It's just a wrapper around Route
- The whole point of using it is to add some conditional logic in
- It allows us to determine if the user is authenticated or not
- Then we can take the correct action, either rendering the private stuff(components) or redirect them to a public page
- This PrivateRoute component gets used in the AppRouter.js file

**Destructuring the props:**
- the `isAuthenticated` came from `mapStateToProps`
- `component` came from `<PrivateRoute component={..} />` instance when it was defined in app.js file. We're renaming this props to `Component` here
- `...rest` the rest operator is grabbing the rest of the props to make sure they correctly get down to Route. You can name it whatever you want
- Inside `<Route />` instance:
  - pass in all the props
  - here, we're defining our own component prop
  - we're setting up some conditional logic inside this function
  - first thing, let's get all of the props that were passed to Route (props). We want to pass those through to the individual component
  - **The condition:**
  - if the user is authenticated, we want some jsx rendered to the screen
  - to do this, use/create a `<Component />` instance and pass in all the props
  - if the user is not authenticated, we want to redirect them
  - React-router-dom gives us a way to do that via a component called `Redirect`. Import this component in
  - Just use/create the `<Redirect />` instance and give the path name to the `to` prop
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={(props) =>
            isAuthenticated ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to='/' />
            )
        }
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
```

### PRIVATE FIREBASE DATA
- We want to have the user expenses to live inside that particular uid
- To get the uid... we need to access the current state using `getState`
- When using thunk actions, async actions, we also have access to `getState` method
- We can call `getState()` to get the current state
```javascript
// NOTE: a portion of the code from startAddExpense action in expenses.js
// 2nd arg: getState
return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database
        .ref(`users/${uid}/expenses`)
        ...
}
```
**Setting up Firebase database rules (on website):**
```javascript
{
    "rules": {
    ".read": false,
    ".write": false,
    "users": {
        "$user_id": {
        ".read": "$user_id === auth.uid",
        ".write": "$user_id === auth.uid"
        }
    }
    }
}
```

### DATA VALIDATION IN FIREBASE: SETTING RULES
```javascript
{
    "rules": {
      ".read": false,
      ".write": false,
      "users": {
        "$user_id": {
          ".read": "$user_id === auth.uid",
          ".write": "$user_id === auth.uid",
          "expenses": {
            "$expense_id": {
              ".validate": "newData.hasChildren(['description', 'note', 'createdAt', 'amount'])",
              "description": {
                ".validate": "newData.isString() && newData.val().length > 0"
              },
              "note": {
                ".validate": "newData.isString()"
              },
              "createdAt": {
                ".validate": "newData.isNumber()"
              },
              "amount": {
                ".validate": "newData.isNumber()"
              },
              "$other": {
                    ".validate": false
                  }
            }
          },
          "$other": {
            ".validate": false
          }
        }
      }
    }
}
```

### AUTHORIZED DOMAINS
- We need to enable authorized domain for the host that we deploy our app, which is Heroku
- In the firebase project dashboard, go to Authentication tab
- Then go to the Sign-In Method tab, scroll to the Authorized domain section
- Click the 'Add Domain' button
- Paste in the Heroku URL of our project: ngala-expensify-app.herokuapp.com

### BABEL POLYFILL
- Older browsers might not support modern features and methods of JS we use in our app
- Babel-polyfill gives us access to a wider range of browsers in terms of what our application supports
- www.browserstack.com allows you to simulate your website on any operating system
- Install: `npm i babel-polyfill`
- Configure in webpack.config.js file. Add babel-polyfill at the beginning of the entry point: `entry: ['babel-polyfill', './src/app.js'],`


### CHALLENGES: FIREBASE AUTHENTICATION

**GOAL: CREATE A LOGIN PAGE**
1. Create LoginPage component with "Login" button
2. Add snapshot test for LoginPage
3. Show Login component at root of app -> /
4. Show ExpenseDashboardPage at -> /dashboard

**GOAL: CREATE PUBLIC ONLY ROUTE**
1. Create PublicRoute (copy PrivateRoute)
2. Redirect to /dashboard if logged in
3. Render component if not logged in
4. Use it for the LoginPage



# REACT HOOKS AND CONTEXT

### USING CREATE REACT APP
- Create-react-app application is designed to get us up and running with a barebones react app quickly
- Install globally: `npm i -g create-react-app`
- To creat a React project: `create-react-app <nameOfProject>`
- It will generate a few things:
  - create a new directory
  - generate all the boilerplate files 
  - install all of the npm modules necessary
- cd into the project directory
- Run: `npm start`
- Create-react-app is using Babel configuration and Webpack configuration behind the scenes. These tools are abstracted away

### REACT HOOK
- A hook is nothing more than a function
- React hook is a function that lets you tap into react features, like state or lifecylce methods
- React ships with its own set of hooks we can use as building blocks and we can also create our own hooks, ie our own functions to customize behavior further
- So no longer are they called stateless functional component, they're now just called FUNCTIONAL COMPONENTS because it is possible to use state inside of them
useState is a hook function that we can call to allow us to use state inside a component

**useState:**
- Built-in React hook: useState is a function that allows us to use component state in our stateless functional components, something we could not do in the past
- useState manages component state
- In a functional component, state does not have to be an object. It can be a string, number, boolean, object, etc
```javascript
const array = useState(0)
<p> The current count is {array[0]}
```
- What comes back from useState is an array of two items:
  - the first is the current state value that's going to change over time
  - the second is a function we can call in order to update the state 
- It is common to destructure the array and give it a name for the item at that index: 
```javascript
const [count, setCount] = useState(0)
<p> The current count is {count}
```
- **4 pieces to useState:**
  - define the state: useState(10)
  - get access to its current value: const [count, setCount]
  - render it: {count}
  - call the function to update the state: onClick={() => setCount(count + 1)}

**useState vs setState:**
- If you want to keep track of multiple states, you don't need to use a state object. You can just call useState multiple times on different things you want to keep track of
- **Three things to note about state:**
  - State doesn't need to be an object with useState
  - You can call useState as many times as you need in a given component for all of the different things you want to track
  - when you are using useState and you update the state, it completely replaces what was there before as opposed to how state worked in the past with objects where the data was merged. This makes things less error prone and it allows us to break up our big state objects into individual values

**useEffect hook:**
- useEffect allows us to do something in functional components that we previously we not able to do: lifecycle methods in clase-based components
- Import: `import {useEffect} from 'react'`
- useEffect is something we call and we pass to it a function. And this function is similar to a combination of componentDidMount and componentDidUpdate
- It's going to run once right away and it's going to run after changes to your component state or props
- It's a useful tool to have because now we can do what we were able to do with lifecycle methods that we can do right in our functional components
```javascript
const [count, setCount] = useState(props.count)
useEffect(() => {
  console.log('useEffect ran')
  document.title = count
}, [count])
```
- What we've done using useEffect is we've allowed us to synchronize our props and our state with whatever we want to
- In this case, we are using it to sychronize the count state with the document title 

**3 ways to use useEffect:**
1. If we don't pass in a dependency array as 2nd arg to useEffect, the function (1st arg) runs if anything changes at all
    - `useEffect(() => {...})`
2. We can optionally pass in a dependency array as a 2nd arg. In here, we can explicitly list out our dependencies to update or take into effect when their state changes
    - This means that the function (1st arg) runs once when the component first mounts and runs on updates for that list of dependencies 
    - `useEffect(() => {...}, [dependencies_array])`
3. We can provide a dependency array but leave it empty
    - This means the function (1st arg) runs once when the component first mounts, but never runs on updates
    - `useEffect(() => {...}, [])`
- We can call useEffect multiple times for each specific feature, each with their own set of dependencies
- In general, it's a good idea to provide the 2nd arg, because we should be explicity about what our effect depends on

```javascript
const App = (props) => {
  // Returns an array of 2 items
  const [count, setCount] = useState(props.count)
  const [text, setText] = useState('')

  useEffect(() => {
    console.log('This should only run once!')
  }, [])

  useEffect(() => {
    console.log('useEffect ran')
    document.title = count
  }, [count])

  return (
    <div>
      <p>The current {text || 'count'} is {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>reset</button>
      <input value={text} onChange={(e) => setText(e.target.value)}/>
    </div>
  )
}

App.defaultProps = {
  count: 10
}

Cleaning up Effects (similar to componentDidUnmount):
After an item is removed, we can unmount it by returning a function
  useEffect(() => {
    console.log('setting up effect')
    return () => {
      console.log('cleaning up')
    }
  }, [])
```

**The 3 main features of useEffect:**
1. registering the effect itself: 1st arg function
2. registering a cleanup function, which is optional
3. registering dependencies array, which is optional
This allows us to get similar behavior to what we had before, but this is a more ideal way
Being able to call useEffect multiple time with different dependencies allows us to keep complex components simple and easy to work with

**useReducer:**
1. First, we need to define a reducer function before we can call useReducer
    - This reducer function looks identical to the type of reducers we're already used to creating w/ Redux
```javascript  
const notesReducer = (state, action) => {
     switch (action.type) {
       case 'POPULATE_NOTES':
         return action.notes
       case 'ADD_NOTE':
         return [
           ...state,
           {title: action.title, body: action.body}
         ]
       case 'REMOVE_NOTE':
         return state.filter((note) => note.title !== action.title)
       default:
         return state
     }
   }
```
2. Then call the useReducer:
    - `const [notes, dispatch] = useReducer(notesReducer, [])`
    - useReducer takes in a reducer function and a state
    - useReducer returns an array of state and dispatch

3. Lastly, dispatch the action type:
```javascript
dispatch({
     type: 'ADD_NOTE',
     title,
     body
})
```

**Context API and useContext Hook:**
- Context provides a way to pass data through the component tree without having to pass props down manually at every level
- In a typical React application, data is psssed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application
- Context provides a way to share values like these btwn components w/out having to explicitly pass a prop through every level of the tree

**1. To create a context (object):**
- Create a folder called context inside src directory. Create a notes-context.js in there
```javascript
import React from 'react'
const NotesContext = React.createContext()
export { NotesContext as default }
```
**2. To use the context:**
- The context object that's created above needs to be accessible in the component that's providing things and on the component that's consuming things
- That's why we have it in its own separate file

- **2A. In the component that provides the context:**
  - Import the context in NoteApp.js: `import NotesContext from '../context/notes-context'`
  - Render the context component as the main root tag in JSX and pass in the Provider property: `<NotesContext.Provider></NotesContext.Provider>`
  - With this in place, we are providing the context value to anyone in here and their children and children's children who wants to consume it
  - we do this by setting the value property as an object with a list of props that other components can have access to: `<NotesContext.Provider value={{ notes, dispatch }}></..>`
```javascript
return (
       <NotesContext.Provider value={{ notes, dispatch }}>
           <h1>Notes</h1>
           <NoteList />
           <AddNoteForm />
       </NotesContext.Provider>
);
```
- **2B. In the component that consumes the context:**
  - We use useContext hook to access the data
  - Import useContext Hook: `import React, { useContext } from 'react'`
  - Extract the props name you want to access the data, destructure it: `const { notes } = useContext(NotesContext)`
  - Then use the props as you like
  - Here's an example to access to the notes data using useContext hook:
```javascript
import React, { useContext } from 'react'
import NotesContext from '../context/notes-context'
const NoteList = () => {
    const { notes } = useContext(NotesContext)

    return (
        notes.map((note) => {
            return (
                <Note key={note.title} note={note} />
            )
        })
    )
}
```
