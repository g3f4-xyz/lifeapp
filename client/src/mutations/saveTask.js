import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../environment';

const updateValueRecord = (record, value, key) => {
  record.getLinkedRecord('value').setValue(value, key);
};

const mutation = graphql`
  mutation saveTaskMutation(
    $input: saveTaskMutationInput!
  ) {
    saveTask(input: $input) {
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
            helperText
            meta {
              ... on BoolMetaType {
                  required
              }
              ... on ChoiceMetaType {
                  required
                  defaultValue
                  options {
                      text
                      value
                  }
              }
              ... on NumberMetaType {
                  required
                  min
                  max
              }
              ... on TextMetaType {
                  required
                  minLen
                  maxLen
              }
            }
            value {
              ... on BoolValueType {
                  bool
              }
              ... on ChoiceValueType {
                  id
              }
              ... on NumberValueType {
                  number
              }
              ... on TextValueType {
                  text
              }
            }
          }
        }
      }
    }
  }
`;

export default ({ isNew, task, parentID }) => new Promise((resolve, reject) => {
  const variables = { input: { isNew, task } };
  console.log(['mutation:saveTask:variables'], variables);
  const configs = isNew ? [{
    parentID,
    type: 'RANGE_ADD',
    connectionInfo: [{
      key: 'TaskList_list',
      rangeBehavior: 'prepend',
    }],
    edgeName: 'newTaskEdge',
  }] : [];
  console.log(['mutation:saveTask:configs'], configs);

  commitMutation(
    environment,
    {
      configs,
      mutation,
      variables,
      onCompleted: resolve,
      onError: reject,
      optimisticUpdater: proxyStore => {
        console.log(['optimisticUpdater:isNew'], isNew);
        if (isNew) {
          console.log(['optimisticUpdater'], `zaimplementuj to`);
        } else {
          const fieldsRecords = proxyStore.get(task.id).getLinkedRecords('fields');

          fieldsRecords.forEach(record => {
            const format = record.getValue('format');
            const fieldId = record.getValue('fieldId');
            const { id, text } = task.fields.find((field) => fieldId === field.fieldId).value;

            if (['ELIXIR'].includes(format)) {
              updateValueRecord(record, text, 'text');
            } else
            if (['CHOICE'].includes(format)) {
              updateValueRecord(record, id, 'id');
            }
          });
        }
      },
      updater: proxyStore => {
        console.log(['updater:isNew'], isNew);
        if (!isNew) {
          const fieldsRecords = proxyStore.get(task.id).getLinkedRecords('fields');
          const mutationRootRecord = proxyStore.getRootField('saveTask');
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
        }
      },
    },
  );
});
