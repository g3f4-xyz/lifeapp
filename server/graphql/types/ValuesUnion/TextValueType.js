const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports =  new GraphQLObjectType({
  name: 'TextValueType',
  describe: 'text value type',
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
