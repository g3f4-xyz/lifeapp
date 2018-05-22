import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../environment';

const mutation = graphql`
  mutation deleteTaskMutation(
    $input: deleteTaskInput!
  ) {
    deleteTask(input: $input) {
      # Aktualnie serwer zwraca null przez co za pewne nie działa jakiś mechanizm relay
      clientMutationId
      deletedTaskId
    }
  }
`;

export default ({ id, parentId }) => new Promise((resolve, reject) => {
  const variables = { input: { id } };
  console.log(['mutation:deleteTask:id'], id);

  const configs = [{
    type: 'RANGE_DELETE',
    parentID: parentId,
    connectionKeys: [{
      key: 'TaskList_list',
    }],
    pathToConnection: ['taskList', 'list'],
    deletedIDFieldName: 'deletedTaskId'
  }];

  commitMutation(
    environment,
    {
      mutation,
      configs,
      variables,
      onCompleted: resolve,
      onError: reject,
    },
  );
});
