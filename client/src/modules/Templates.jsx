import React from 'react';
import Icon from 'material-ui/svg-icons/action/view-module';

const styles = {
  icon: {
    width: '80%',
    height: '80%',
  },
};

export default class Templates extends React.Component {
  render() {
    return (
      <Icon style={styles.icon} />
    );
  }
}
