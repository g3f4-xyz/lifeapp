const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'Task',
  description: 'A task',
  fields: () => ({
    id: globalIdField('Task'),
    title: {
      type: GraphQLString,
      description: 'Task title',
    },
    priority: {
      type: GraphQLString,
      description: 'Task priority',
    },
  }),
  interfaces: [nodeInterface],
});
