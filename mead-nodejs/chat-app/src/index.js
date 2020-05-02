const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('index')
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// ================
// CHALLENGES
// ================
// GOAL: Create an Express web server
// 1. initialize npm & install Express
// 2. setup a new Express server
//    - serve up the public directory
//    - listen to port 3000
// 3. create index.html & render "Chat app" on the screen
// 4. test your work! Start the server & view the page in the browser

// GOAL: Setup scripts in package.js
// 1. create a "start" script to start the app using node
// 2. install nodemon and a development dependency
// 3. create a "dev" script to start the app using nodemon
// 4. run both scripts to test your work