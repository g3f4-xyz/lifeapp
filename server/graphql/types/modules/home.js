const { GraphQLObjectType } = require('graphql');
const {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} = require('graphql-relay');
const { nodeInterface } = require('../../nodeDefinitions');
const { taskConnection } = require('../../connections');
const { getTasks } = require('../../../api');

export default new GraphQLObjectType({
  name: 'Home',
  description: 'Home module',
  fields: () => ({
    id: globalIdField('Home'),
    tasks: {
      type: taskConnection,
      description: 'User\'s tasks',
      args: connectionArgs,
      resolve: async (_, args) => {
        const tasks = await getTasks();

        return connectionFromArray(tasks, args)
      },
    },
  }),
  interfaces: [nodeInterface],
});
