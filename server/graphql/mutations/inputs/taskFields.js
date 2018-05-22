const { GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'editTaskInputType',
  description: 'edit task input type',
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
});
