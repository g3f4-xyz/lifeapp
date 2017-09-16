import React from 'react';
import Icon from 'material-ui/svg-icons/action/fingerprint';

const styles = {
  icon: {
    width: '80%',
    height: '80%',
  },
};

export default class Enter extends React.Component {
  render() {
    return (
      <Icon style={styles.icon} />
    );
  }
}
