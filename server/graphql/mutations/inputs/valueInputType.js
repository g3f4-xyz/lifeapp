const { GraphQLString, GraphQLInt, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'valueInputType',
  description: 'value input type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
    number: {
      type: GraphQLInt,
    },
    id: {
      type: GraphQLString,
    },
  }),
});
