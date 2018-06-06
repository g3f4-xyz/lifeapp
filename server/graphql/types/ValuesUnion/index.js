const { GraphQLUnionType } = require('graphql');
const ChoiceValueType = require('./ChoiceValueType');
const NumberValueType = require('./NumberValueType');
const TextValueType = require('./TextValueType');

const TYPES = {
  CHOICE: ChoiceValueType,
  NUMBER: NumberValueType,
  TEXT: TextValueType,
};

module.exports = new GraphQLUnionType({
  name: 'ValuesUnion',
  description: 'Values Union',
  types: Object.values(TYPES),
  resolveType: ({ type }) => TYPES[type] || TYPES.TEXT,
});
