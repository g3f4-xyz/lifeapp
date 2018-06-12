const { schedule } = require('../agenda');
const SubscriptionModel = require('../db/models/SubscriptionModel');
const TaskModel = require('../db/models/TaskModel');
const TaskTypeModel = require('../db/models/TaskTypeModel');
const { fromGlobalId } = require('graphql-relay');

const addSubscription = async (ownerId, subscription) => {
  console.log(['api:addSubscription'], { ownerId, subscription });
  try {
    const previousSubscription = await SubscriptionModel.findOne({ subscription });

    if (previousSubscription) {
      return previousSubscription;
    }

    const newSubscription = new SubscriptionModel({ ownerId, subscription });

    return await newSubscription.save();
  }

  catch (error) {
    console.error(['api:addTask:error'], error);
    return error;
  }
};
const addTask = async task => {
  console.log(['api:addTask'], task);
  try {
    const newTask = new TaskModel(task);

    if (newTask.taskType === 'MEETING') {
      const when = newTask.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
      const person = newTask.fields.find(({ fieldId }) => fieldId === 'PERSON').value.text;
      const location = newTask.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
      schedule(when, 'notification', {
        ownerId: task.ownerId,
        notification: {
          body: `Time: ${when} | Location: ${location}`,
          title: `You have meeting with ${person}`,
        },
      });
    }

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
const deleteSubscription = async id => {
  console.log(['api:deleteSubscription:id'], id);
  try {
    const subscription = await getSubscription(id);
    console.log(['api:deleteSubscription:user'], subscription);

    await subscription.remove();

    return id;
  }

  catch (error) {
    console.error(['api:deleteSubscription:error'], error);
    return error;
  }
};
const getSubscription = async id => {
  console.log(['api:getSubscription:id'], id);
  try {
    const subscription = await SubscriptionModel.findById(id);
    console.log(['api:getSubscription:subscription'], subscription);

    return subscription;
  }

  catch (error) {
    console.error(['api:getSubscription:error'], error);
    return error;
  }
};
const getSubscriptions = async ownerId => {
  console.log(['api:getSubscriptions:ownerId'], ownerId);
  try {
    const subscriptions = await SubscriptionModel.find({ ownerId });
    console.log(['api:getSubscription:subscriptions'], subscriptions);

    return subscriptions;
  }

  catch (error) {
    console.error(['api:getSubscriptions:error'], error);
    return error;
  }
};

const getEmptyTask = async type => {
  console.log(['api:getEmptyTask:type'], type);
  try {
    const taskType = await TaskTypeModel.findOne({ typeId: type });
    console.log(['api:getEmptyTask:taskType'], taskType);
    const taskTypeList = await TaskTypeModel.find().sort({ _id : -1 });
    console.log(['api:getTaskTypeList:taskTypeList'], taskTypeList);
    const getTypeRelatedFields = (type, aggregator = []) => {
      const { parentId, fields = [] } = type.toJSON();
      aggregator.push(...fields);

      if (parentId) {
        const parentType = taskTypeList.find(task => task.get('typeId') === parentId);
        getTypeRelatedFields(parentType, aggregator);
      }

      return aggregator;
    };

    const emptyTask = {
      taskType: type,
      fields: getTypeRelatedFields(taskType),
    };

    console.log(['api:getEmptyTask:emptyTask'], emptyTask.fields);

    return emptyTask;
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};
const getTask = async id => {
  console.log(['api:getTask:id'], id);
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
      const { parentId, fields = [] } = type.toJSON();
      aggregator.push(...fields);

      if (parentId) {
        const parentType = taskTypeList.find(task => task.get('typeId') === parentId);
        getTypeRelatedFields(parentType, aggregator);
      }

      return aggregator;
    };
    const mapped = taskTypeList.map(type => ({
      ...type.toJSON(),
      fields: getTypeRelatedFields(type),
    }));

    console.log(['api:getTaskTypeList:taskTypeList:mapped'], mapped);

    return mapped;
  }

  catch (error) {
    console.error(['api:getTaskTypeList:error'], error);
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
    const { fields } = taskType;

    console.log(['api:saveTaskType:fields'], fields);

    return await (isNew ? addTask(taskType) : TaskTypeModel.findByIdAndUpdate(id, { fields }));
  }

  catch (error) {
    console.error(['api:saveTaskType:error'], error);
    return error;
  }
};

module.exports = {
  addSubscription,
  addTask,
  addTaskType,
  deleteTask,
  deleteTaskType,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  getEmptyTask,
  getTask,
  getTaskList,
  getTaskType,
  getTaskTypeList,
  saveTask,
  saveTaskType,
};
