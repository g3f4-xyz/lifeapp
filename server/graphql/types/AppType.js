const { GraphQLObjectType } = require('graphql');
const { globalIdField } = require('graphql-relay');
const TaskListType = require('./TaskListType');
const TaskTypeListType = require('./TaskTypeListType');

module.exports = new GraphQLObjectType({
  name: 'AppType',
  description: 'Application entry point',
  fields: () => ({
    id: globalIdField('App'),
    taskList: {
      type: TaskListType,
      resolve: ({ id }) => ({ id: id }),
    },
    taskTypeList: {
      type: TaskTypeListType,
      resolve: () => true,
    },
  }),
});
