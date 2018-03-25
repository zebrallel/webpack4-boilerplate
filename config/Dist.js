'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackBaseConfig = require('./Base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

class WebpackDistConfig extends WebpackBaseConfig {
    constructor() {
        super()

        this.env = 'dist'
        this.config = {
            mode: 'production',
            entry: {
                vendor: ['react', 'react-dom'],
                app: ['./src/index.tsx']
            },
            output: {
                path: path.resolve(__dirname, '../dist'),
                publicPath: '',
                chunkFilename: 'scripts/modules/[id].[chunkhash:16].js',
                filename: 'scripts/[name].[chunkhash:16].js'
            },
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            chunks: 'initial',
                            test: 'vendor',
                            name: 'vendor',
                            enforce: true
                        }
                    }
                }
            },
            plugins: [
                new ExtractTextPlugin('styles/[name].[contenthash:16].css'),
                new HtmlWebpackPlugin({
                    template: 'index.ejs',
                    inject: 'body',
                    title: 'Demo',
                    minify: {
                        collapseWhitespace: true,
                        conservativeCollapse: true
                    }
                })
            ]
        }
    }
}

module.exports = WebpackDistConfig
