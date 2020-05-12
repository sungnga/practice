import {createStore} from 'redux'

// Make a store
// The createStore function expects a function to be the 1st arg
// When invoking createStore(), this function passed in gets called once right away and sets the default state
// The 1st arg to the function that we passed to createStore is the current state: state = current state
// We can set the default state (as object) in the argument as well: {count: 0}
const store = createStore((state = { count: 0 }) => {
    return state
})

// .getState() method returns the current state object
console.log(store.getState())