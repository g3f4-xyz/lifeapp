import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../environment';

const updateValueRecord = (record, value, key) => {
  record.getLinkedRecord('value').setValue(value, key);
};

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

export default editedTask => new Promise((resolve, reject) => {
  const variables = { input: editedTask };
  console.log(['mutation:editTask:variables'], variables);

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: resolve,
      onError: reject,
      optimisticUpdater: proxyStore => {
        console.log(['optimisticUpdater']);
        const fieldsRecords = proxyStore.get(editedTask.id).getLinkedRecords('fields');

        fieldsRecords.forEach(record => {
          const format = record.getValue('format');
          const fieldId = record.getValue('fieldId');
          const { id, text } = editedTask.fields.find((field) => fieldId === field.fieldId).value;

          if (['ELIXIR'].includes(format)) {
            updateValueRecord(record, text, 'text');
          } else
          if (['CHOICE'].includes(format)) {
            updateValueRecord(record, id, 'id');
          }
        });
      },
      updater: proxyStore => {
        console.log(['updater']);
        const fieldsRecords = proxyStore.get(editedTask.id).getLinkedRecords('fields');
        const mutationRootRecord = proxyStore.getRootField('editTask');
        const mutatedFieldsRecords = mutationRootRecord
          .getLinkedRecord('newTaskEdge')
          .getLinkedRecord('node')
          .getLinkedRecords('fields');

        fieldsRecords.forEach(record => {
          const format = record.getValue('format');
          const fieldId = record.getValue('fieldId');
          const mutatedValue = mutatedFieldsRecords.find(record => record.getValue('fieldId') === fieldId).getLinkedRecord('value');

          if (['ELIXIR'].includes(format)) {
            updateValueRecord(record, mutatedValue.getValue('text'), 'text');
          } else
          if (['CHOICE'].includes(format)) {
            updateValueRecord(record, mutatedValue.getValue('id'), 'id');
          }
        });
      },
    },
  );
});
