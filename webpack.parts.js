const webpack = require('webpack');

exports.devServer = function({ host, port }) {
  return {
    devServer: {
      historyApiFallback: true, // Enable history API fallback so HTML5 History API based

      hotOnly: true, // reloads only valid bundle

      stats: 'errors-only', // Display only errors

      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // enables HMR
      new webpack.NamedModulesPlugin(), // human-readable chunks names
    ],
  };
};

exports.lintJavaScript = function({ include, exclude, options }) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include,
          exclude,
          enforce: 'pre',

          loader: 'eslint-loader',
          options,
        },
      ],
    },
  };
};
