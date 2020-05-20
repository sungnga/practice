import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
// import './playground/firebase-101'

const store = configureStore();
//console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.querySelector('#app'));
        hasRendered = true;
    }
}

ReactDOM.render(<p>Loading...</p>, document.querySelector('#app'));


// When user is logged in, redirect to the dashboard page and connect them to the expenses
// When user is logged out, redirect to the login page
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            // If history location starts out at root directory, redirect to dashboard
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        });

        console.log('log in')
    } else {
        renderApp();
        history.push('/');

        console.log('log out')
    }
})


// ------------------------------------
// CHALLENGES: FIREBASE AUTHENTICATION
// ------------------------------------

// GOAL: CREATE A LOGIN PAGE
// 1. Create LoginPage component with "Login" button
// 2. Add snapshot test for LoginPage
// 3. Show Login component at root of app -> /
// 4. Show ExpenseDashboardPage at -> /dashboard


// FIREBASE AUTHENTICATION
// On project dashboard, click the Authentication tab
// Select the Sign-in method tab and enable Google authentication

// SETUP AUTHENTICAION FUNCTIONALITY:
// Resource: firebase.google.com/docs/ -> reference tab -> firebase.auth
// In firebase.js file: create an instance of a Provider
// A Provider is a way to provide authentication. We will use a Google provider
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Export this googleAuthProvider as a named export
// Next we first need to check the authentication state of a user. In app.js file:
    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         console.log('log in')
    //     } else {
    //         console.log('log out')
    //     }
    // })
// Create a startLogin action:
// Pass in the googleAuthProvider to .signInWithPopup()
    // export const startLogin = () => {
    //     return () => {
    //         return firebase.auth().signInWithPopup(googleAuthProvider)
    //     }
    // }
// Dispatch the action in LoginPage.js file when a user clicks the Login button:
    // import { connect } from 'react-redux';
    // import { startLogin } from '../actions/auth';
    // export const LoginPage = ({startLogin}) => (
    //     <div>
    //         <button onClick={startLogin}>Login</button>
    //     </div>
    // )
    // const mapDispatchToProps = (dispatch) => ({
    //     startLogin: () => dispatch(startLogin())
    // })
    // export default connect(undefined, mapDispatchToProps)(LoginPage)

// A RECAP ON AUTHENTICATION SETUP:
// Create a LoginPage component and wire that up in Route
// Setup a provider (google) in firebase.js. This allows us to setup firebase to authenticate with google
// If we're using google auth provider, we also need to enable that over in the firebase dashboard
// Then we need to pass this provider into a function, into signInWithPopup()
// That is what triggers the popup, shows your google accounts, and allows you to pick one
// Over inside of app.js, we use onAuthStateChanged(). This allows us to run this function every single time the authentication state changed, including when we first load the application

// STEPS FOR WIRING UP THE LOGOUT BUTTON TO REDUX STORE:
// Create a button tag in a component
// Import the action (startLogout). Need to create this action
// Setup connect() to connect to Redux store
// With connect() set up, we now have access to dispatch
// Setup mapDispatchToProps to dispatch the action
// Grab the prop (startLogout) and attach it to onClick event in button tag
// To do this, destructure the prop name, startLogout and pass it in to Header component. Then pass this prop name to onClick event

