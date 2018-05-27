const { GraphQLObjectType } = require('graphql');
const addTask = require('./mutations/addTask');
const addTaskType = require('./mutations/addTaskType');
const editTask = require('./mutations/editTask');
const deleteTask = require('./mutations/deleteTask');
const scheduleNotification = require('./mutations/scheduleNotification');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTask,
    addTaskType,
    editTask,
    deleteTask,
    scheduleNotification,
  }),
});
