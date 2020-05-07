let visibility = false

const toggle = () => {
    visibility = !visibility
    render()
}

const render = () => {
    const visible = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={toggle}>{visibility ? 'Hide details' : 'Show details'}</button>
            {visibility && <p>The devil is in the detail</p>}
        </div>
    )

    ReactDOM.render(visible, document.querySelector('#app'))
}
render()