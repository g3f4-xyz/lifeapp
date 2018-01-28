const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const FieldType = require('./FieldType');

module.exports = new GraphQLObjectType({
  name: 'TaskType',
  description: 'Task type decription',
  fields: () => ({
    id: globalIdField('Task', ({ _id }) => _id),
    title: {
      type: GraphQLString,
      resolve: ({ title }) => title,
    },
    status: {
      type: GraphQLString,
      resolve: ({ status }) => status,
    },
    priority: {
      type: GraphQLInt,
      resolve: ({ priority }) => priority,
    },
    additionalFields: {
      type: new GraphQLList(FieldType),
      resolve: ({ additionalFields }) => additionalFields,
    },
  }),
  interfaces: [nodeInterface],
});
