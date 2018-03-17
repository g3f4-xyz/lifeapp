const { GraphQLObjectType, GraphQLFloat } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'NumberValueType',
  fields: () => ({
    number: {
      type: GraphQLFloat,
      resolve: ({ number }) => number,
    },
  }),
});
