const { GraphQLObjectType } = require('graphql');
const { connectionArgs, connectionFromArray, globalIdField } = require('graphql-relay');
const { TaskTypeConnection } = require('../connections');
const { nodeInterface } = require('../nodeDefinitions');
const { getTaskList } = require('../../db/api');

module.exports = new GraphQLObjectType({
  name: 'TaskListType',
  description: 'TaskListType module description',
  fields: () => ({
    id: globalIdField('TaskList'),
    list: {
      type: TaskTypeConnection,
      description: 'Task list',
      args: connectionArgs,
      resolve: async (_, args) => {
        const list = await getTaskList();

        return connectionFromArray(list, args);
      },
    },
  }),
  interfaces: [nodeInterface],
});
