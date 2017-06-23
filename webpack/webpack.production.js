const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const commonConfig = require('../webpack.base.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (env) => {
  return webpackMerge(commonConfig(env), {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          include: path.resolve(__dirname, '../app'),
          exclude: path.resolve(__dirname, '../node_modules/'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            // resolve-url-loader may be chained before sass-loader if necessary
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                  localIdentName: '[name]__[local]--[hash:base64:5]'
                }
              },
              'sass-loader'
            ]
          })
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(['build'], {
        root: path.resolve(__dirname, '../'),
        verbose: true
      }),
      new ExtractTextPlugin('styles.css'),
      new webpack.DefinePlugin({
        process: {
          env: {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          join_vars: true,
          if_return: true
        },
        comments: false,
        output: {
          comments: false,
          inline_script: true
        }
      }),
      new HtmlWebpackPlugin({template: 'html.ejs'}),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../assets/data'),
          to: path.resolve(__dirname, '../build/assets/data')
        },
        {
          from: path.resolve(__dirname, '../assets/images'),
          to: path.resolve(__dirname, '../build/assets/images')
        }
      ]),
      new BundleAnalyzerPlugin()
    ]
  })
}
