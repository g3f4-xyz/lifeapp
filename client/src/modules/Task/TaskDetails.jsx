import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Create from '@material-ui/icons/Create';
import { Label } from '../../components/index';

const styles = {
  label: {
    padding: 10,
  },
  labelContainer: {
    padding: 10,
    width: 200,
    textAlign: 'left',
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
  },
};

class TaskDetails extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
  };

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
            <div className={classes.labelContainer}>
              <Create />
              <Label class>{label}</Label>
            </div>
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
