import React, { Component } from 'react';
import ShoppingListForm from './ShoppingListForm'
import { v4 as uuidv4 } from 'uuid';

class ShoppingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { name: 'milk', qty: '2 gallons', id: uuidv4() },
                { name: 'Bread', qty: '2 loaves', id: uuidv4() }
            ]
        }
        this.addItem = this.addItem.bind(this)
    }
    // A function that adds a new item to the current state
    // Add an id property to the new item
    // Use the spread operator to spread the existing propertie, then add the id property to it
    // When you add the new item to the shopping list, it will have an ID
    addItem(item) {
        let newItem = {...item, id: uuidv4()}
        this.setState(state => ({
            items: [...state.items, newItem]
        }))
    }
    renderItems() {
        return (
            <ul>
                {this.state.items.map(item => (
                    <li key={item.id}>
                        {item.name}:{item.qty}
                    </li>
                ))}
            </ul>
        )
    }
    render() {
        return (
            <div>
                <h1>Shopping List</h1>
                {this.renderItems()}
                <ShoppingListForm addItem={this.addItem} />
            </div>
        );
    }
}

export default ShoppingList;