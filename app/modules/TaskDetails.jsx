import React from 'react';
import Relay from 'react-relay';
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
  icon: {
    // width: '80%',
    // height: '80%',
  },
  root: {
  },
  row: {
    margin: 10,
  },
};

class TaskDetails extends React.Component {
  static propTypes = {
    taskDetails: React.PropTypes.object,
  };
  render() {
    console.log(['this.props.taskDetails'], this.props.taskDetails);

    if (!this.props.taskDetails) {
      return null;
    }

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

export default Relay.createContainer(TaskDetails, {
  fragments: {
    taskDetails: () => Relay.QL`
      fragment on Task {
        id
        title
        priority
        creationDate
        finishDate
        progress
        status
        note
      }
    `,
  },
});
