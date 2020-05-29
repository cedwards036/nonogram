const path = require('path');

module.exports = {
    mode: 'development', 
    entry: {
        create: './src/create.js',
        solve: './src/solve.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};