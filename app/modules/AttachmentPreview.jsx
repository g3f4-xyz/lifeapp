import React from 'react';
import Icon from 'material-ui/svg-icons/editor/attach-file';

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
