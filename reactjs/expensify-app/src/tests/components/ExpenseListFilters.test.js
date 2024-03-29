import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setStartDate, setEndDate, sortByDate, sortByAmount, setTextFilter, wrapper;

beforeEach(() => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setTextFilter = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters,
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'subscriptions';
    wrapper.find('input').simulate('change', {
        target: { value },
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
        filters: altFilters,
    });
    wrapper.find('select').simulate('change', {
        target: { value },
    });
    expect(sortByDate).toHaveBeenLastCalledWith();
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value },
    });
    expect(sortByAmount).toHaveBeenLastCalledWith();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(3, 'months')
    const endDate = moment(0).add(5, 'months')
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate'
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toEqual(calendarFocused)
})