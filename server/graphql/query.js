const { GraphQLObjectType } = require('graphql');
const AppType = require('./types/AppType');

module.exports = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    app: {
      description: 'Application entry point',
      type: AppType,
      resolve: ({ user }) => user,
    },
  }),
});
