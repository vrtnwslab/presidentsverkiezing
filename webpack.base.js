const path = require('path')

module.exports = () => {
  return {
    entry: ['babel-polyfill', './app/index.jsx'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'app'),
          exclude: path.resolve(__dirname, 'node_modules/'),
          use: {
            loader: 'babel-loader?cacheDirectory'
          }
        },
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, 'assets/images'),
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        },
        {
          test: /\.(png|jpg|jpeg)$/,
          include: path.resolve(__dirname, 'assets/images'),
          use: {
            loader: 'file-loader'
          }
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/font-woff'
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            { loader: 'file-loader' }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        data: path.resolve(__dirname, 'assets/data'),
        components: path.resolve(__dirname, 'app/components'),
        containers: path.resolve(__dirname, 'app/containers'),
        reducers: path.resolve(__dirname, 'app/reducers'),
        actions: path.resolve(__dirname, 'app/actions'),
        libs: path.resolve(__dirname, 'app/libs')
      }
    }
  }
}
