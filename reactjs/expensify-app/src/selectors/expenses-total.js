// 1st test
// export default () => {

// }

// 2nd test if there's no expenses
// export default (expenses) => {
//     if (expenses.length === 0) {
//         return 0;
//     }
// }

// 3rd test: if there are expenses
// export default (expenses) => {
//     if (expenses.length === 0) {
//         return 0;
//     } else {
//         return expenses
//             .map((expense) => expense.amount)
//             .reduce((sum, value) => sum + value, 0);
//     }
// };

// 4th test: will all the test cases pass with this code?
export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => sum + value, 0);
};