// REDIRECTING LOGIN AND LOGOUT:
// We need to create browser history
// Install the router history library: npm i history
// history is a Javascript library that lets you easily manage session history anywhere Javascript runs. History abstracts away the differences in various environment and provides a minimal API that lets you manage history stack, navigation, confirm navigation, and persist state between session
// In AppRouter.js file import: import {createBrowserHistory} from 'history';
// To create a history: const history = createBrowserHistory();
// The <BrowserRouter> already has a built-in history, but we want to use our own history
// We can then export our history to use anywhere else: export const history = createHistory();
// We need to switch from using <BrowserRouter> to regular <Router> and pass in the history to the Router: <Router history={history}>
// In the app.js file import the named export history
// To navigate users between pages, use: history.push(). .push() method takes a path name
// When a user is logged out redirect them to login page: history.push('/')
// Login/logout redirect code:
    // // When user is logged in, redirect to the dashboard page and connect them to the expenses
    // // When user is logged out, redirect to the login page
    // let hasRendered = false;
    // const renderApp = () => {
    //     if (!hasRendered) {
    //         ReactDOM.render(jsx, document.querySelector('#app'));
    //         hasRendered = true;
    //     }
    // }
    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         store.dispatch(startSetExpenses()).then(() => {
    //             renderApp();
    //             // If history location starts out at root directory, redirect to dashboard
    //             if (history.location.pathname === '/') {
    //                 history.push('/dashboard')
    //             }
    //         });
    //         console.log('log in')
    //     } else {
    //         renderApp();
    //         history.push('/');
    //         console.log('log out')
    //     }
    // })


// =============
// NOTES
// =============

// FIREBASE AUTHENTICATION


// FIREBASE 101
// Documenation: firebase.google.com -> reference tab

// Create a Firebase Project:
// - On firebase website dashboard, click create a project
// - Name your project
// - Back to dashboard, click 'connect firebase to a WEB app'
// - Set rules to be able to READ and WRITE files
// - Create a firebase folder in the src directory. Then create a firebase.js file in the firebase folder
// - Copy the provided firebase configuration code to the firebase.js file
// - Install firebase: npm i firebase
// - Import firebase module in the firebase.js file: import * as firebase from 'firebase';
// - To test that firebase database is connected to the app, run this:
// firebase.database().ref().set({
//     name: 'Nga La'
// });
// - Visit firebase website and go to database tab. The data should show up

// Writing to the Database:
//  - The database can store primitive values and objects
//  - To access the Firebase database: firebase.database()
//  - Assign the database to a variable: const database = firebase.database()
//  - Use .ref() method to access the root of the database
//  - Pass in a property name to .ref() to access that specific property: database.ref('age')
//  - Use .set() method to set new or existing properties
//  - If you set objects/values without passing anything into ref, you will override the existing properties in the database: database.ref().set('Will override existing db')
//  - To update a property value, reference the property name in the ref, then set the value: database.ref('location/city').set('Seattle')

// Promises with Firebase:
//  - There are many methods that can be called on reference (ref)
//  - .set() is a method used to set values. It returns a promise
//  - Since it returns a promise, we can chain on .then() and .catch() methods to resolve or catch the error

// Removing Data from Firebase:
//  - Use .remove() method on ref to remove specific property
//  - Make sure to pass the property name you want to delete into .ref(). If you don't specify a name, it will wipe the entire database
//  - database.ref('age').remove()
//  - Another way to delete a property is to set the new value to 'null'. Data at this location and all child location will be deleted
//  - database.ref('age').set(null)
//  - But calling .remove() is more explicit

// Updating Data:
//  - Use .update() method on ref to update the database
//  - Update() supports promises. So you can chain on .then() and .catch() methods
//  - You can do multiple updates with a single .update() call
//  - Unlike .set(), .update() expects an object to be passed in
//  - With update, not only can you update properties that are already exist, you can also add on new properties
//  - Inside the update object, you can set a property value to null to delete that property
//  - To update a child location inside a property, wrap the path around a quote: 'location/city': 'New York'

// Reading data from Firebase:
// - .once() and .on() are two methods used to fetch data

// The .once() method:
//  - Use .once() method on ref
//  - With .once() request, we do get an argument back
//  - Unlike setting, updating, and removing, we requested some data and the data is available to us. This data is known as a snapshot
//  - On this snapshot, we have access to our data
//  - We can extract the object by using snapshot.val(). It returns the data we requested
//  - To read only specific data in the db, pass in the path to ref: .ref('location/city')
    // database.ref('location/city')
    //     .once('value')
    //     .then((snapshot) => {
    //         const val = snapshot.val()
    //         console.log(val)
    //     })
    //     .catch((e) => { 
    //         console.log('Error fetching data', e)
    //     })

// The .on() subscription method:
//  - The .on() method listens for data changes at a particular location
//  - There are 4 events we can listen to for data changes: 
//  - value event, child_added event, child_removed event, child_changed event
//  - The .on() method allows us to listen for something over and over again
//  - 1st arg: the value event we're making the request
//  - 2nd arg: this callback function runs when the value comes back
//  - 3rd arg: a function that subscribes to any errors coming back
//  - With the .on() subscription, this callback runs every time the data changes. This callback gets re-executed
//  - The .on() method returns the callback function. We can assign this return to a variable: const onValueChange = database.ref().on(event, callback)
//  - We can then reference this callback anywhere else we like
//  - Unlike with promises, which can only ever be resolved or rejected a single time with a single value
//  - We have access to the data via snapshot. Call .val() on the snapshot to extract the data
//  - The .on() method subscribes to the changes made to the db
//  - To unsubscribe: database.ref().off()
    // const onValueChange = database.ref()
    //     .on('value', (snapshot) => {
    //         console.log(snapshot.val(), (e) => {
    //         console.log('error with data fetching', e)
    //     })
    // })


// Array Data in Firebase:
//  - Firebase does not have array data structure. It has object data structure
//  - .push() method generates a unique id identifier as a key. You can store an object as the value for this key
//  - Here, a new object is generated with a unique id inside the notes tree
    // database.ref('notes').push({
    //     title: 'Course Topics',
    //     body: 'React Native, Angular, Python'
    // })
    // database.ref('notes/-Klsdjfiewjrn3kre').remove()

// Transform Firebase data to an array using forEach():
    // database.ref('expenses')
    //     .once('value')
    //     .then((snapshot) => {
    //         const expenses = [];
    //
    //         snapshot.forEach((childSnapshot) => {
    //             expenses.push({
    //                 id: childSnapshot.key,
    //                 ...childSnapshot.val()
    //             })
    //         })
    //         console.log(expenses)
    //     })

// Subscribe to a change made to the database
// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot,
//                 ...childSnapshot
//             })
//         })
//         console.log(expenses)
//     })

