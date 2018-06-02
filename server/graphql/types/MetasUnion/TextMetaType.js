const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'TextMetaType',
  description: 'text meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: GraphQLBoolean,
      resolve: ({ required }) => required,
    },
    minLen: {
      description: 'minLen',
      type: GraphQLInt,
      resolve: ({ minLen }) => minLen,
    },
    maxLen: {
      description: 'maxLen',
      type: GraphQLInt,
      resolve: ({ maxLen }) => maxLen,
    },
    options: {
      description: 'options',
      type: new GraphQLList(new GraphQLObjectType({
        name: 'ChoiceOptionsType',
        description: 'Choice options Type',
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
      })),
      resolve: ({ options }) => options,
    },
  }),
});
