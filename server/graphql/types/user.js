import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';
import { nodeInterface } from '../nodeDefinitions';
import { taskConnection } from '../connections';
import { getTasks } from '../../api';

export default new GraphQLObjectType({
  name: 'User',
  description: 'Application user',
  fields: () => ({
    id: globalIdField('User'),
    tasks: {
      type: taskConnection,
      description: 'User\'s tasks',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getTasks(), args),
    },
  }),
  interfaces: [nodeInterface],
});
