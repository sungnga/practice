import { createStore, combineReducers } from 'redux';
import {v4 as uuid} from 'uuid';

// ADD_EXPENSE
// Action generator
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

// REMOVE_EXPENSE
// Action generator
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// EXPENSES REDUCER
const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => action.id !== id)
        default:
            return state;
    }
}

// FILTER REDUCER
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// Store creation
// Instead of passing in just one reducer to createStore(), we can pass in multiple reducers using the combineReducers() method
// The combineReducers function will return an object
// The object returned by the combineReducers is how we want our Redux store to look like, which is an object with expenses and filters properties
// The expensesReducer array will be the value on the expenses property
// The filtersReducer object will be the value on the filters property
// The expenses property is managed by the expensesReducer
// The filters property is managed by the filtersReducer
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    // Get current state of the store
    console.log(store.getState())
})

const expenseOne = store.dispatch(addExpense({ description: 'SFRent', amount: 1700 }))
const expenseTwo = store.dispatch(addExpense({ description: 'lunch', amount: 800 }))

store.dispatch(removeExpense({id: expenseOne.expense.id}))

const demoState = {
    expenses: [{
        id: 'klsjdfsldkjsd',
        destription: 'January Rent',
        note: 'This was the final payment',
        amount: 55000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',   // date or amount
        startDate: undefined,
        endDate: undefined
    }
}