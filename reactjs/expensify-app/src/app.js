import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

ReactDOM.render(<AppRouter />, document.querySelector('#app'))


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
// const store = createStore((state = { count: 0 }) => {
//     return state
// })
// The createStore function expects a function as the first argument
// The 1st argument to the function that we passed to createStore is the current state: state = current state
// We can set the default state (as object) in the argument as well: {count: 0}
// When invoking createStore(), this function passed in gets called once right away and the default state is used
// We can fetch the current state object back using the .getState() method on the store
// The .getState() method returns the current state object
// store.getState()
