"use strict";

const webpack = require('webpack');
const path = require('path');
const dev = process.env.NODE_ENV !== "production";

module.exports = {
  devtool: dev ? 'inline-sourcemap' : null,
  entry: path.join(__dirname, 'src', 'index.js'),
  devServer: {
    inline: true,
    port: 3000,
    contentBase: "src/static/",
  },
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    publicPath: "/js/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        cacheDirectory: 'babel_cache',
        presets: dev ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015']
      }
    }]
  },
  plugins: dev ? [] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    }),
  ]
};
