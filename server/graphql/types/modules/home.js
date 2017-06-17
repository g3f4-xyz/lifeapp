const { GraphQLObjectType } = require('graphql');
const {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} = require('graphql-relay');
const { nodeInterface } = require('../../nodeDefinitions');
const { taskConnection } = require('../../connections');
const { getTasks } = require('../../../api');

module.exports = new GraphQLObjectType({
  name: 'Home',
  description: 'Home module',
  fields: () => ({
    id: globalIdField('Home'),
    tasks: {
      type: taskConnection,
      description: 'User\'s tasks',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getTasks(), args),
    },
  }),
  interfaces: [nodeInterface],
});
