const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  client: path.join(__dirname, 'client'),
  build: path.join(__dirname, 'build'),
};

const common = merge({
  entry: {
    app: PATHS.client,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'LifeApp',
    }),
  ],
});

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common,
      parts.lintJavaScript({ include: PATHS.client }),
    ]);
  }

  return merge([
    common,
    {
      plugins: [
        new webpack.NamedModulesPlugin(),
      ],
    },
    parts.devServer({
      host: process.env.HOST,
      port: process.env.PORT,
    }),
    parts.lintJavaScript({
      include: PATHS.client,
      options: {
        emitWarning: true,
      },
    }),
  ]);
};
