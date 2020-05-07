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
    render() {
        // Add the paren () to return longer JSX
        // Can have as many elements as you want INSIDE A ROOT ELEMENT
        return (
            <div>
                <button>What should I do?</button>
            </div>
        )
    }
}

// this.props.options is the props data that was defined when the instance of Options component was initialized: <Options options={options} />
// In this case, options is an array of items
// .map() over this options array to get the individual items
// Then pass each item to the instance of Option component as a props data when it's initialize here. <Option key={option} optionText={option} />)
class Options extends React.Component {
    render() {
        return (
            <div>
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
    render() {
        return (
            <div>
                AddOption component here
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
