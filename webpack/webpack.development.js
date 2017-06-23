const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('../webpack.base.js')

module.exports = () => {
  return webpackMerge(commonConfig(), {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          include: path.resolve(__dirname, '../app/'),
          exclude: path.resolve(__dirname, '../node_modules/'),
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: false,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    // devtool: 'inline-eval-cheap-source-map',
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      clientLogLevel: 'none',
      hot: true,
      inline: true,
      stats: 'normal',
      host: 'localhost',
      port: 3000
    },
    plugins: [
      new webpack.DefinePlugin({
        process: {
          env: {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        }
      }),
      new webpack.HotModuleReplacementPlugin({'multiStep': false}),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({'template': 'html.ejs'})
    ]
  })
}
