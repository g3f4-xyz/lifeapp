import React from 'react';
import classnames from 'classnames';
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

class Input extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    ...TextField.propTypes,
  };

  render() {
    const { classes, className, ...props } = this.props;

    return (
      <TextField
        className={classnames(className, classes.textField)}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        {...props}
      />
    )
  }
}

export default withStyles(styles)(Input);
