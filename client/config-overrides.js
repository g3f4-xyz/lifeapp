const rewireRelay = require('react-app-rewire-relay');

/* config-overrides.js */
module.exports = function override(config, env) {
  return rewireRelay(config, env);
};
