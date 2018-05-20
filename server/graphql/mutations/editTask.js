const { GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLInputObjectType } = require('graphql');
const { mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
// const { TaskListType } = require('../types'); // dlaczego wywalenie tej zależności psuje aplikację
const { TaskTypeEdge } = require('../connections');
const { DEMO_USER } = require('../../config');
const { editTask, getTaskList } = require('../../db/api');
const taskFields = require('./inputs/taskFields');

module.exports = mutationWithClientMutationId({
  name: 'editTask',
  inputFields: {
    id: { type: GraphQLID },
    taskType: { type: GraphQLString },
    fields: {
      type: new GraphQLList(taskFields),
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
  mutateAndGetPayload: async (task, { user = DEMO_USER }) => {
    console.log(['editTask:mutateAndGetPayload'], task.fields);
    return await editTask({ ...task, ownerId: user.id });
  },
});
