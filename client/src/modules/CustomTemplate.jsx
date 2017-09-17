import React from 'react';
import Icon from 'material-ui/svg-icons/action/date-range';

const styles = {
  icon: {
    width: '80%',
    height: '80%',
  },
};

export default class CustomTemplate extends React.Component {
  render() {
    return (
      <Icon style={styles.icon} />
    );
  }
}
