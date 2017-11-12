const { GraphQLObjectType } = require('graphql');
const addTask = require('./mutations/addTask');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTask,
  }),
});
