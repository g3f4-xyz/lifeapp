import MaterialUISlider from 'material-ui/Slider';
import React from 'react';
import PropTypes from 'prop-types';

const style = {
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
};

class Slider extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    options: PropTypes.array,
    onChange: PropTypes.func,
  };

  onChange = (e, value) => {
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  };

  render() {
    return (
      <MaterialUISlider
        style={{ ...style, ...this.props.style }}
        onChange={this.onChange}
        value={this.props.value}
      />
    )
  }
}

export default Slider;