const { GraphQLObjectType, GraphQLString } = require('graphql');
const { getHome } = require('../../api');
const homeType = require('./modules/home');
const taskType = require('./task');
const idFetcher = require('../idFetcher');

module.exports = new GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: () => ({
    home: {
      type: homeType,
      resolve: async () => await getHome(),
    },
    taskDetails: {
      type: taskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, { id }) => await idFetcher(id),
    },
  }),
});
