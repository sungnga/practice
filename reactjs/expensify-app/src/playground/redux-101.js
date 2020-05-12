import {createStore} from 'redux'

// Make a store
// The createStore function expects a function to be the 1st arg
// This function gets called everytime a .dispatch() is made to the store
// Based on the action type, we can make meaningful changes to the state
// 1st arg: the current state. With default state value
// 2nd arg: the action type that gets passed in
const store = createStore((state = { count: 0 }, action) => {
    // To handle the dispatch action, we're using a switch statement
    // We're switching what we do based off of a particular value. In this case, it's the action data type value
    // Inside the curly braces we can define the various cases we want to handle. In our case, we want to handle the action type
    switch (action.type) {
        // Case when action.type is equal to 'INCREMENT'
        // After the colon, we provide what we want to do
        // Return the updated state object
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + incrementBy
            }
        // Case when action.type is equal to 'DECREMENT'
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
            return {
                count: state.count - decrementBy
            }
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            }
        // Setup the default case, when the other cases don't run
        // Return the current state
        default: 
            return state
    }
})


// Use store.subscribe() method to do something when the store changes
// The return value of subscribe is a function that we can call later
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})
// The .dispatch() method sends an action object to the store
store.dispatch(
    // Define an action type object
    {
        type: 'INCREMENT',
        incrementBy: 5
    }
)

// Unsubscribe to the state changes at this point
// unsubscribe()

store.dispatch({
    type: 'INCREMENT'
})

store.dispatch({
    type: 'RESET'
})

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10
})

store.dispatch({
    type: 'DECREMENT'
})

store.dispatch({
    type: 'SET',
    count: 101
})