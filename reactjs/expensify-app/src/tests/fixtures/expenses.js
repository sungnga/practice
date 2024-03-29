import moment from 'moment';

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 200,
    createdAt: moment(0).valueOf()
}, {
    id: '2',
    description: 'Rent',
    note: 'Last month rent in SF',
    amount: 500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Cable bill',
    note: '',
    amount: 100,
    createdAt: moment(0).add(4, 'days').valueOf()
}];