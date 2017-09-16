import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
};

class Select extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
  };

  onChange = (e, index) => {
    if (this.props.onChange) {
      this.props.onChange(e, this.props.options[index].value);
    }
  };

  render() {
    return (
      <SelectField
        style={{ ...style, ...this.props.style }}
        onChange={this.onChange}
        value={this.props.value}
      >
        {this.props.options.map(({ value, text }, key) => (
          <MenuItem
            key={key}
            value={value}
            primaryText={text}
          />
        ))}
      </SelectField>
    )
  }
}

export default Select;