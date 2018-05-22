const { GraphQLString, GraphQLID } = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');
const { deleteTask } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'deleteTask',
  inputFields: {
    id: { type: GraphQLID },
  },
  outputFields: {
    deletedTaskId: { // tymczasowo do czasu dorobienia type dla ChoiceValueType
      type: GraphQLString,
      resolve: ({ id }) => id,
    },
  },
  mutateAndGetPayload: async ({ id }) => {
    console.log(['deleteTask:mutateAndGetPayload'], id);
    try {
      return {
        id: deleteTask(id),
      };
    }

    catch (error) {
      console.error(['deleteTask:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
