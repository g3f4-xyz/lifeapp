import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodeDefinitions';

export default new GraphQLObjectType({
  name: 'Task',
  description: 'A task',
  fields: () => ({
    id: globalIdField('Task'),
    title: {
      type: GraphQLString,
      description: 'Task title',
    },
    priority: {
      type: GraphQLString,
      description: 'Task priority',
    },
  }),
  interfaces: [nodeInterface],
});
