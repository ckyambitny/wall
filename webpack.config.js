module.exports = {
    entry: './app/scripts/main.es7.js',
    output: {
        filename: './app/dist/bundle.js'
    },
    module: {
            loaders: [
                { test: /\.es6.js$/, exclude: /node_modules/, loader: 'babel-loader' },
                { test: /\.handlebars$/, loader: 'handlebars-loader' }
            ]
    },
    devtool: '#cheap-module-source-map'
};
