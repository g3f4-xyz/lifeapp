import React from 'react';
import PropTypes from 'prop-types';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import DiskFull from 'material-ui/svg-icons/content/create';
import Create from 'material-ui/svg-icons/content/create';
import LiveHelp from 'material-ui/svg-icons/communication/live-help';
import Traffic from 'material-ui/svg-icons/maps/traffic';
import DoNotDisturb from 'material-ui/svg-icons/notification/do-not-disturb';

const ICONS = {
  eventNote: EventNote,
  diskFull: DiskFull,
  create: Create,
  traffic: Traffic,
  NONE: DoNotDisturb,
};

export default class Icon extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  };

  render() {
    const { type, ...props } = this.props;
    const icon = ICONS[type] || ICONS.NONE;

    return <icon {...props} />;
  }
}
