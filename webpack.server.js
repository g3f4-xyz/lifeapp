const path = require('path');

const config = {
  devtool: 'sourcemap',
  entry: './server/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
    libraryTarget: 'amd',
  },
  target: 'node',
  externals: /^[a-z\-0-9]+$/,
};

module.exports = function(env) {
  console.log(['env'], env);
  process.env.BABEL_ENV = env;
  
  return config;
};
