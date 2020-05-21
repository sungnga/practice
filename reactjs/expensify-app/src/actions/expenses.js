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
// Dispatch action
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense,
});

// To get the uid... we need to access the current state using getState
// When using thunk actions, async actions, we also have access to getState method
// We can call getState() to get the current state
// 2nd arg: getState
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        // Destructure
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0,
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database
            .ref(`users/${uid}/expenses`)
            .push(expense)
            .then((ref) => {
                dispatch(addExpense({
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

// 1. Create startRemoveExpense (same call signature as removeExpense)
// 2. Test startRemoveExpense with "should remove expenses from firebase"
// 3. Use startRemoveExpense in EditExpensePage instead of removeExpense
// 4. Adjust EditExpensePage tests
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpense({ id }));
            });
    };
};

// EDIT_EXPENSE
// Dispatch action
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});

// 1. Create startEditExpense (same call signature as editExpense)
// 2. Test startEditExpense with "should edit expenses from firebase"
// 3. Use startEditExpense in EditExpensePage instead of editExpense
// 4. Adjust EditExpensePage tests
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editExpense(id, updates));
            });
    };
};

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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        // returns a promise
        return (
            database
                .ref(`users/${uid}/expenses`)
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
                })
        );
    };
};
