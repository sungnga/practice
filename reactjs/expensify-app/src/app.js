import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';
// import './playground/promises'

const store = configureStore();
//console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.querySelector('#app'));

// =============
// NOTES
// =============

// FIREBASE
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