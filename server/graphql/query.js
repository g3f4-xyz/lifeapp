import { GraphQLObjectType } from 'graphql';
import { nodeField } from './nodeDefinitions';
import { getUser } from '../api';
import userType from './types/user';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: userType,
      resolve: () => getUser('1'),
    },
  }),
});
