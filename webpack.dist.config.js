'use strict'
const path = require('path');
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

//编译输出路径
module.exports = {
    debug: true,
    entry: './src/lib/index',
    output: {
        path: __dirname + "/dist/",
        filename: 'psLib.min.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: [ 'es2015' ]
            }
        }]
    },
    babel: {
        presets: [
            ["es2015", {
                "loose": true,
                "spec": true,
                // "modules": false
            }]
        ],
        plugins: ['transform-runtime']
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src')
        },
        extension: ['.js'],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
};
