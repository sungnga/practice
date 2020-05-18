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

database.ref().set({
    name: 'Nga La',
    age: 99,
    stressLevel: 6,
    job: {
        title: 'Software developer',
        company: 'Google'
    },
    isSingle: true,
    location: {
        city: 'San Francisco',
        country: 'United States'
    }
}).then(() => {
    console.log('Data is saved')
}).catch((e) => {
    console.log('This failed.', e)
})

// Change the stressLevel to a 9
// Change job.company to Amazon
// Change location.city to Seattle
database.ref().update({
    stressLevel: 9,
    'job/company': 'Amazon',
    'location/city': 'Seattle'
})

// database
//     .ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('Successfully removed');
//     })
//     .catch((e) => {
//         console.log('Did not remove: ', e);
//     });

