const { GraphQLObjectType, GraphQLString } = require('graphql');
const MetasUnion = require('./metas');
const ValuesUnion = require('./values');

module.exports = new GraphQLObjectType({
  name: 'FieldType',
  description: 'Field Type',
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
      resolve: (root) => root,
    },
    info: {
      description: 'info field description',
      type: GraphQLString,
      resolve: ({ info }) => info,
    },
    meta: {
      description: 'meta field description',
      type: MetasUnion,
      resolve: (root) => root,
    },
  }),
});
