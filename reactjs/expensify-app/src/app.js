import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore();
//console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.querySelector('#app'))




// ===========================
// NOTES
// ===========================

// REACT-ROUTER 101
// Source: https://reacttraining.com/react-router/
//
// Install the react-router for web: npm install react-router-dom
// Import into app.js file and destructure items we want to use: 
// import { BrowserRouter, Route } from 'react-router-dom'
// To create the router configuration:
//  - Only use a single instance of BrowserRouter
//  - Inside the BrowserRouter, set up as many instances of Route as pages we have
//  - The Route takes two main props: path and component
//  - Path: the URL to use for this route
//  - Component: when that URL matches, what to show to the screen. We can reference a component we want to show
//  - The first/root route needs a 3rd prop to match the exact path: exact={true}
//     const routes = (
//         <BrowserRouter>
//             <div>
//                 <Route path="/" component={ExpenseDashboardPage} exact={true} />
//                 <Route path="/create" component={AddExpensePage} />
//                 <Route path="/edit" component={EditExpensePage} />
//                 <Route path="/help" component={HelpPage} />
//             </div>
//         </BrowserRouter>
//     )
// The server is not well equipped to handle client-side routing, because it's not sending back the html page when a request like '/help' is made. It will send back a 404 not found page
// To fix this, need to configure the dev server in the webpack.config.js file, telling the dev server to always serve up the index.html file for all 404 routes: historyApiFallback: true

// Setting up a 404 page:
//  - Import Switch from react-router-dom: 
//  - import { Switch } from 'react-router-dom'
//  - Switch will go through each Route one by one to see if the path matches with the requested path
//  - If Switch finds a matched path, it will stop looking
//  - The last Route inside Switch is a 404 not found component. This component gets rendered if the path does not match
//     <BrowserRouter>
//         <Switch>
//             <Route path="/" component={ExpenseDashboardPage} exact={true} />
//             <Route path="/create" component={AddExpensePage} />
//             <Route path="/edit" component={EditExpensePage} />
//             <Route path="/help" component={HelpPage} />
//             <Route component={NotFoundPage} />
//         </Switch>
//     </BrowserRouter>

// Linking between routes: Link and NavLink
//  - Import Link and NavLink from react-router-dom: 
//  - import { Link, NavLink } from 'react-router-dom'
//  - Use Link when we want to change or switch between pages/routes
//  - Link and NavLink have a "to" attribute to specify the path of the link route
//  - <Link to="/">Go home</Link>
//  - The nice thing about Link is that we're using client-side routing as oppose to server-side routing
//  - This means that it's not going through the full page refresh. Intead, Javascript just swaps things out on the fly. It makes a new call to ReactDOM.render() to render the new page
//  - Use Link whenever we want to take advantage of client-side routing instead of using an anhcor tag
//  - Use NavLink for navigation. This way, we can call out that specific link that we're on
//  - <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>

// Query Strings and URL Parameters:
// When React-router finds a path that matches, it renders an instance of that component
// Not only is it rendering the instance of the component, it's also passing a few props down
// So anytime we're a component inside a Route, we have access to some special information which are useful to build our application
// These props are: history, location, and match. And these props are objects
// If a user passes additional URL parameters or query string, we can access them via component props
// We can capture the dynamic URL id that comes after the '/' and grab its value with the ':id' syntax: path="/edit/:id"
// To view the value of that id: props.match.params.id

// REDUX

// WHY WE USE REDUX
// - Resource: redux.js.org
// - Components state and Redux are 2 tools both aim to solve the same problem, which is to manage the state for an application
// - State is data that changes, which means that we need a way to actually change the data for component. It was this.setState() and we need a way to get the data out of that state container
// - We need a way to render it to the screen and for components, we just use this.state.keyName to get the value
// - So component state is tracking changing data
// - Now in complex applications, there's no clear parent component where we can store that state. When we have separate component trees, there's no way to communicate between components
// - The other problem is that when we use components state, our components end up communicating a lot
// - This isn't inheritly bad, but when we do do it a lot, we create components that are not very reusable. Because they need so many things from the parents which means they can't just be dropped anywhere because the parent might not have the things they need
// The solution to this problem is with Redux
// - Each component can define two things: what data it needs and what data it needs to be able to change
// - Redux is a state container, which is exactly what our class-based components are
// - We create a redux store and it's just an object like this.state was an object inside our components
// - With Redux Store, we're able to read data off of the store and change the data in the store
// - The nice thing is that the individiual components they're going to be able to determine how they want to do those things
// - Now the other components inside the app they're also going to need to be able to work with the store in one way or another, either reading or writing data
// - This way the components aren't communicating between each other so much as the individual components are communicating with the store
// - This creates components that are very reusable

