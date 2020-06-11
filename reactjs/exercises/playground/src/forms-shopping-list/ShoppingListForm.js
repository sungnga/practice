import React, { Component } from 'react';

class ShoppingListForm extends Component {
    constructor(props) {
        super(props)
        this.state = { name: "", qty: "" }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // Send the current state(shopping item) back to the parent component to update the parent's state(shopping list)
    handleSubmit(evt) {
        // To prevent the page to refesh by default
        evt.preventDefault()
        // Call the parent method and pass in the current state
        this.props.addItem(this.state)
        // Clear out the form after submit
        this.setState({name: "", qty: ""})

    }
    // The state and the form input are in sync
    // When there's a change in form, the state will be updated with the change
    // NOTE: This function has nothing to do with the parent component. This is the child component managing its own state
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <label htmlFor="qty">Quantity: </label>
                <input
                    name="qty"
                    id="qty"
                    value={this.state.qty}
                    onChange={this.handleChange}
                />
                <button>Add Item!</button>
            </form>
        );
    }
}

export default ShoppingListForm;