import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const ExpenseDashboardPage = () => (
    <div>
        This is from my dashboard component
    </div>
)

const AddExpensePage = () => (
    <div>
        This is from my add expense component
    </div>
)

const EditExpensePage = () => (
    <div>
        This is from my edit expense component
    </div>
)

const HelpPage = () => (
    <div>
        This is from my help page component
    </div>
)

const NotFoundPage = () => (
    <div>
        404!
    </div>
)

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(routes, document.querySelector('#app'))


// ===========================
// NOTES
// ===========================

// REACT-ROUTER 101
// Source: https://reacttraining.com/react-router/
//
// Install the react-router for web: npm install react-router-dom
// Import into app.js file and destructure items we want to use: import {BrowserRouter, Route} from 'react-router-dom'
// To create the router configuration:
//  - Only use a single instance of BrowserRouter
//  - Inside the BrowserRouter, set up as many instances of Route as pages we have
//  - The Route takes two main props: path and component
//  - Path: the URL to use for this route
//  - Component: when that URL matches, what to show to the screen. We can reference a component we want to show
//  - The first/root route needs a 3rd prop to match the exact path: exact={true}
    // const routes = (
    //     <BrowserRouter>
    //         <div>
    //             <Route path="/" component={ExpenseDashboardPage} exact={true} />
    //             <Route path="/create" component={AddExpensePage} />
    //             <Route path="/edit" component={EditExpensePage} />
    //             <Route path="/help" component={HelpPage} />
    //         </div>
    //     </BrowserRouter>
    // )
// The server is not well equipped to handle client-side routing, because it's not sending back the html page when a request like '/help' is made. It will send back a 404 not found page
// To fix this, need to configure the dev server in the webpack.config.js file, telling the dev server to always serve up the index.html file for all 404 routes: historyApiFallback: true

// Setting up a 404 page:
//  - Import the Switch instance from react-router-dom: import {BrowserRouter, Route, Switch } from 'react-router-dom'
//  - Switch will go through each Route one by one to see if the path matches with the requested path
//  - If Switch finds a matched path, it will stop looking
//  - The last Route inside Switch is a 404 not found component. This component gets rendered if the path does not match
    // <BrowserRouter>
    //     <Switch>
    //         <Route path="/" component={ExpenseDashboardPage} exact={true} />
    //         <Route path="/create" component={AddExpensePage} />
    //         <Route path="/edit" component={EditExpensePage} />
    //         <Route path="/help" component={HelpPage} />
    //         <Route component={NotFoundPage} />
    //     </Switch>
    // </BrowserRouter>