const TaskModel = require('../../db/models/TaskModel');
const { TaskType } = require('../types');

module.exports = obj => {
  if (obj instanceof TaskModel) {
    return TaskType;
  }

  console.error(['nodeDefinitions.typeResolver.error'], 'Cannot match instance class.');
};
