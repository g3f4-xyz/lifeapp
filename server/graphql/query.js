const { GraphQLObjectType } = require('graphql');
const appType = require('./entries/app');

module.exports = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    app: {
      type: appType,
      resolve: () => true,
    },
  }),
});
