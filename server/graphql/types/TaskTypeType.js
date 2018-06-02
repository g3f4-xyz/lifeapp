const { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const FieldType = require('./FieldType');

module.exports = new GraphQLObjectType({
  name: 'TaskTypeType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('TaskTypeType', ({ _id }) => _id),
    typeId: {
      type: GraphQLString,
      resolve: ({ typeId }) => typeId,
    },
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name,
    },
    description: {
      type: GraphQLString,
      resolve: ({ description }) => description,
    },
    order: {
      type: GraphQLInt,
      resolve: ({ order }) => order,
    },
    isCustom: {
      type: GraphQLBoolean,
      resolve: ({ isCustom }) => isCustom,
    },
    parentId: {
      type: GraphQLString,
      resolve: ({ parentId }) => console.log(['taskatype parent id resolce'], parentId) || parentId,
    },
    fieldsConfig: {
      type: new GraphQLList(FieldType),
      resolve: ({ fieldsConfig }) => fieldsConfig,
    },
  }),
  interfaces: [nodeInterface],
});
