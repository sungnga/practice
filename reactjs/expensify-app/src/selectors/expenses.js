import moment from 'moment';

// USING FILTERS AND EXPENSES TOGETHER:
// Get visible expenses
// A function that filters and sorts expenses
// This function takes in expenses and filters (destructured here) as arguments
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            // Sort by most recent
            // unix epoch date: midnight 1/1/1970
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            // Sort by highest to lowest
            return a.amount < b.amount ? 1 : -1;
        }
    });
};