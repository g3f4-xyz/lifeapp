import PropTypes from 'prop-types';
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../environment';
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
    selectedTaskId: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    console.log(['componentWillReceiveProps'], nextProps)
  }

  render() {
    const { title, priority, creationDate, finishDate, progress, status, note } = this.props.taskDetails;

    return (
      <div style={styles.root}>
        <h1>{title}</h1>
        <div style={styles.leftCol}>
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
             <Label>Creation Date</Label>
            </div>
            <Value>{creationDate}</Value>
          </Paper>
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
              <Label>Progress</Label>
            </div>
            <Value>{progress}</Value>
          </Paper>
        </div>
        <div style={styles.rightCol}>
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
             <Label>Status</Label>
            </div>
            <Value>{status}</Value>
          </Paper>
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
              <Label>Finish Date</Label>
            </div>
            <Value>{finishDate}</Value>
          </Paper>
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
              <Label>Note</Label>
            </div>
            <Value>{note}</Value>
          </Paper>
        </div>
      </div>
    );
  }
}

/*export default createRefetchContainer(
  TaskDetails,
  graphql.experimental`
    fragment TaskDetails on App
    @argumentDefinitions(
      selectedTaskId: {type: "String", defaultValue: null}
    ) {
      taskDetails (id: $selectedTaskId) {
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
  `,
  graphql.experimental`
    query TaskDetailsRefetchQuery($selectedTaskId: String) {
      app {
        ...TaskDetails
      }
    }
  `,
);*/

export default class DataProvider extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query TaskDetailsQuery($selectedTaskId: String) {
            app {
              taskDetails (id: $selectedTaskId) {
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
        `}
        variables={{
          selectedTaskId: this.props.selectedTaskId,
        }}
        render={({error, props}) => {
          if (error) {
            return <div>{JSON.stringify(error)}</div>;
          } else if (props) {
            return <TaskDetails {...props.app} />;
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
        }}
      />
    );
  }
}
