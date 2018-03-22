'use strict'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

class WebpackBaseConfig {
    constructor(){
        this.env = 'dev'
        this._config = {}
    }

    set config(data) {
        this._config = Object.assign({}, this.defaultSettings, data)
        return this._config
    }

    get config() {
        return this._config
    }

    get srcPathAbsolute() {
        return path.join(__dirname, '../src')
    }

    get defaultSettings() {
        return {
            context: path.resolve(__dirname, '..'),
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        include: [this.srcPathAbsolute],
                        loader: ['babel-loader']
                    },
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract({
                            use: 'css-loader'
                        })
                    },
                    {
                        test: /\.(sass|scss)$/,
                        loader: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'sass-loader']
                        })
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        query: {
                            limit: '8192',
                            name: 'images/[name].[hash:16].[ext]'
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                modules: [this.srcPathAbsolute, 'node_modules']
            }
        }
    }
}

module.exports = WebpackBaseConfig
