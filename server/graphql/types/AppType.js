const { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { getEmptyTask } = require('../../db/api');
const TaskType = require('./TaskType');
const TaskListType = require('./TaskListType');
const TaskTypeListType = require('./TaskTypeListType');
const idFetcher = require('../idFetcher');

module.exports = new GraphQLObjectType({
  name: 'AppType',
  description: 'Application entry point',
  fields: () => ({
    id: globalIdField('App'),
    taskList: {
      type: TaskListType,
      resolve: () => true,
    },
    taskTypeList: {
      type: TaskTypeListType,
      resolve: () => true,
    },
    detailsList: {
      type: new GraphQLList(TaskType),
      args: {
        ids: { type: new GraphQLList(GraphQLID) },
      },
      resolve: async (_, { ids }) => ids.map(async id => await idFetcher(id)),
    },
    taskCreate: {
      type: TaskType,
      args: {
        type: { type: GraphQLString },
      },
      resolve: async (_, args) => await getEmptyTask(args),
    },
  }),
});
