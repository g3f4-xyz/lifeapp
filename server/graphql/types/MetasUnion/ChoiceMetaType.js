const { GraphQLObjectType, GraphQLBoolean, GraphQLInt } = require('graphql');
const ChoiceOptionsType = require('./ChoiceOptionsType');

module.exports = new GraphQLObjectType({
  name: 'ChoiceMetaType',
  description: 'choice meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: GraphQLBoolean,
    },
    defaultValue: {
      description: 'defaultValue',
      type: GraphQLInt,
    },
    options: {
      description: 'options',
      type: ChoiceOptionsType,
    },
  }),
});
