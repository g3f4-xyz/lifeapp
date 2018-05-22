const UserModel = require('../db/models/UserModel');
const TaskModel = require('../db/models/TaskModel');
const TaskTypeModel = require('../db/models/TaskTypeModel');
const { fromGlobalId } = require('graphql-relay');

const addUser = async ({ id, displayName }) => {
  console.log(['addUser'], { id, displayName });
  const newUser = new UserModel({ id, displayName });

  return await newUser.save();
};
const getUser = async (id) => await UserModel.findOne({ id });
// const getUsers = async () => await UserModel.find();
const addTask = async task => {
  console.log(['api:addTask'], task);
  const newTask = new TaskModel(task);

  return await newTask.save();
};
const editTask = async task => {
  try {
    const { id } = await fromGlobalId(task.id);
    const { fields } = task;
    console.log(['api:editTask:fields'], fields);
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { fields });
    console.log(['api:editTask:updatedTask:fields'], updatedTask.fields);

    return updatedTask;
  }

  catch (e) {
    console.error(['api:editTask:e'], e);
    return e;
  }
};
const addTaskType = async taskType => {
  const newTaskType = new TaskTypeModel(taskType);

  return await newTaskType.save();
};
const deleteTask = async (hashId) => {
  console.log(['api:deleteTask:hashId'], hashId);
  try {
    const { id } = await fromGlobalId(hashId);
    console.log(['api:deleteTask:id'], id);
    const task = await getTask(id);
    console.log(['api:deleteTask:task'], task);

    await task.remove();

    return hashId;
  }

  catch (error) {
    console.error(['api:deleteTask:error'], error);
    return error;
  }
};
const getTask = async (id) => await TaskModel.findById(id);
const getTaskType = async (id) => {
  const [model] = await TaskTypeModel.find({ typeId: id });

  return model;
};
const getTaskList = async ({ ownerId }) => await TaskModel.find({ ownerId }).sort({ _id : -1 });
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
  deleteTask,
  editTask,
  getUser,
  // getUsers,
  getTask,
  // getTaskType,
  getTaskList,
  getTaskTypeList,
  getEmptyTask,
};
