const { GraphQLUnionType } = require('graphql');
const ChoiceMetaType = require('./ChoiceMetaType');
const NumberMetaType = require('./NumberMetaType');
const TextMetaType = require('./TextMetaType');

const TYPES = {
  CHOICE: ChoiceMetaType,
  NUMBER: NumberMetaType,
  TEXT: TextMetaType,
};

module.exports = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: Object.values(TYPES),
  resolveType: ({ type }) => {
    console.log(['MetasUnion:resolveType'], type);

    return TYPES[type] || TYPES.TEXT;
  },
});