const { GraphQLObjectType, GraphQLString } = require('graphql');
const { getEmptyTask, getHome } = require('../../db/api');
const homeType = require('./modules/home');
const taskType = require('./task');
const idFetcher = require('../idFetcher');

module.exports = new GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: () => ({
    home: {
      type: homeType,
      resolve: getHome,
    },
    taskDetails: {
      type: taskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, { id }) => await idFetcher(id),
    },
    taskCreate: {
      type: taskType,
      args: {
        type: { type: GraphQLString },
      },
      resolve: async (_, { type }) => await getEmptyTask(type),
    },
  }),
});
