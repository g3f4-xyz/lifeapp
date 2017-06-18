import { GraphQLObjectType, GraphQLString } from 'graphql';
import { getHome, getTask } from '../../api'
import homeType from '../modules/home';
import taskType from '../types/task';
import { idFetcher } from '../nodeDefinitions';

export default new GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: () => ({
    home: {
      type: homeType,
      resolve: () => getHome(),
    },
    taskDetails: {
      type: taskType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, { id }) => {
        return id ? idFetcher(id) : null;
      },
    },
  }),
});
