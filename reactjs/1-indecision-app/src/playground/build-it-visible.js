// ***************************************************
// Visibility Toggle using React Component and State
// ***************************************************
// VisibilityToggle - render, constructor, handleToggleVisibility
// visibility -> false

class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props)
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this)
        this.state = {
            visibility: false
        }
    }

    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        })
    }
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>{this.state.visibility ? 'Hide details' : 'Show details'}</button>
                {this.state.visibility && <p>Devil is in the details</p>}
            </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle />, document.querySelector('#app'))

// **************************
// Visibility Toggle using JSX
// **************************

// let visibility = false

// const toggle = () => {
//     visibility = !visibility
//     render()
// }

// const render = () => {
//     const visible = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={toggle}>{visibility ? 'Hide details' : 'Show details'}</button>
//             {visibility && <p>The devil is in the detail</p>}
//         </div>
//     )

//     ReactDOM.render(visible, document.querySelector('#app'))
// }
// render()


// command line to run:
// babel src/playground/build-it-visible.js --out-file=public/scripts/app.js --presets=env,react --watch