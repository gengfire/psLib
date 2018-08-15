'use strict'
const path = require('path');
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

//编译输出路径
module.exports = {
    debug: true,
    entry: './demo/index',
    output: {
        path: __dirname + "/dist/",
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    devServer: {
        inline: true,
        hot: true,
        port: 8080,
        historyApiFallback: true,
        noInfo: true
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
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
