const { GraphQLBoolean, GraphQLInt, GraphQLInputObjectType } = require('graphql');
const optionsInputType = require('./optionsInputType');

module.exports = new GraphQLInputObjectType({
  name: 'metaInputType',
  description: 'meta input type',
  fields: () => ({
    required: {
      type: GraphQLBoolean,
    },
    minLen: {
      type: GraphQLInt,
    },
    maxLen: {
      type: GraphQLInt,
    },
    options: {
      type: optionsInputType,
    },
  }),
});
