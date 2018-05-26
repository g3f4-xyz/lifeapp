import React from 'react';
import Icon from '@material-ui/icons/AttachFile';

const styles = {
  icon: {
    width: '80%',
    height: '80%',
  },
};

export default class AttachmentPreview extends React.Component {
  render() {
    return (
      <Icon style={styles.icon} />
    );
  }
}
