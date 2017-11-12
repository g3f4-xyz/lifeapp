const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'Task',
  description: 'A task',
  fields: () => ({
    id: globalIdField('Task', ({ _id }) => _id),
    title: {
      type: GraphQLString,
      description: 'Task title',
    },
    priority: {
      type: GraphQLString,
      description: 'Task priority',
    },
    creationDate: {
      type: GraphQLString,
      description: 'Task creationDate',
    },
    finishDate: {
      type: GraphQLString,
      description: 'Task finishDate',
    },
    progress: {
      type: GraphQLInt,
      description: 'Task progress',
    },
    status: {
      type: GraphQLString,
      description: 'Task status',
    },
    note: {
      type: GraphQLString,
      description: 'Task note',
    },
  }),
  interfaces: [nodeInterface],
});
