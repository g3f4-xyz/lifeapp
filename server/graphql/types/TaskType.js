const { GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const FieldType = require('./FieldType');

module.exports = new GraphQLObjectType({
  name: 'TaskType',
  description: 'Task type decription',
  fields: () => ({
    id: globalIdField('Task', ({ _id }) => _id),
    taskType: {
      type: GraphQLString,
      resolve: ({ taskType }) => taskType,
    },
    fields: {
      type: new GraphQLList(FieldType),
      args: {
        filterByIds: { type: new GraphQLList(GraphQLString) },
      },
      resolve: ({ fields }, args) =>
        args && args.filterByIds ? fields.filter(({ fieldId }) => args.filterByIds.includes(fieldId)) : fields,
    },
  }),
  interfaces: [nodeInterface],
});
