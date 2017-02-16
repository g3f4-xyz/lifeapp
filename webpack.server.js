const path = require('path');
const webpack = require('webpack');

const config = {
  devtool: 'sourcemap',
  entry: './server/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: /^[a-z\-0-9]+$/,
};

module.exports = function(env) {
  return config;
};
