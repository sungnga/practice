import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

// Converting a functional component to class-base component
// Named export a regular component, not a HOC
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        // props.dispatch(addExpense(expense))
        this.props.startAddExpense(expense);
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className='page-header'>
                    <div className='content-container'>
                        <h1 className='page-header__title'>Add Expense</h1>
                    </div>
                </div>
                <div className='content-container'>
                    <ExpenseForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

// STATELESS FUNCTIONAL COMPONENT
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             onSubmit={(expense) => {
//                 // props.dispatch(addExpense(expense))
//                 props.onSubmit(expense)
//                 props.history.push('/')
//             }}
//         />
//     </div>
// );

// This function works very similar to mapStateToProps. It works with dispatch instead of state
// It has access to dispatch
// It returns an object
// Inside the object is where we defined various props
// Here we define addExpense props. What do we want to do when addExpense gets called?
// When addExpense is called, we want to dispatch the addExpense action with the expense passed in as an argument
const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense)),
});

// The 1st param passed in to connect is mapStateToProps. Set it to undefined
// 2nd param passed in to connect is mapDispatchToProps
export default connect(undefined, mapDispatchToProps)(AddExpensePage);

// =================
// NOTES
// =================

// The AddExpensePage component starts out as a regular component
//  - It renders the ExpenseForm instance (an expense form) to the page
// The AddExpensePage needs to be able to dispatch the given action to the Redux store
// To do this we need to connect the component to the store using connect()
//  - import {connect} from 'react-redux'
//  - pass the component to connect: export default connect()(AddExpensePage);
// Now we have access to props.dispatch()
//  - pass in the props to the component: const AddExpensePage = (props) => (..)
//  - to use the dispatch: props.dispatch()
// We have an action generator already, so we just need to import it
//  - we're using addExpense action to add an expense to the store
//  - import { addExpense } from '../actions/expenses'
//  - to dispatch the action: props.dispatch(addExpense(expense))
// To redirect to a different page after submit, use props.history.push('/')
