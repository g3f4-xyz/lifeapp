import React from 'react';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import DiskFull from 'material-ui/svg-icons/notification/disc-full';

const style = {
  margin: 0,
};
const ICONS = {
  eventNote: <EventNote />,
  diskFull: <DiskFull />,
};

export default class Icon extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
  };

  render() {
    const { type } = this.props;

    return ICONS[type];
  }
}
