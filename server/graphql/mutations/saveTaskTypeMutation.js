const { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLInt, GraphQLID } = require('graphql');
const { mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const TaskTypeListType = require('../types/TaskTypeListType');
const { TaskTypeTypeEdge } = require('../connections');
const { saveTaskType, getTaskTypeList } = require('../../db/api');
const fieldsInputType = require('./inputs/fieldsInputType');

module.exports = mutationWithClientMutationId({
  name: 'saveTaskTypeMutation',
  inputFields: {
    typeId: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    order: {
      type: GraphQLInt,
    },
    isNew: {
      type: GraphQLBoolean,
    },
    isCustom: {
      type: GraphQLBoolean,
    },
    parentId: {
      type: GraphQLString,
    },
    fieldsConfig: {
      type: new GraphQLList(fieldsInputType),
    },
  },
  outputFields: {
    newTaskTypeEdge: {
      type: TaskTypeTypeEdge,
      resolve: async node => {
        console.log(['saveTaskTypeMutation.outputFields.newTaskEdge'], node);
        const tasks = await getTaskTypeList();

        return {
          node,
          cursor: cursorForObjectInConnection(tasks, node),
        };
      },
    },
    taskTypeList: {
      type: TaskTypeListType,
      resolve: () => true,
    },
  },
  mutateAndGetPayload: async ({ isNew, taskType }) => {
    console.log(['saveTaskTypeMutation.mutateAndGetPayload'], { isNew, taskType });

    return await saveTaskType({ isNew, taskType });
  },
});
