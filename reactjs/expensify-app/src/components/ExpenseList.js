import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// A stateless functional component
export const ExpenseList = (props) => {
    //console.log(props)
    return (
        <div className='content-container'>
            <div className='list-header'>
                <div className='show-for-mobile'>Expenses</div>
                <div className='show-for-desktop'>Expense</div>
                <div className='show-for-desktop'>Amount</div>
            </div>
            <div className="list-body">
                {props.expenses.length === 0 ? (
                    <div className='list-item list-item--message'>
                        <span>No expenses</span>
                    </div>
                ) : (
                    props.expenses.map((expense) => {
                        return (
                            <ExpenseListItem key={expense.id} {...expense} />
                        );
                    })
                )}
            </div>
        </div>
    );
};

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
        expenses: selectExpenses(state.expenses, state.filters),
    };
};

export default connect(mapStateToProps)(ExpenseList);

// LONG VERSION:
// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     }
// })(ExpenseList);
// export default ConnectedExpenseList;
