import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      welcome: {
        type: GraphQLString,
        resolve: () => 'Welcome to LifeApp'
      }
    }
  })
});
