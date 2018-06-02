const { fromGlobalId } = require('graphql-relay');
const { getTask, getTaskType, getUser } = require('../db/api');

const GETTERS = {
  Task: getTask,
  TaskType: getTaskType,
  User: getUser,
};

module.exports = async globalId => {
  const { type, id } = fromGlobalId(globalId);
  console.log(['idFetcher'], globalId, { type, id });
  const node = GETTERS[type] ? await GETTERS[type](id) : null;

  console.log(['idFetcher.node'], node);

  if (node) {
    return node;
  }

  console.error(['idFetcher.error'], 'Cannot resolve node by id.');

  return null;
};
