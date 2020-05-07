// Create a parent component where all other components will be nested in
// Since a component renders JSX, it can render other components
// This allows us to nest components inside another by referencing it
class IndecisionApp extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Action />
                <Options />
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
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Indecision</h1>
                <h2>Put your life in the hands of a computer</h2>
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

class Options extends React.Component {
    render() {
        return (
            <div>
                Options component here
                <Option />
                <Option />
            </div>
        )
    }
}

// This component is nest inside the Options component
class Option extends React.Component {
    render() {
        return (
            <div>
                Option component here
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
ReactDOM.render(<IndecisionApp />, document.querySelector('#app'))
