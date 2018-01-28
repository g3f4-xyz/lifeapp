const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports =  new GraphQLObjectType({
  name: 'TextNumberType',
  fields: () => ({
    text: {
      type: GraphQLString,
      resolve: ({ value: { text } }) => text,
    },
  }),
});
