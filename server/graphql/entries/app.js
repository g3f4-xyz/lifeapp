const { GraphQLObjectType } = require('graphql');
const { getHome } = require('../../api');
const homeType = require('../modules/home');

module.exports = new GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: () => ({
    home: {
      type: homeType,
      resolve: () => getHome(),
    },
  }),
});
