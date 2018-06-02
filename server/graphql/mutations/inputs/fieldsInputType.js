const { GraphQLString, GraphQLInt, GraphQLInputObjectType } = require('graphql');
const valueInputType = require('./valueInputType');
const metaInputType = require('./metaInputType');

module.exports = new GraphQLInputObjectType({
  name: 'fieldsInputType',
  description: 'fields input type',
  fields: () => ({
    fieldId: {
      type: GraphQLString,
    },
    format: {
      type: GraphQLString,
    },
    order: {
      type: GraphQLInt,
    },
    type: {
      type: GraphQLString,
    },
    label: {
      type: GraphQLString,
    },
    value: {
      type: valueInputType,
    },
    info: {
      type: GraphQLString,
    },
    meta: {
      type: metaInputType,
    },
  }),
});
