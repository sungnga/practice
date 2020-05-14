import React from 'react';
import {connect} from 'react-redux'

// A stateless functional component
const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.filters.text}
        {props.expenses.length}
    </div>
)

// Create a HOC
// We need to pass in a regular component to the connect function
// Inside the connect function, this is where we provide the information about what we want to connect
// There's a ton of info in the store, we just need a subset of it
// So the argument we provide to connect() is we define a function. This function lets us determine what info from the store we want our component to be able to access
// The store state actually gets passed in as 1st arg
// From this function, we return an object with key/value pair as props
// ConnectedExpenseList is the HOC of the ExpenseList component
// We export the HOC 

// STANDARD VERSION:
// A function that maps state to props
const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseList);

// LONG VERSION:
// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     }
// })(ExpenseList);
// export default ConnectedExpenseList;