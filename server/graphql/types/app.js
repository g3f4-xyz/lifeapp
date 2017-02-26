import { GraphQLObjectType } from 'graphql';
import { getUser } from '../../api'
import homeType from './home';

export default new GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: () => ({
    home: {
      type: homeType,
      resolve: () => getUser('1'),
    },
  }),
});
