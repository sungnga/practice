// Create a parent component where all other components will be nested in
// Since a component renders JSX, it can render other components
// This allows us to nest components inside another by referencing it
// COMPONENT PROPS: 
//  - Component props allows components to comnunicate with one another
//  - To do that, we pass data in when we initialize/define the instance of a component. for example: <Header />
//  - That data is known as props
//  - Setting up component props is similar to setting up html attributes
//  - Setting key/value pair: <Header title="Test value" />
//  - To display the props, go to the Component and use this.props.keyName inside the JSX: <h1>{this.props.title}</h1>
class IndecisionApp extends React.Component {
    render() {
        const title = 'Indecision'
        const subtitle = 'Put your life in the hands of a computer'
        const options = ['thing one', 'thing two', 'thing three']

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action />
                <Options options={options} />
                <AddOption />
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
    // Create a new method specific to this class
    handlePick() {
        alert('handlePick')
    }
    render() {
        // Add the paren () to return longer JSX
        // Can have as many elements as you want INSIDE A ROOT ELEMENT
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
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
    constructor(props) {
        // If we don't call super(this), we won't have access to this.props
        super(props)
        // To add on additional behaviors in this class, define it here
        // The goal here is to bind handleRemoveAll() method
        // Set the method to itself, with a slight modification: set bind to 'this'
        this.handleRemoveAll = this.handleRemoveAll.bind(this)
    }
    handleRemoveAll() {
        alert('All gone')
    }
    render() {
        return (
            <div>
                <button onClick={this.handleRemoveAll}>Remove All</button>
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
    handleAddOption(e) {
        e.preventDefault()

        const option = e.target.elements.option.value.trim()

        if (option) {
            alert(option)
            e.target.elements.option.value = ''
        }
    }
    render() {
        return (
            <div>
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
