import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
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
    creationDate: {
      type: GraphQLString,
      description: 'Task creationDate',
    },
    finishDate: {
      type: GraphQLString,
      description: 'Task finishDate',
    },
    progress: {
      type: GraphQLString,
      description: 'Task progress',
    },
    isDone: {
      type: GraphQLBoolean,
      description: 'Task isDone',
    },
    note: {
      type: GraphQLString,
      description: 'Task note',
    },
  }),
  interfaces: [nodeInterface],
});
