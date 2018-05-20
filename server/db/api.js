const UserModel = require('../db/models/UserModel');
const TaskModel = require('../db/models/TaskModel');
const TaskTypeModel = require('../db/models/TaskTypeModel');

const addUser = async ({ id, displayName, tasks = [] }) => {
  console.log(['addUser'], { id, displayName });
  const newUser = new UserModel({ id, displayName, tasks });

  return await newUser.save();
};
const getUser = async (id) => await UserModel.findOne({ id });
const getUsers = async () => await UserModel.find();
const addTask = async task => {
  const newTask = new TaskModel(task);

  return await newTask.save();
};
const addTaskType = async taskType => {
  const newTaskType = new TaskTypeModel(taskType);

  return await newTaskType.save();
};
const getTask = async (id) => await TaskModel.findById(id);
const getTaskType = async (id) => {
  const [model] = await TaskTypeModel.find({ typeId: id });

  return model;
};
const getTaskList = async () => await TaskModel.find().sort({ _id : -1 });
const getTaskTypeList = async () => await TaskTypeModel.find().sort({ _id : -1 });
const getEmptyTask = async ({ type }) => {
  if (!type) {
    return null;
  }
  const traverseTypesByParentId = async (type, aggregator = []) => {
    const { parentId, fieldsConfig = [] } = type.toJSON();
    aggregator.push(...fieldsConfig);

    if (parentId) {
      const parentType = await getTaskType(parentId);
      await traverseTypesByParentId(parentType, aggregator);
    }

    return aggregator;
  };

  const taskType = await getTaskType(type);
  const fields = await traverseTypesByParentId(taskType);
  const { typeId } = taskType.toJSON();

  return {
    taskType: typeId,
    fields,
  };
};

module.exports = {
  addUser,
  addTask,
  addTaskType,
  getUser,
  getUsers,
  getTask,
  getTaskType,
  getTaskList,
  getTaskTypeList,
  getEmptyTask,
};
