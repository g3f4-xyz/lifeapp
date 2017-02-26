import { GraphQLObjectType } from 'graphql';
import appType from './entries/app';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    app: {
      type: appType,
      resolve: () => true,
    },
  }),
});
