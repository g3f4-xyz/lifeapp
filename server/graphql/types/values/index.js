const { GraphQLUnionType } = require('graphql');
const NumberValueType = require('./NumberValueType');
const TextValueType = require('./TextValueType');

const TYPES = {
  NUMBER: NumberValueType,
  TEXT: TextValueType,
};

module.exports = new GraphQLUnionType({
  name: 'ValuesUnion',
  description: 'Values Union',
  types: [NumberValueType, TextValueType],
  resolveType: ({ type }) => TYPES[type] || TYPES.TEXT,
});
