import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit * 2,
    flex: 1,
  },
});

class Input extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    ...TextField.propTypes,
  };

  render() {
    const { classes, className, info, ...props } = this.props;

    return (
      <TextField
        className={classnames(className, classes.textField)}
        helperText={info}
        fullWidth
        {...props}
      />
    )
  }
}

export default withStyles(styles)(Input);
