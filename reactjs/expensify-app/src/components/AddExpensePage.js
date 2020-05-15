import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses'

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={(expense) => {
                props.dispatch(addExpense(expense))
                props.history.push('/')
            }}
        />
    </div>
);

export default connect()(AddExpensePage);


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
