'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackBaseConfig = require('./Base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

class WebpackDevConfig extends WebpackBaseConfig {
    constructor() {
        super()

        this.config = {
            mode: 'development',
            entry: {
                app: ['./src/index.js']
            },
            devtool: 'cheap-module-eval-source-map',
            devServer: {
                contentBase: this.srcPathAbsolute,
                port: 9527,
                inline: true,
                historyApiFallback: true,
                disableHostCheck: true,
                noInfo: false,
                stats: 'minimal'
            },
            output: {
                path: path.resolve(__dirname, '../dist'),
                publicPath: '',
                chunkFilename: 'scripts/modules/[id].[hash:8].js',
                filename: 'scripts/[name].[hash:8].js',
                sourceMapFilename: '[name].map'
            },
            plugins: [
                new ExtractTextPlugin('styles/[name].[contenthash:16].css'),
                new HtmlWebpackPlugin({
                    template: 'index.ejs',
                    inject: 'body',
                    title: 'Title',
                    minify: {
                        collapseWhitespace: true,
                        conservativeCollapse: true
                    }
                })
            ]
        }
    }
}

module.exports = WebpackDevConfig
