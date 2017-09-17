import React from 'react';
import PropTypes from 'prop-types';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import DiskFull from 'material-ui/svg-icons/notification/disc-full';

const ICONS = {
  eventNote: <EventNote />,
  diskFull: <DiskFull />,
};

export default class Icon extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  };

  render() {
    const { type } = this.props;

    return ICONS[type];
  }
}
