import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

// const date = new Date();
// const now = moment();
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        // NOTE: the expense prop gets passed down to the child component when the ExpenseForm instance was defined in the EditExpensePage parent component
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense
                ? (props.expense.amount / 100).toString()
                : '',
            createdAt: props.expense
                ? moment(props.expense.createdAt)
                : moment(),
            calendarFocused: false,
            error: '',
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        // If there is a date provided, then set the date value
        // Else, do nothing
        // This prevents the user from clearing the date value
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            // Set error state to equal to 'Please provide description and amount'
            this.setState(() => ({
                error: 'Please provide description and amount',
            }));
        } else {
            // Clear the error
            this.setState(() => ({ error: '' }));
            // onSubmit prop gets passed down to the child component when ExpenseForm instance was defined in AddExpensePage and EditExpensePage parent components
            // Here we define what we want to submit. We submit an object
            this.props.onSubmit({
                description: this.state.description,
                // Convert the string amt to number
                // parseFloat keeps decimal in place
                // 10, because we're working in base 10
                // Multiply by 100 to get dollar amt instead of cents
                amount: parseFloat(this.state.amount, 10) * 100,
                // Currently, createAt is a Moment object
                // There's a Moment method we can use to get the timestamp back: .valueOf()
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
            });
        }
    };
    render() {
        return (
            <form className='form' onSubmit={this.onSubmit}>
                {this.state.error && (
                    <p className='form__error'>{this.state.error}</p>
                )}
                <input
                    type='text'
                    placeholder='Description'
                    autoFocus
                    className='text-input'
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    className='text-input'
                    type='number'
                    placeholder='Amount'
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    block
                />
                <textarea
                    className='textarea'
                    placeholder='Add a note to your expense(optional)'
                    value={this.state.note}
                    onChange={this.onNoteChange}
                ></textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        );
    }
}
