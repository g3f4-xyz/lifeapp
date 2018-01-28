const { GraphQLUnionType } = require('graphql');
const NumberMetaType = require('./NumberMetaType');
const TextMetaType = require('./TextMetaType');

const TYPES = {
  number: NumberMetaType,
  text: TextMetaType,
};

module.exports = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'Metas Union',
  types: [NumberMetaType, TextMetaType],
  resolveType: ({ type }) => TYPES[type],
});
