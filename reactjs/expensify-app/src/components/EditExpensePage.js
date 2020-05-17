import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense)
        this.props.history.push('/')
    };
    onRemove = () => {
        this.props.removeExpense({id: this.props.expense.id})
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button
                    onClick={this.onRemove}
                >
                    Remove
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);



// ===============
// NOTES
// ===============

// STEPS:
// 1. Connect this component to the Redux store
//  - import {connect} from 'react-redux'
//  - setup connect: export default connect()(EditExpensePage);
// 2. Search the expenses array for the expense with an ID that matches this one
//  - setup the mapStateToProps function
//  - we want to be able to give the component the current EXPENSE OBJECT
//  - we can access the state which is great because that's where the expenses array lives and we're going to search it
//  - now we're searching the expenses array for an expense whose ID matches the props.match.params.id
//  - how do we access the props? We have access to the props via the 2nd argument
//  - use find() method on the expenses array to find an expense the matching ID
//  - this function returns the matched expense object
// 3. Render expense form in the EditExpensePage
//  - import ExpenseForm from './ExpenseForm'
//  - pass down the expense prop
//  - NOTE: in the ExpenseForm, check condition in state if the expense already exists. Set the properties w/ those values if it does
//  - pass down the onSubmit prop
//  - now the expense form should populate the expense data
// 4. Edit the expense info and handle onSubmit
//  - Dispatch the action to edit the expense
//  - then redirect to the dashboard page

