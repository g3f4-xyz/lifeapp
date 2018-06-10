import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import SelectField from '@material-ui/core/Select';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 2,
    flex: 1,
  },
});


class Select extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    options: PropTypes.array,
    fieldId: PropTypes.string,
    id: PropTypes.string,
    info: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    ...SelectField.propTypes,
  };

  render() {
    const { classes, fieldId, info, id, label, options, ...selectProps } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <SelectField
          {...selectProps}
          input={<Input name={fieldId} id={id} />}
        >
        {options.map(({ value, text }, key) => (
          <MenuItem
            key={key}
            value={value}
          >{text}</MenuItem>
        ))}
        </SelectField>
        <FormHelperText>{info}</FormHelperText>
      </FormControl>
    )
  }
}

export default withStyles(styles)(Select);
