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
    isSingle: true,
    location: {
        city: 'San Francisco',
        country: 'United States',
    },
});        

// database.ref().set('This will override the above database')

// Update age value
database.ref('age').set(22)
// Update a property inside another object
database.ref('location/city').set('Portland')
// Update the database with a new property object
database.ref('attribute').set({
    height: 55,
    weight: 100
})


console.log(database)
