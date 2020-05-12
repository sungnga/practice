import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
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

const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
        </div>
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