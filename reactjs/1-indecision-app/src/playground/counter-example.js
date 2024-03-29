// ********************************************
// COUNTER APP USING REACT COMPONENT AND STATE
// ********************************************

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


// *********************
// COUNTER APP USING JSX
// *********************
// command line to run:
// babel src/playground/counter-example.js --out-file=public/scripts/app.js --presets=env,react --watch

// let count = 0
// const addOne = () => {
//     count++
//     renderCounterApp()
// }
// const minusOne = () => {
//     count--
//     renderCounterApp()
// }
// const reset = () => {
//     count = 0
//     renderCounterApp()
// }

// const appRoot = document.querySelector('#app')

// const renderCounterApp = () => {
//     const templateThree = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne} className="button">+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>Reset</button>
//         </div>
//     )
//     ReactDOM.render(templateThree, appRoot)
// }
// renderCounterApp()

