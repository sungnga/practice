import * as firebase from 'firebase';

// Your web app's Firebase configuration
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();


// child_added
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
})

// child_changed
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
})

// child_removed
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
})

// Subscribe to changes to the database
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

// Transform Firebase data to an array using forEach()
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         })
//         console.log(expenses)
//     })

// database.ref('expenses').push({
//     description: 'water bill',
//     note: '',
//     amount: 34.67,
//     createdAt: 0
// })

// Firebase does not have array data structure. It has object data structure
// .push() method generates a unique id identifier as a key. You can store an object as the value for this key
// database.ref('notes').push({
//     title: 'Course Topics',
//     body: 'React Native, Angular, Python'
// })

// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val()
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`)
// }, (e) => {
//         console.log('Cannot fetch data', e)
// })

// The .on() method allows us to listen for something over and over again
// 1st arg: the value event we're making the request
// 2nd arg: this callback function runs when the value comes back
// 3rd arg: a function that subscribes to any errors coming back
// With the .on() method, this callback runs every time the data changes. This callback gets re-executed
// The .on() method returns the callback function. We can assign this return to a variable: const onValueChange = database.ref().on(event, callback)
// We can then reference this callback anywhere else we like
// Unlike with promises, which can only ever be resolved or rejected a single time with a single value
// We have access to the data via snapshot. Call .val() on the snapshot to extract the data
// The .on() method subscribes to the changes made to the db
// To unsubscribe: database.ref().off()
// const onValueChange = database.ref()
//     .on('value', (snapshot) => {
//         console.log(snapshot.val(), (e) => {
//         console.log('error with data fetching', e)
//     })
// })

// With .once() request, we do get an argument back
// Unlike setting, updating, and removing, we requested some data and the data is available to us. This data is known as a snapshot
// On this snapshot, we have access to our data
// We can extract the object by using snapshot.val(). It returns the data we requested
// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val()
//         console.log(val)
//     })
//     .catch((e) => { 
//         console.log('Error fetching data', e)
//     })

// database.ref().set({
//     name: 'Nga La',
//     age: 99,
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     isSingle: true,
//     location: {
//         city: 'San Francisco',
//         country: 'United States'
//     }
// }).then(() => {
//     console.log('Data is saved')
// }).catch((e) => {
//     console.log('This failed.', e)
// })

// Change the stressLevel to a 9
// Change job.company to Amazon
// Change location.city to Seattle
// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })

// database
//     .ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('Successfully removed');
//     })
//     .catch((e) => {
//         console.log('Did not remove: ', e);
//     });

