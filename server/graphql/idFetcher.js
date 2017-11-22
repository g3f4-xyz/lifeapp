const {
  fromGlobalId,
} = require('graphql-relay');
const {
  getHome,
  getTask,
} = require('../db/api');

const GETTERS = {
  Home: getHome,
  Task: getTask,
};

module.exports = async globalId => {
  const { type, id } = fromGlobalId(globalId);
  console.log(['idFetcher'], globalId, { type, id });
  const node = GETTERS[type] ? await GETTERS[type](id) : null;

  if (node) {
    return node;
  }

  console.error(['idFetcher.error'], 'Cannot resolve node by id.');

  return null;
};
