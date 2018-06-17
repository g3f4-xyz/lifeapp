import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import SwitchComponent from '@material-ui/core/Switch';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 2,
    flex: 1,
  },
});

class Switch extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes, id, fieldId, label, checked, onChange } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <FormControlLabel
          id={id}
          control={
            <SwitchComponent
              checked={checked}
              value={fieldId}
              onChange={onChange}
            />
          }
          label={label}
        />
      </FormControl>
    )
  }
}

export default withStyles(styles)(Switch);
