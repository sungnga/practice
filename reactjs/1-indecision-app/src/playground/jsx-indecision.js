console.log('Apooooop.js is running')

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





// =========================
// CHALLENGES
// =========================

// GOAL1: Create a templateTwo var JSX expression
// div
//   h1 -> Andrew Mead
//   p -> Age: 26
//   p -> Location: Seattle
// Render templateTwo instead of template

// GOAL2: Create app object title/subtitle
// use title/subtitle in the template
// render template

// GOAL3: Rendering with conditionals
// only render the subtitle (and p tag) if subtitle exists - logical && operator
// render new p tag - if options.length > 0 "Here are your options" "No options"

// GOAL4: Create renderOption function that renders the new jsx
// Call it right away
// Call it after options array added to



// =========================
// NOTES
// =========================
// command line to run:
// babel src/playground/jsx-indecision.js --out-file=public/scripts/app.js --presets=env,react --watch

// In index.html file:
// Load React and ReactDOM scripts and the Javascript app.js script in the body tag
// <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
// <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
// <script src="./scripts/app.js"></script>

// JSX - Javascript XML
// Is a javascript syntax extension
// It is not part of the core JS language.
// It is provided by React. React offers us a new way to define our templates and to inject data into those templates
// The browser doesn't understand JSX. But we will use Babel to compile JSX code

// BABEL
// https://babeljs.io
// Is a javascript compiler
// The most common use case for Babel is taking features from ES6 & ES7 and compiling them down to ES5 code

// Setting up Babel:
// 1. Install Babel itself
// 2. Install env preset
// 3. Install react preset
// Run to install babel cli globally: sudo npm install -g babel-cli
// babel --help
// Run to create package.json file: npm init -y
// Now install the 2 babel dependencies: 
// npm install babel-preset-env
// npm install babel-preset-react

// Using Babel:
// Babel will watch the app.js file in src folder for changes. If there's a change, it will convert the code to ES5 code and stores it in Javascript app.js file in the public/scripts directory
// Run: babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// Include the --watch flag to the command above to watch for changes in the app.js file in src folder
// You can see the changes render in the browser automatically when you have babel and live server running in the background

// To install the node_modules folder to have access to the dependcies:
// Run: npm install