import React from 'react';
import Icon from 'material-ui/svg-icons/notification/event-note';

const styles = {
  icon: {
    width: '80%',
    height: '80%',
  },
};

export default class TaskDetails extends React.Component {
  render() {
    return (
      <Icon style={styles.icon} />
    );
  }
}
