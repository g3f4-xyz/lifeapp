import React from 'react';
import Relay from 'react-relay';
import Icon from 'material-ui/svg-icons/notification/event-note';

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
    marginBottom: 20
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

    const { title, priority } = this.props.taskDetails;

    return (
      <div style={styles.root}>
        <h1>{title}</h1>
        <div style={styles.leftCol}>
          <div style={styles.row}>
            <Icon style={styles.icon} />
            {priority}
          </div>
          <div style={styles.row}>
            <Icon style={styles.icon} />
            left
          </div>
          <div style={styles.row}>
            <Icon style={styles.icon} />
            left
          </div>
          <div style={styles.row}>
            <Icon style={styles.icon} />
            left
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.row}>
            <Icon style={styles.icon} />
            right
          </div>
          <div style={styles.row}>
            <Icon style={styles.icon} />
            right
          </div>
          <div style={styles.row}>
            <Icon style={styles.icon} />
            right
          </div>
          <div style={styles.row}>
            <Icon style={styles.icon} />
            right
          </div>
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
      }
    `,
  },
});
