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


// =============================
// NOTES
// =============================
// command line to run:
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

// WORKING WITH COMPONENT STATE
// 1. Initialize the state in constructor function
//  - The value of the state is an object
//  - In this object, define properties and its initial values. Can have as many properties as you like
//  - this.state = {count: 0}
// 2. Display the state by calling this.state.statePropertyName in JSX
//  - <h1>Counter: {this.state.count}</h1>
// 3. To change the state, call the .setState() method: this.setState(callback)
//  - Inside the callback function, you have access to the previous state in 'prevState' keyword. (prevState) => {}
//  - To access its properties: prevState.propertyName
//  - You can set a new value of a property in this callback
// 4. .setState() method will return the state object containing the updated properties and values

// PROPS VS. STATE
// Props:
// - an object
// - can be used when rendering
// - changes (from above) cause re-renders
// - comes from above
// - can't be changed by component itself
// State:
// - an object
// - can be used when rendering
// - changes cause re-renders
// - defined in component itself
// - can be changed by component itself
