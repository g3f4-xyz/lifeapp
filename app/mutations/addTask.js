import {
  commitMutation,
  graphql,
} from 'react-relay';

const mutation = graphql`
  mutation addTaskMutation(
    $input: addTaskInput!
  ) {
    addTask(input: $input) {
      clientMutationId
      newTaskEdge {
        node {
          id
          title
          priority
          creationDate
          finishDate
          progress
          status
          note
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
      key: 'Tasks_tasks',
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
}