// Setting up Redux:
// - Run: npm install redux
// - Import a single named export, it's a function called createStore. We're gonna destructure it off of the Redux library
// - import { createStore } from 'redux'
// - createStore() is something that is called once to create the store. Once we have the store in place we don't need to call it again

// To create a Store:
//    const store = createStore((state = { count: 0 }) => {
//        return state
//    })
// The createStore function expects a function as the first argument
// The 1st argument to the function that we passed to createStore is the current state: state = current state
// We can set the default state (as object) in the argument as well: {count: 0}
// When invoking createStore(), this function passed in gets called once right away and the default state is used
// We can fetch the current state object back using the .getState() method on the store

// The .getState() method returns the current state object
// store.getState()

// ACTIONS
// - Actions are our way of communicating with the store
// - We can change the Redux store values using actions
// - An action is nothing more than an object that gets sents to the store
// - And this object describes the type of action we'd like to take
// - Example of actions could be: increment, decrement, reset, etc
// - This is going to allow us to change the store over time by dispatching various actions
// - The method use to send/dispatch an action object to the store is: store.dispatch()

// To define an action object:
// - Define an object: with curly braces
// - Define the action type property and set the value as the name of action
// - Write the action type name all in caps and separatewords with underscore. This is by convention
//    {
//        type: 'INCREMENT'
//    }

// To dispatch an action object to the store:
// The .dispatch() method sends an action object to the store
//    store.dispatch({
//        type: 'INCREMENT'
//    })

// To use the action inside the store:
//  - The createStore function expects a function to be the 1st arg
//  - This function gets called everytime a .dispatch() is made to the store
//  - Based on the action type, we can make meaningful changes to the state
//  - 1st arg: the current state. With default state value
//  - 2nd arg: the action type that gets passed in
//     const store = createStore((state = { count: 0 }, action) => {
//         // To handle the dispatch action, we're using a switch statement
//         // We're switching what we do based off of a particular value. In this case, it's the action data type value
//         // Inside the curly braces we can define the various cases we want to handle. In our case, we want to handle the action type
//         switch (action.type) {
//             // Case when action.type is equal to 'INCREMENT'
//             // After the colon, we provide what we want to do
//             // Return the updated state object
//             case 'INCREMENT':
//                 return {
//                     count: state.count + 1
//                 }
//             // Case when action.type is equal to 'DECREMENT'
//             case 'DECREMENT':
//                 return {
//                     count: state.count - 1
//                 }
//             case 'RESET':
//                 return {
//                     count: 0
//                 };
//             // Setup the default case, when the other cases don't run
//             // Return the current state
//             default: 
//                 return state
//         }
//     })
//     store.dispatch({
//         type: 'DECREMENT'
//     })
//     console.log(store.getState())

// Action generators:
//  - Action generators are functions that return action objects
//  - We can destructure the properties and set default values in the function argument
//  - The function takes in the action property value passed by the user when this function was invoked in store.dispatch()
//  - Destructure the incrementBy property and set the default value to 1
//  - If the user provides a value for incrementBy property, we'll use that value. Else we'll increment by 1 by default
//  - It returns the updated action object with action type and incrementBy properties
//    // Action generator
//    const incrementCount = ({incrementBy = 1} = {}) => ({
//        type: 'INCREMENT',
//        incrementBy
//    })
//    // Create a store
//    const store = createStore((state = { count: 0 }, action) => {
//        switch (action.type) {
//            case 'INCREMENT':
//                return {
//                    count: state.count + action.incrementBy
//                }
//        }
//    })
//
//    // Calling the action generator in in the dispatch method
//    // No action property is passed in, so action generator will use the ////default value
//    store.dispatch(incrementCount())
//    // Action property is provided
//    store.dispatch(incrementCount({incrementBy: 5}))

// REDUCERS
// 1. Reducers are pure functions
//  - the output is only determined by the input. What it returns, it is only determined by the things that get passed in
//  - it doesn't use anything else from outside of the function scope and it doesn't change anything outside of the function scope either
//  - we don't want to change variables outside of the reducer's scope
//  - and we don't want to rely on values from variables outise of the reducer's scope
//  - we just want to use the input the state and the action to return the new state value
// 2. Never change state or action
//  - mutating the state directly is going to have undesired effects

//    // A reducer function
//    const countReducer = (state = { count: 0 }, action) => {
//        switch (action.type) {
//            case 'INCREMENT':
//                return {
//                    count: state.count + action.incrementBy
//                }
//            case 'DECREMENT':
//                return {
//                    count: state.count - action.decrementBy
//                }
//            case 'RESET':
//                return {
//                    count: 0
//                };
//            case 'SET':
//                return {
//                    count: action.count
//                }
//            default: 
//                return state
//        }
//    }
   
