import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
    const total = selectExpensesTotal([])
    expect(total).toBe(0)
})

test('should correctly add up a single expense', () => {
    const total = selectExpensesTotal([expenses[1]])
    expect(total).toBe(500)
})

test('should correctly add up multiple expenses', () => {
    const total = selectExpensesTotal(expenses)
    expect(total).toBe(800)
})