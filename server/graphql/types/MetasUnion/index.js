const { GraphQLUnionType } = require('graphql');
const NumberMetaType = require('./NumberMetaType');
const TextMetaType = require('./TextMetaType');

const TYPES = {
  NUMBER: NumberMetaType,
  TEXT: TextMetaType,
};

module.exports = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: [NumberMetaType, TextMetaType],
  resolveType: ({ type }) => TYPES[type] || TYPES.TEXT,
});
