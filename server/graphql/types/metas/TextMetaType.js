const { GraphQLObjectType, GraphQLBoolean, GraphQLInt } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'TextMetaType',
  description: 'TextMetaType',
  fields: () => ({
    required: {
      description: 'required',
      type: GraphQLBoolean,
      resolve: ({ meta: { required } }) => required,
    },
    minLen: {
      description: 'minLen',
      type: GraphQLInt,
      resolve: ({ meta: { minLen } }) => minLen,
    },
    maxLen: {
      description: 'maxLen',
      type: GraphQLInt,
      resolve: ({ meta: { maxLen } }) => maxLen,
    },
  }),
});
