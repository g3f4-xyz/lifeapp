import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BatteryAlertIcon from '@material-ui/icons/BatteryAlert';
import CreateIcon from '@material-ui/icons/Create';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TitleIcon from '@material-ui/icons/Title';
import PersonIcon from '@material-ui/icons/Person';
import { Label } from '../../components/index';

const ICONS = {
  DATE: NotificationsActiveIcon,
  NOTE: EventNoteIcon,
  PRIORITY: PriorityHighIcon,
  TITLE: TitleIcon,
  STATUS: BatteryAlertIcon,
  PERSON: PersonIcon,
  LOCATION: PersonPinCircleIcon,
};

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
  },
  label: {
    padding: 10,
    width: 200,
  },
  value: {
    padding: 20,
  },
  valueContainer: {
    width: '80%',
    textAlign: 'right',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
});

class TaskDetails extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
  };

  renderIcon(fieldId) {
    const Icon = ICONS[fieldId] || CreateIcon;

    return (
      <Icon className={this.props.classes.icon} />
    )
  }

  render() {
    console.log(['TaskDetails:render'], this.props);
    const { classes } = this.props;
    const { taskType, fields } = this.props.data;

    return (
      <div className={classes.root}>
        <h1>{taskType}</h1>
      {fields
        .map(item => item) // propsy są immutable, sortowanie modyfikuje oryginalną tablicę
        .sort((a, b) => a.order - b.order)
        .map(({ fieldId, label, type, meta: { options }, value }) => (
        <div key={fieldId}>
          <Paper className={classes.row}>
            {this.renderIcon(fieldId)}
            <Label className={classes.label} class>{label}</Label>
            <div className={classes.valueContainer}>
              <div className={classes.value}>{value.text || value.number || value.id}</div>
            </div>
          </Paper>
        </div>
      ))}
      </div>
    );
  }
}

export default withStyles(styles)(TaskDetails);
