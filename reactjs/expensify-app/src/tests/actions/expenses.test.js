import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

// Test remove expense
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

// Test edit expense
// Setup test case
// Call editExpense {note: 'New note value'}
// Make an assertion
test('should setup edit expense action object', () => {
    const action = editExpense('456abc', { note: 'New note' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '456abc',
        updates: {
            note: 'New note'
        }
    })
})

// Add expense test cases
// A test case that makes sure if we pass values in, those values get used
test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

// A test case that makes sure the default values actually get set up correctly when nothing is passed in
// Call addExpense with no date
// Assert the value of the return object
test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})