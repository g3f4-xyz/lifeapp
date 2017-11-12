import { GraphQLObjectType, GraphQLString } from 'graphql';
import { getHome } from '../../api';
import homeType from '../types/modules/home';
import taskType from '../types/task';
import { idFetcher } from '../nodeDefinitions';

export default new GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: () => ({
    home: {
      type: homeType,
      resolve: async () => await getHome(),
    },
    taskDetails: {
      type: taskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, { id }) => await idFetcher(id),
    },
  }),
});
