const {
  fromGlobalId,
  nodeDefinitions,
} = require('graphql-relay');
const {
  getHome,
  getTask,
} = require('../api');
const {
  Home,
  Task,
} = require('../models');

const GETTERS = {
  Home: getHome,
  Task: getTask,
};
const idFetcher = globalId => {
  const { type, id } = fromGlobalId(globalId);

  return GETTERS[type] ? GETTERS[type](id) : null;
};
const typeResolver = obj => {
  if (obj instanceof Home) {
    return require('./modules/home');
  } else if (obj instanceof Task)  {
    return require('./types/task');
  } else {
    return null;
  }
};

const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);
module.exports = { nodeInterface, nodeField };
