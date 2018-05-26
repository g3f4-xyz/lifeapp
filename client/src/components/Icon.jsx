import React from 'react';
import PropTypes from 'prop-types';
import EventNote from '@material-ui/icons/EventNote';
import DiskFull from '@material-ui/icons/Create';
import Create from '@material-ui/icons/Create';
import Traffic from '@material-ui/icons/Traffic';
import DoNotDisturb from '@material-ui/icons/DoNotDisturb';

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
