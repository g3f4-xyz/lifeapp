import React from 'react';
import Icon from 'material-ui/svg-icons/notification/event-available';

const styles = {
  icon: {
    width: '80%',
    height: '80%',
  },
};

export default class TaskCreate extends React.Component {
  render() {
    return (
      <Icon style={styles.icon} />
    );
  }
}
