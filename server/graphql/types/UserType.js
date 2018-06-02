const { GraphQLObjectType } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  description: 'user type',
  fields: () => ({
    id: globalIdField('User', ({ _id }) => _id),
  }),
  interfaces: [nodeInterface],
});
