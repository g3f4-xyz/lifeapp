const { GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLInputObjectType } = require('graphql');
const { mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const { TaskListType } = require('../types'); // dlaczego wywalenie tej zależności psuje aplikację
const { TaskTypeEdge } = require('../connections');
const { addTask, getTaskList } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'addTask',
  inputFields: {
    id: { type: GraphQLID },
    taskType: { type: GraphQLString },
    fields: {
      type: new GraphQLList(new GraphQLInputObjectType({
        name: 'addTaskFieldType',
        description: 'add task input type',
        fields: () => ({
          fieldId: {
            type: GraphQLString,
          },
          format: {
            type: GraphQLString,
          },
          order: {
            type: GraphQLInt,
          },
          type: {
            type: GraphQLString,
          },
          label: {
            type: GraphQLString,
          },
          value: {
            type: new GraphQLInputObjectType({
              name: 'FieldValueInputType',
              description: 'FieldValueInputType',
              fields: () => ({
                text: {
                  type: GraphQLString,
                },
                number: {
                  type: GraphQLInt,
                },
                id: {
                  type: GraphQLString,
                },
              }),
            }),
          },
          info: {
            type: GraphQLString,
          },
          meta: {
            type: new GraphQLInputObjectType({
              name: 'FieldMetaInputType',
              description: 'FieldMetaInputType',
              fields: () => ({
                required: {
                  type: GraphQLBoolean,
                },
                minLen: {
                  type: GraphQLInt,
                },
                maxLen: {
                  type: GraphQLInt,
                },
                options: {
                  description: 'options',
                  type: new GraphQLList(new GraphQLInputObjectType({
                    name: 'ChoiceOptionsInputType',
                    description: 'Choice options input Type',
                    fields: () => ({
                      text: {
                        type: GraphQLString,
                      },
                      value: {
                        type: GraphQLString,
                      },
                    }),
                  })),
                },
              }),
            }),
          },
        }),
      })),
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
  mutateAndGetPayload: async (task, { user }) => {
    return await addTask({ ...task, ownerId: user.id });
  },
});
