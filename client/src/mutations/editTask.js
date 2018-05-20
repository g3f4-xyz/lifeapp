import {
  commitMutation,
  graphql,
} from 'react-relay';

const mutation = graphql`
  mutation editTaskMutation(
    $input: editTaskInput!
  ) {
    editTask(input: $input) {
      # Aktualnie serwer zwraca null przez co za pewne nie działa jakiś mechanizm relay
      clientMutationId 
      newTaskEdge {
        node {
          id
          fields {
            fieldId
            format
            type
            order
            label
            value {
              ... on NumberValueType {
                number
              }
              ... on TextNumberType{
                text
                id
              }
            }
            info
            meta {
              ... on NumberMetaType {
                required
                min
                max
              }
              ... on TextMetaType{
                required
                minLen
                maxLen
              }
            }
          }
        }
      }
    }
  }
`;

export default (environment, input, parentID, onCompleted, onError) => {
  const variables = { input };

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted,
      onError,
      // updater: store => {
      //   const payload = store.getRootField('editTask');
      //   const linkedRecord = payload.getLinkedRecord('newTaskEdge');
      //   const listRecord = store.get(parentID);
      //   const tasksRecords = listRecord.getLinkedRecords('edges') || [];
      // },
    },
  );
};
