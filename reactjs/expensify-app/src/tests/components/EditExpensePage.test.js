import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpenseSpy, startRemoveExpenseSpy, historySpy, wrapper;

// beforeEach() is a lifecyle method that returns a function
// It's a way to reuse these throughout the test cases
beforeEach(() => {
    startEditExpenseSpy = jest.fn();
    startRemoveExpenseSpy = jest.fn();
    historySpy = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            startEditExpense={startEditExpenseSpy}
            startRemoveExpense={startRemoveExpenseSpy}
            history={historySpy}
            expense={expenses[1]}
        />
    );
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith({
        id: expenses[1].id
    });
});
