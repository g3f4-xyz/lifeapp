const { GraphQLObjectType } = require('graphql');
const { appType } = require('./types');
const { nodeField } = require('./nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    app: {
      type: appType,
      resolve: () => true,
    },
    node: nodeField,
  }),
});
