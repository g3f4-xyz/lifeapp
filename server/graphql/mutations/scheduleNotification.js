const { GraphQLString } = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');
const { schedule } = require('../../agenda');
const notificationType = require('./inputs/notificationType');

module.exports = mutationWithClientMutationId({
  name: 'scheduleNotification',
  inputFields: {
    when: {
      type: GraphQLString,
    },
    notification: {
      type: notificationType,
    },
  },
  outputFields: {
    message: { type: GraphQLString },
  },
  mutateAndGetPayload: async ({ when, notification }) => {
    console.log(['scheduleNotification:mutateAndGetPayload'], { when, notification });
    schedule(when, 'notification', notification);

    return notification;
  },
});
