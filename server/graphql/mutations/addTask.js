const { GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLInputObjectType } = require('graphql');
const { mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const { TaskListType } = require('../types');
const { TaskTypeEdge } = require('../connections');
const { addTask, getTaskList } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'addTask',
  inputFields: {
    id: { type: GraphQLID },
    priority: { type: GraphQLInt },
    status: { type: GraphQLString },
    title: { type: GraphQLString },
    additionalFields: {
      type: new GraphQLList(new GraphQLInputObjectType({
        name: 'addTaskFieldType',
        description: 'add task input type',
        fields: () => ({
          fieldId: { type: GraphQLString },
          number: { type: GraphQLFloat },
          text: { type: GraphQLString },
        }),
      })),
    },
  },
  outputFields: {
    newTaskEdge: {
      type: TaskTypeEdge,
      resolve: async node => {
        console.log(['mutations.addTask.outputFields.newTaskEdge'], node);
        const tasks = await getTaskList();

        return {
          node,
          cursor: cursorForObjectInConnection(tasks, node),
        };
      },
    },
    taskList: {
      type: TaskListType,
      resolve: () => true,
    },
  },
  mutateAndGetPayload: async task => {
    console.log(['addTask.mutateAndGetPayload'], task);

    return await addTask(task);
  },
});
