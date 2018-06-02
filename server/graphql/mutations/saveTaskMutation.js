const { GraphQLBoolean } = require('graphql');
const { mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const { TaskTypeEdge } = require('../connections');
const { DEMO_USER } = require('../../config');
const { saveTask, getTaskList } = require('../../db/api');
const taskInputType = require('./inputs/taskInputType');

module.exports = mutationWithClientMutationId({
  name: 'saveTaskMutation',
  inputFields: {
    isNew: {
      type: GraphQLBoolean,
    },
    task: {
      type: taskInputType,
    },
  },
  outputFields: {
    newTaskEdge: {
      type: TaskTypeEdge,
      resolve: async task => {
        const tasks = await getTaskList({ ownerId: task.ownerId });

        return {
          node: task,
          cursor: cursorForObjectInConnection(tasks, task),
        };
      },
    },
  },
  mutateAndGetPayload: async ({ isNew, task }, { user = DEMO_USER }) => {
    console.log(['saveTaskMutation:mutateAndGetPayload'], task.fields);
    return await saveTask({ isNew, task: { ...task, ownerId: user.id } });
  },
});
