import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Date extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes, ...props } = this.props;

    return (
      <TextField
        id="date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    )
  }
}

export default withStyles(styles)(Date);
