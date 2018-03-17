const { GraphQLObjectType } = require('graphql');
const addTask = require('./mutations/addTask');
const addTaskType = require('./mutations/addTaskType');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTask,
    addTaskType,
  }),
});
