const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const MetasUnion = require('./MetasUnion');
const ValuesUnion = require('./ValuesUnion');

module.exports = new GraphQLObjectType({
  name: 'FieldType',
  description: 'field type',
  fields: () => ({
    fieldId: {
      description: 'fieldId field description',
      type: GraphQLString,
      resolve: ({ fieldId }) => fieldId,
    },
    format: {
      description: 'format field description',
      type: GraphQLString,
      resolve: ({ format }) => format,
    },
    order: {
      description: 'order field description',
      type: GraphQLInt,
      resolve: ({ order }) => order,
    },
    type: {
      description: 'type field description',
      type: GraphQLString,
      resolve: ({ type }) => type,
    },
    label: {
      description: 'label field description',
      type: GraphQLString,
      resolve: ({ label }) => label,
    },
    value: {
      description: 'value field description',
      type: ValuesUnion,
      resolve: ({ value }) => value,
    },
    info: {
      description: 'info field description',
      type: GraphQLString,
      resolve: ({ info }) => info,
    },
    meta: {
      description: 'meta field description',
      type: MetasUnion,
      resolve: ({ type, meta }) => ({ type, ...meta }),
    },
  }),
});
