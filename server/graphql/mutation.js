const { GraphQLObjectType } = require('graphql');
const addTask = require('./mutations/addTask');
const addTaskType = require('./mutations/addTaskType');
const editTask = require('./mutations/editTask');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTask,
    addTaskType,
    editTask,
  }),
});
