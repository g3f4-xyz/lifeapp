const TaskModel = require('../../db/models/TaskModel');
const TaskTypeModel = require('../../db/models/TaskTypeModel');
const UserModel = require('../../db/models/UserModel');

module.exports = obj => {
  if (obj instanceof TaskModel) {
    return require('../types/TaskType');
  }
  else if (obj instanceof TaskTypeModel) {
    return require('../types/TaskTypeType');
  }
  else if (obj instanceof UserModel) {
    return require('../types/UserType');
  }

  console.error(['nodeDefinitions.typeResolver.error'], 'Cannot match instance class.');
};
