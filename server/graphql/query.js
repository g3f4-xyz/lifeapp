import { GraphQLObjectType } from 'graphql';
import appType from './types/app';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    app: {
      type: appType,
      resolve: () => true,
    },
  }),
});
