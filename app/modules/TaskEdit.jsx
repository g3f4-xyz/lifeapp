import React from 'react';
import Icon from 'material-ui/svg-icons/notification/event-busy';

const styles = {
  icon: {
    width: '80%',
    height: '80%',
  },
};

export default class TaskEdit extends React.Component {
  render() {
    return (
      <Icon style={styles.icon} />
    );
  }
}
