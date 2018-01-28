import {
  commitMutation,
  graphql,
} from 'react-relay';

const mutation = graphql`
  mutation addTaskMutation(
    $input: addTaskInput!
  ) {
    addTask(input: $input) {
      # Aktualnie serwer zwraca null przez co za pewne nie działa jakiś mechanizm relay
      clientMutationId 
      newTaskEdge {
        node {
          id
          title
          status
          priority
          additionalFields {
            fieldId
            format
            type
            label
            value {
              ... on NumberValueType {
                number
              }
              ... on TextNumberType{
                text
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
  const configs = [
    {
      parentID,
      type: 'RANGE_ADD',
      connectionInfo: [{
        key: 'TaskList_list',
        rangeBehavior: 'prepend',
      }],
      edgeName: 'newTaskEdge',
    }];

  commitMutation(
    environment,
    {
      configs,
      mutation,
      variables,
      onCompleted,
      onError,
    },
  );
};