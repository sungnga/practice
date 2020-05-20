import { v4 as uuid } from 'uuid';
import database from '../firebase/firebase';

// ACTION GENERATORS:
// Existing code
//  - component calls action generator
//  - action generator returns object
//  - component dispatches object
//  - redux store changes

// With Firebase and Redux
//  - components calls action generator
//  - action generator returns function
//  - component dispatches function
//  - function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense,
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        // Destructure
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0,
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database
            .ref('expenses')
            .push(expense)
            .then((ref) => {
                dispatch(
                    addExpense({
                        id: ref.key,
                        ...expense,
                    })
                );
            });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id,
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});

// SET_EXPENSES
// dispatch action
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses,
});

// Asynchronous action
// 1. Fetch all expense data once
// 2. Parse that data into an array
// 3. Dispatch SET_EXPENSES
export const startSetExpenses = () => {
    // returns a function
    return (dispatch) => {
        // returns a promise
        return database
            .ref('expenses')
            .once('value')
            // Once we get the data, parse the data into an expenses array, dispatch the setExpenses action with the expenses
            .then((snapshot) => {
                const expenses = [];

                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                    });
                });

                dispatch(setExpenses(expenses));
            });
    };
};
