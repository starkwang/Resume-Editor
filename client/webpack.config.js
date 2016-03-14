var webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.coffee$/,
            loader: 'coffee-loader'
        }, {
            test: /\.css$/,
            loader: "css-loader"
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015','react']
            }
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
           'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};
