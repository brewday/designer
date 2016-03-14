var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.resolve(__dirname, 'src');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    app: './src/main',
    vendor: './src/vendor'
  },
  output: {
      path: buildPath,
      filename: 'app.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: srcPath,
        exclude: nodeModulesPath,
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: srcPath,
        exclude: nodeModulesPath,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.scss/,
        loaders: ['style', 'css', 'sass'],
        exclude: nodeModulesPath,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'ENV': (process.env.ENV = process.env.NODE_ENV = 'development'),
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],
  devServer: {
    port: 3000,
    contentBase: 'build/',
    colors: true,
    historyApiFallback: true,
    proxy: {
      '/api*': {
        target: 'http://localhost:4010'
      }
    },
  }
};
