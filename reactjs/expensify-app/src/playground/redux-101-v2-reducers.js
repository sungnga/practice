import {createStore} from 'redux'

// Action generators are functions that return action objects
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({count}) => ({
    type: 'SET',
    count
})

// Reducers
// 1. Reducers are pure functions
//  - the output is only determined by the input. What it returns, it is only determined by the things that get passed in
//  - it doesn't use anything else from outside of the function scope and it doesn't change anything outside of the function scope either
//  - we don't want to change variables outside of the reducer's scope
//  - and we don't want to rely on values from variables outise of the reducer's scope
//  - we just want to use the input the state and the action to return the new state value
// 2. Never change state or action
//  - mutating the state directly is going to have undesired effects

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            }
        default: 
            return state
    }
}
    

// Make a store
const store = createStore(countReducer)

store.dispatch(incrementCount())

store.dispatch(incrementCount({incrementBy: 5}))

store.dispatch(resetCount())

store.dispatch(decrementCount({decrementBy: 10}))

store.dispatch(decrementCount())

store.dispatch(setCount({count: 400}))