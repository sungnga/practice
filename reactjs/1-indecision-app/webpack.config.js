const path = require('path')

// where the entry point is -> output
// to find out the absolute path, run: node webpack.config.js
// console.log(__dirname) -> /Users/nga/Desktop/practice/reactjs/1-indecision-app
// use node.js built-in module, path, to join the absolute path to the public folder
console.log(path.join(__dirname, 'public')) 

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    mode: 'development'
}