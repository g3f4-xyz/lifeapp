import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SelectField from '@material-ui/core/Select';

class Select extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    info: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
  };

  render() {
    const { info, id, label, ...props } = this.props;

    return (
      <Fragment>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <SelectField
          {...props}
          inputProps={{
            name: info,
            id,
          }}
        >
          {this.props.options.map(({ value, text }, key) => (
            <MenuItem
              key={key}
              value={value}
            >{text}</MenuItem>
          ))}
        </SelectField>
      </Fragment>
    )
  }
}

export default Select;
