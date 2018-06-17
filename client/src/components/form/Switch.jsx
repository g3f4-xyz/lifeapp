import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import SwitchComponent from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

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
      <FormGroup>
        <FormControlLabel
          className={classes.formControl}
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
      </FormGroup>
    )
  }
}

export default withStyles(styles)(Switch);
