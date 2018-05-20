const { GraphQLObjectType } = require('graphql');
const { connectionArgs, connectionFromArray, globalIdField } = require('graphql-relay');
const { TaskTypeTypeConnection } = require('../connections');
const { nodeInterface } = require('../nodeDefinitions');
const { getTaskTypeList } = require('../../db/api');

module.exports = new GraphQLObjectType({
  name: 'TaskTypeListType',
  description: 'TaskTypeListType module description',
  fields: () => ({
    id: globalIdField('TaskTypeList'),
    list: {
      type: TaskTypeTypeConnection,
      description: 'Task`s type list description',
      args: connectionArgs,
      resolve: async (_, args) => {
        const list = await getTaskTypeList();

        return connectionFromArray(list, args);
      },
    },
  }),
  interfaces: [nodeInterface],
});
