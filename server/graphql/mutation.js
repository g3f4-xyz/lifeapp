import { GraphQLObjectType } from 'graphql';
import { addTask } from './mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTask,
  }),
});
