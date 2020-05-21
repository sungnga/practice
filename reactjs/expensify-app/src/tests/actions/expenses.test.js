import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addExpense,
    startAddExpense,
    editExpense,
    startEditExpense,
    removeExpense,
    startRemoveExpense,
    setExpenses,
    startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

// beforeEach() is a lifecyle method
// Write/set some data to Firebase
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        // Set an object (with unique id) in the db with these properties
        expensesData[id] = { description, note, amount, createdAt };
    });
    // Set expensesData object to expenses database
    // done() doesn't allow the test case to run until Firebase has synced up the data
    database
        .ref(`users/${uid}/expenses`)
        .set(expensesData)
        .then(() => done());
});

// Test remove expense
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

// Async action
test('should remove expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        // To get all the actions
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        // fetch the data and assert that it actually was deleted
        // this returns a promise
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

// Test edit expense
// Setup test case
// Call editExpense {note: 'New note value'}
// Make an assertion
test('should setup edit expense action object', () => {
    const action = editExpense('456abc', { note: 'New note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '456abc',
        updates: {
            note: 'New note',
        },
    });
});

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const updates = {
        description: 'Spaceship',
        amount: 3444443,
        note: 'Visiting Mars'
    }
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        // If this is valid, it means the action was dispatched correctly
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
        // Check to make sure data is changed on firebase
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    })
})

// Add expense test cases
// A test case that makes sure if we pass values in, those values get used
test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 2000,
        note: 'This one is better',
        createdAt: 2000
    };

    store
        .dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                },
            });

            // Return a promise. Only when this promise is resolved will the code inside the .then() run
            return database
                .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store
        .dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                },
            });

            // Return a promise. Only when this promise is resolved will the code inside the .then() run
            return database
                .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
});

// Not async
test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
