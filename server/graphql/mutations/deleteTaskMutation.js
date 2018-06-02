const { GraphQLString, GraphQLID } = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');
const { deleteTask } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'deleteTaskMutation',
  inputFields: {
    id: { type: GraphQLID },
  },
  outputFields: {
    deletedTaskId: {
      type: GraphQLString,
      resolve: ({ id }) => id,
    },
  },
  mutateAndGetPayload: async ({ id }) => {
    console.log(['deleteTaskMutation:mutateAndGetPayload'], id);
    try {
      return {
        id: deleteTask(id),
      };
    }

    catch (error) {
      console.error(['deleteTaskMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
