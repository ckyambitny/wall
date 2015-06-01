module.exports = {
    entry: './app/main.es6.js',
    output: {
        filename: './app/bundle.js'
    },
    module: {
            loaders: [
                { test: /\.es6.js$/, exclude: /node_modules/, loader: 'babel-loader' },
                { test: /\.scss/, loader: 'style-loader!css-loader!sass-loader' }
            ]
    },
};    
