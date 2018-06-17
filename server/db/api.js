const { schedule } = require('../agenda');
const SubscriptionModel = require('../db/models/SubscriptionModel');
const TaskModel = require('../db/models/TaskModel');
const TaskTypeModel = require('../db/models/TaskTypeModel');

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
  console.log(['api:addTask'], { task });
  try {
    const newTask = new TaskModel(task);

    if (newTask.taskType === 'MEETING') {
      const when = newTask.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
      const person = newTask.fields.find(({ fieldId }) => fieldId === 'PERSON').value.text;
      const location = newTask.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
      schedule((new Date(when)).toISOString(), 'notification', {
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

const deleteTask = async id => {
  console.log(['api:deleteTask'], id);
  try {
    const task = await getTask(id);

    await task.remove();

    return id;
  }

  catch (error) {
    console.error(['api:deleteTask:error'], error);
    return error;
  }
};
const deleteTaskType = async id => {
  console.log(['api:deleteTaskType'], id);
  try {
    const taskType = await getTaskType(id);

    await taskType.remove();

    return id;
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
  console.log(['api:getEmptyTask'], type);
  try {
    const taskType = await TaskTypeModel.findOne({ typeId: type });
    const taskTypeList = await TaskTypeModel.find().sort({ _id : -1 });
    const getTypeRelatedFields = (type, aggregator = []) => {
      const { parentId, fields = [] } = type.toJSON();
      aggregator.push(...fields);

      if (parentId) {
        const parentType = taskTypeList.find(task => task.get('typeId') === parentId);
        getTypeRelatedFields(parentType, aggregator);
      }

      return aggregator;
    };

    return {
      taskType: type,
      fields: getTypeRelatedFields(taskType),
    };
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};
const getTask = async id => {
  console.log(['api:getTask'], id);
  try {
    return await TaskModel.findById(id);
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};
const getTaskList = async ({ ownerId }) => {
  console.log(['api:getTaskList'], ownerId);
  try {
    return await TaskModel.find({ ownerId }).sort({ _id : -1 });
  }

  catch (error) {
    console.error(['api:getTaskList:error'], error);
    return error;
  }
};
const getTaskType = async id => {
  console.log(['api:getTaskType'], id);
  try {
    return await TaskTypeModel.findById(id);
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
    const getTypeRelatedFields = (type, aggregator = []) => {
      const { parentId, fields = [] } = type.toJSON();
      aggregator.push(...fields);

      if (parentId) {
        const parentType = taskTypeList.find(task => task.get('typeId') === parentId);
        getTypeRelatedFields(parentType, aggregator);
      }

      return aggregator;
    };

    return taskTypeList.map(type => ({
      ...type.toJSON(),
      fields: getTypeRelatedFields(type),
    }));
  }

  catch (error) {
    console.error(['api:getTaskTypeList:error'], error);
    return error;
  }
};

const saveTask = async ({ taskId, task, isNew = true }) => {
  console.log(['api:saveTask'], { taskId, task, isNew });
  try {
    const { fields } = task;

    return await (isNew ? addTask(task) : TaskModel.findByIdAndUpdate(taskId, { fields }));
  }

  catch (error) {
    console.error(['api:saveTask:error'], error);
    return error;
  }
};
const saveTaskType = async ({ taskTypeId, taskType, isNew = true }) => {
  console.log(['api:saveTaskType'], { taskType, isNew });
  try {
    const { fields } = taskType;

    return await (isNew ? addTask(taskType) : TaskTypeModel.findByIdAndUpdate(taskTypeId, { fields }));
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
