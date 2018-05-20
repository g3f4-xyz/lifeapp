import PropTypes from 'prop-types';
import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import Create from 'material-ui/svg-icons/content/create';
import { Icon, Label, Value } from '../components';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
  },
};

class TaskDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    selectedTaskId: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    this.props.relay.refetch({ ids: [nextProps.selectedTaskId] });
  }

  componentDidMount() {
    this.props.relay.refetch({ ids: [this.props.selectedTaskId] });
  }

  render() {
    if (this.props.data && this.props.data.detailsList && this.props.data.detailsList.length > 0) {
      const [{ taskType, fields }] = this.props.data.detailsList;

      return (
        <div style={styles.root}>
          <h1>{taskType}</h1>
        {fields
          .map(item => item) // propsy są immutable, sortowanie modyfikuje oryginalną tablicę
          .sort((a, b) => a.order - b.order)
          .map(({ fieldId, label, type, meta: { options }, value }) => console.log(['options'], options) || (
          <div key={fieldId}>
            <Paper style={styles.row}>
              <div style={{ padding: 10, width: 200, textAlign: 'left' }}>
                <Create />
                <Label style={{ padding: 10 }}>{label}</Label>
              </div>
              <div style={{ width: '80%', textAlign: 'right' }}>
                <div style={{ padding: 20 }}>{value.text || value.number || value.id}</div>
              </div>
            </Paper>
          </div>
        ))}
        </div>
      );
    }

    return (
      <CircularProgress
        style={{
          margin: 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        size={180}
        thickness={15}
      />
    );
  }
}

export default createRefetchContainer(
  TaskDetails,
  graphql`
    fragment TaskDetails on AppType @argumentDefinitions(
      ids: { type: "[ID]", defaultValue: [] },
    ) 
    {
      detailsList(ids: $ids) {
        id
        taskType
        fields {
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
  `,
  graphql`
    query TaskDetailsRefetchQuery($ids: [ID]) {
      app {
        detailsList(ids: $ids) {
          id
          taskType
          fields {
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
  `
);