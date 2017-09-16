import { GraphQLObjectType } from 'graphql';
import addTask from './mutations/addTask';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTask,
  }),
});
