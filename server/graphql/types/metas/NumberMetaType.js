const { GraphQLObjectType, GraphQLBoolean, GraphQLFloat } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'NumberMetaType',
  description: 'NumberMetaType',
  fields: () => ({
    required: {
      description: 'required',
      type: GraphQLBoolean,
      resolve: ({ required }) => required,
    },
    min: {
      description: 'min',
      type: GraphQLFloat,
      resolve: ({ min }) => min,
    },
    max: {
      description: 'max',
      type: GraphQLFloat,
      resolve: ({ max }) => max,
    },
  }),
});
