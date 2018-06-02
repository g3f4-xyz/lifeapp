const UserModel = require('../db/models/UserModel');
const TaskModel = require('../db/models/TaskModel');
const TaskTypeModel = require('../db/models/TaskTypeModel');
const { fromGlobalId } = require('graphql-relay');

const addTask = async task => {
  console.log(['api:addTask'], task);
  try {
    const newTask = new TaskModel(task);

    return await newTask.save();
  }

  catch (error) {
    console.error(['api:addTask:error'], error);
    return error;
  }
};
const addTaskType = async taskType => {
  console.log(['api:addTaskType'], taskType);
  try {
    const newTaskType = new TaskTypeModel(taskType);

    return await newTaskType.save();
  }

  catch (error) {
    console.error(['api:addTaskType:error'], error);
    return error;
  }
};
const addUser = async ({ id}) => {
  console.log(['addUser'], { id });
  try {
    const newUser = new UserModel({ id });

    return await newUser.save();
  }

  catch (error) {
    console.error(['api:addUser:error'], error);
    return error;
  }
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
const deleteTaskType = async (hashId) => {
  console.log(['api:deleteTaskType:hashId'], hashId);
  try {
    const { id } = await fromGlobalId(hashId);
    console.log(['api:deleteTask:id'], id);
    const taskType = await getTaskType(id);
    console.log(['api:deleteTask:taskType'], taskType);

    await taskType.remove();

    return hashId;
  }

  catch (error) {
    console.error(['api:deleteTaskType:error'], error);
    return error;
  }
};
const deleteUser = async (hashId) => {
  console.log(['api:deleteUser:hashId'], hashId);
  try {
    const { id } = await fromGlobalId(hashId);
    console.log(['api:deleteUser:id'], id);
    const user = await getUser(id);
    console.log(['api:deleteUser:user'], user);

    await user.remove();

    return hashId;
  }

  catch (error) {
    console.error(['api:deleteUser:error'], error);
    return error;
  }
};

const getTask = async (id) => {
  console.log(['api:getTaskType:id'], id);
  try {
    const task = await TaskModel.findById(id);
    console.log(['api:getTask:task'], task);

    return task;
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};
const getTaskList = async ({ ownerId }) => {
  console.log(['api:getTaskList:ownerId'], ownerId);
  try {
    const taskList = await TaskModel.find({ ownerId }).sort({ _id : -1 });
    console.log(['api:getTaskList:taskList'], taskList);

    return taskList;
  }

  catch (error) {
    console.error(['api:getTaskList:error'], error);
    return error;
  }
};
const getTaskType = async (id) => {
  console.log(['api:getTaskType:id'], id);
  try {
    const taskType = await TaskTypeModel.findById(id);
    console.log(['api:getTask:taskType'], taskType);

    return taskType;
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};
const getTaskTypeList = async () => {
  console.log(['api:getTaskTypeList']);
  try {
    const taskTypeList = await TaskTypeModel.find().sort({ _id : -1 });
    console.log(['api:getTaskTypeList:taskTypeList'], taskTypeList);
    const getTypeRelatedFields = (type, aggregator = []) => {
      console.log(['getTypeRelatedFields'], type);
      const { parentId, fieldsConfig = [] } = type.toJSON();
      aggregator.push(...fieldsConfig);

      if (parentId) {
        const parentType = taskTypeList.find(task => task.get('typeId') === parentId);
        getTypeRelatedFields(parentType, aggregator);
      }

      return aggregator;
    };
    const mapped = taskTypeList.map(type => ({
      ...type.toJSON(),
      fieldsConfig: getTypeRelatedFields(type),
    }));

    console.log(['api:getTaskTypeList:taskTypeList:mapped'], mapped);

    return mapped;
  }

  catch (error) {
    console.error(['api:getTaskTypeList:error'], error);
    return error;
  }
};
const getUser = async (id) => {
  console.log(['api:getTaskType:id'], id);
  try {
    const user = await UserModel.findOne({ id });
    console.log(['api:getUser:user'], user);

    return user;
  }

  catch (error) {
    console.error(['api:getUser:error'], error);
    return error;
  }
};

const saveTask = async ({ task, isNew = true }) => {
  console.log(['api:saveTask'], { task, isNew });
  try {
    const { id } = await fromGlobalId(task.id);
    const { fields } = task;

    console.log(['api:saveTask:id'], id);
    console.log(['api:saveTask:fields'], fields);

    return await (isNew ? addTask(task) : TaskModel.findByIdAndUpdate(id, { fields }));
  }

  catch (error) {
    console.error(['api:saveTask:error'], error);
    return error;
  }
};
const saveTaskType = async ({ taskType, isNew = true }) => {
  console.log(['api:saveTaskType'], { taskType, isNew });
  try {
    const { id } = await fromGlobalId(taskType.id);
    const { fieldsConfig } = taskType;

    console.log(['api:saveTaskType:fieldsConfig'], fieldsConfig);

    return await (isNew ? addTask(taskType) : TaskTypeModel.findByIdAndUpdate(id, { fieldsConfig }));
  }

  catch (error) {
    console.error(['api:saveTaskType:error'], error);
    return error;
  }
};
const saveUser = async ({ user, isNew = true }) => {
  console.log(['api:saveUser'], { user, isNew });
  try {
    const { id } = await fromGlobalId(user.id);

    return await (isNew ? addUser(user) : UserModel.findByIdAndUpdate(id, user));
  }

  catch (error) {
    console.error(['api:saveUser:error'], error);
    return error;
  }
};

module.exports = {
  addTask,
  addTaskType,
  addUser,
  deleteTask,
  deleteTaskType,
  deleteUser,
  getTask,
  getTaskList,
  getTaskType,
  getTaskTypeList,
  getUser,
  saveTask,
  saveTaskType,
  saveUser,
};
