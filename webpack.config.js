const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');

module.exports = function(env) {
  return [
    clientConfig(env),
    serverConfig(env),
  ];
};
