import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, cursorForObjectInConnection } from 'graphql-relay';
import { homeType } from '../types';
import { Task } from '../../models';
import { addTask, getHome, getTasks } from '../../api';
import { TaskEdge } from '../connections';

export default mutationWithClientMutationId({
  name: 'addTask',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    priority: {
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
    },
    creationDate: {
      type: GraphQLString,
    },
    progress: {
      type: GraphQLString,
    },
    finishDate: {
      type: GraphQLString,
    },
    note: {
      type: GraphQLString,
    },
  },
  outputFields: {
    newTaskEdge: {
      type: TaskEdge,
      resolve: task => {
        console.log(['mutations.addTask.outputFields.newTaskEdge'], task)

        return {
          cursor: cursorForObjectInConnection(
            getTasks(),
            task
          ),
          node: task,
        };
      },
    },
    home: {
      type: homeType,
      resolve: (payload) => getHome(),
    },
  },
  mutateAndGetPayload: (task) => {
    console.log(['addTask.mutateAndGetPayload'], task);

    return addTask(new Task(task));
  },
})