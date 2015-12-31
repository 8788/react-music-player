var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [path.resolve(__dirname, 'src/main.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel' },
            { test: /\.scss$/, loader: 'style!css!sass' },
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
} else {
    module.exports.devtool = '#source-map';
}