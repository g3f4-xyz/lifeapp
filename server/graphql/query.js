import { GraphQLObjectType } from 'graphql';
import { appType } from './types';
import { nodeField } from './nodeDefinitions';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    app: {
      type: appType,
      resolve: () => true,
    },
    node: nodeField,
  }),
});
