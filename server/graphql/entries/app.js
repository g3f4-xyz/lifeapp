import { GraphQLObjectType } from 'graphql';
import { getHome } from '../../api'
import homeType from '../modules/home';

export default new GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: () => ({
    home: {
      type: homeType,
      resolve: () => getHome(),
    },
  }),
});