//    // Passing in the reducer to create store
//    const store = createStore(countReducer)

// CombineReducers:
// Instead of passing in just one reducer to createStore(), we can pass in multiple reducers using the combineReducers() method
// The combineReducers function will return an object
// The object returned by the combineReducers is how we want our Redux store to look like, which is an object with expenses and filters properties
// The expensesReducer array will be the value on the expenses property
// The filtersReducer object will be the value on the filters property
// The expenses property is managed by the expensesReducer
// The filters property is managed by the filtersReducer
//    const store = createStore(
//        combineReducers({
//            expenses: expensesReducer,
//            filters: filtersReducer
//        })
//    );

// REACT-REDUX LIBRARY
// - How do we get access to the store information from the React components?
// - We don't want to pass a ton of props to components. They would not be reusable
// - Install the react-redux library: npm i react-redux
// - We get a Provider component and a connect function from this library
// - We use the Provider component once at the root of the application
// - We use the connect function for every single component that needs to connect to the Redux store

// THE PROVIDER COMPONENT: CONNECT THE STORE
// Provider is going to allow us to provide the store to all of the components that make up our application
// This is a super useful feature. It means that we do not need to manually pass the store around
// Instead, individual components that want to access the store can just access it

// To use the Provider:
//  - Import to the file: import { Provider } from 'react-redux'
//  - Setup the Provider with the Provider tag: <Provider></Provider>
//  - There's a single prop that we have to pass in to provider, which is the store
//  - This is the store that we're trying to share with the rest of the application
//  - The prop name is store and we have to set it to the Redux store: <Provider store={store}></Provider>
//  - Inside the Provider tag, we want to render the instance of <AppRouter> component
//  - Now we have an application where all of the components do have access to the store
//    const jsx = (
//        <Provider store={store}>
//            <AppRouter />
//        </Provider>
//    );
//    ReactDOM.render(jsx, document.querySelector('#app'))

// THE CONNECT FUNCTION: CONNECT THE COMPONENTS
// Create a regular component: usually a stateless functional component
// Now we need to create a higher order component
// We need to pass in a regular component to the connect function
// Inside the connect function, this is where we provide the information about what we want to connect
// There's a ton of info in the store, we just need a subset of it
// So the argument we provide to connect() is we define a function. This function lets us determine what info from the store we want our component to be able to access
// The store state actually gets passed in as 1st arg to this function
// From this function, we return an object with key/value pair as props we want to access
// The end result from connect is a HOC, a connected version of the regular component with the props from the store

// import {connect} from 'react-redux'
// // A stateless functional component
// const ExpenseList = (props) => (
//     <div>
//         <h1>Expense List</h1>
//         {props.filters.text}
//         {props.expenses.length}
//     </div>
// )
// // A function that maps state to props
// const mapStateToProps = (state) => {
//     return {
//         expenses: state.expenses,
//         filters: state.filters
//     }
// }
// // Export the HOC
// export default connect(mapStateToProps)(ExpenseList);
//
// LONG VERSION:
// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     }
// })(ExpenseList);
// export default ConnectedExpenseList;
 
// Steps for using the Provider and the connect:
// 1. Setup Provider inside the root of the application
//  - The Provider tag is inside a JSX
//  - This lets us define the store that we want to provide to all of our components 
// 2. Create new higher order components using the connect function provided from React-Redux 
//  - We define a function to define the things that we want to get off of the store. Pass this function to the connect() funct
//  - Then we define the component that we want to create the connected version of
// The end result is a brand new component which is just our component with the props from the store
// This is going to allow us to create simple components and scale our app without worrying about putting all the glue into our code
// The component is rendered as is, without anything get passed down. All of this is handled via the connect


// DATE PICKER
// Source: momentjs.com
// airbnb react-dates datepicker library: http://airbnb.io/react-dates
// Install: npm i moment
// Install: npm i react-dates
// When it comes to working date, don't use the built-in Date object
// Moment library is the way to go when working with dates and time
// React-dates is a datepicker tool that works with moment()

// Working with Moment:
// Import to the file: import moment from 'moment'
// To create a moment, just call the moment function: const now = moment()
// To format the date moment: now.format('MMM Do, YYYY') 
// Refer to the documentation for formatting dates

// Working with airbnb react-dates:
// Import 3 things to the file: 
// import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
// import 'react-dates/initialize';
// Refer to the doc for different types of datepickers