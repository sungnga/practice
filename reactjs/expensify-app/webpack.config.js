const path = require('path')

// where the entry point is -> output
// to find out the absolute path, run: node webpack.config.js
// console.log(__dirname) -> /Users/nga/Desktop/practice/reactjs/1-indecision-app
// use node.js built-in module, path, to join the absolute path to the public folder
console.log(path.join(__dirname, 'public')) 

module.exports = {
    entry: './src/playground/redux-expensify.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    mode: 'development'
}