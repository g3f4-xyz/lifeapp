const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports =  new GraphQLObjectType({
  name: 'TextNumberType',
  fields: () => ({
    text: {
      type: GraphQLString,
      resolve: ({ text }) => text,
    },
    id: { // tymczasowo do czasu dorobienia type dla ChoiceValueType
      type: GraphQLString,
      resolve: ({ id }) => id,
    },
  }),
});
