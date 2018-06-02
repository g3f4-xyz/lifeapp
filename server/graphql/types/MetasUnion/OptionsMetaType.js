const { GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLList(new GraphQLObjectType({
  name: 'OptionsMetaType',
  description: 'options meta type',
  fields: () => ({
    text: {
      description: 'text',
      type: GraphQLString,
      resolve: ({ text }) => text,
    },
    value: {
      description: 'value',
      type: GraphQLString,
      resolve: ({ value }) => value,
    },
  }),
}));
