const { GraphQLNonNull, GraphQLString } = require('graphql');
const { mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const { homeType } = require('../types');

const { addTask, getHome, getTasks } = require('../../api');
const { TaskEdge } = require('../connections');

module.exports = mutationWithClientMutationId({
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
      resolve: async node => {
        console.log(['mutations.addTask.outputFields.newTaskEdge'], node);
        const tasks = await getTasks();

        return {
          node,
          cursor: cursorForObjectInConnection(tasks, node),
        };
      },
    },
    home: {
      type: homeType,
      resolve: async () => await getHome(),
    },
  },
  mutateAndGetPayload: async task => {
    console.log(['addTask.mutateAndGetPayload'], task);

    return await addTask(task);
  },
});
