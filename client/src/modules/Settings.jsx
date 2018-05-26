import React from 'react';
import Icon from '@material-ui/icons/Settings';

const styles = {
  icon: {
    width: '80%',
    height: '80%',
  },
};

export default class Settings extends React.Component {
  render() {
    return (
      <Icon style={styles.icon} />
    );
  }
}
