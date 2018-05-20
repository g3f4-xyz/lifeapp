const { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLInputObjectType } = require('graphql');
const { mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const { TaskTypeListType } = require('../types');
const { TaskTypeTypeEdge } = require('../connections');
const { addTaskType, getTaskTypeList } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'addTaskType',
  inputFields: {
    typeId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    order: { type: GraphQLInt },
    isCustom: { type: GraphQLBoolean },
    parentId: { type: GraphQLString },
    fieldsConfig: {
      type: new GraphQLList(new GraphQLInputObjectType({
        name: 'taskTypeFieldsConfigInputType',
        description: 'add task type fields config input type',
        fields: () => ({
          fieldId: { type: GraphQLString },
          format: { type: GraphQLString },
          order: { type: GraphQLInt },
          type: { type: GraphQLString },
          label: { type: GraphQLString },
          info: { type: GraphQLString },
          meta: { type: new GraphQLInputObjectType({
            name: 'fieldsConfigMetaInputType',
            description: 'add task`s type meta input type',
            fields: () => ({
              required: { type: GraphQLBoolean },
              minLen: { type: GraphQLInt },
              maxLen: { type: GraphQLInt },
              min: { type: GraphQLFloat },
              max: { type: GraphQLFloat },
            }),
          }) },
          value: { type: new GraphQLInputObjectType({
            name: 'addTaskTypeValueFieldType',
            description: 'add task`s type value input type',
            fields: () => ({
              number: { type: GraphQLInt },
              text: { type: GraphQLString },
              id: { type: GraphQLString },
            }),
          }) },
        }),
      })),
    },
  },
  outputFields: {
    newTaskTypeEdge: {
      type: TaskTypeTypeEdge,
      resolve: async node => {
        console.log(['mutations.addTaskType.outputFields.newTaskEdge'], node);
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
  mutateAndGetPayload: async task => {
    console.log(['addTaskType.mutateAndGetPayload'], task);

    return await addTaskType(task);
  },
});
