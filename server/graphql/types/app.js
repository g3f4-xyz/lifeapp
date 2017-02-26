import { GraphQLObjectType } from 'graphql';
import { getUser } from '../../api'
import userType from './user';

export default new GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: () => ({
    user: {
      type: userType,
      resolve: () => getUser('1'),
    },
  }),
});
