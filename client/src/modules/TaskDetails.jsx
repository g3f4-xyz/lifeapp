import PropTypes from 'prop-types';
import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import { Icon, Label, Value } from '../components';

const styles = {
  leftCol: {
    float: 'left',
    width: '50%',
    textAlign: 'left',
  },
  rightCol: {
    float: 'left',
    width: '50%',
    textAlign: 'left',
  },
  root: {
  },
  row: {
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
    if (!this.props.data.detailsList.length) {
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
    const [{ title, priority, status/* , additionalFields */ } = {}] = this.props.data.detailsList.slice(-1);

    return (
      <div style={styles.root}>
        <h1>{title}</h1>
        <Paper style={styles.row}>
          <div style={{ textAlign: 'center' }}>
            <Icon type={'eventNote'} />
            <Label>Priority</Label>
          </div>
          <Value>{priority}</Value>
        </Paper>
        <Paper style={styles.row}>
          <div style={{ textAlign: 'center' }}>
            <Icon type={'diskFull'} />
            <Label>Status</Label>
          </div>
          <Value>{status}</Value>
        </Paper>
      </div>
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
  `,
  graphql`
    query TaskDetailsRefetchQuery($ids: [ID]) {
      app {
        detailsList(ids: $ids) {
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
  `
);
