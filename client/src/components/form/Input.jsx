import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const style = {
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
};

class Input extends React.Component {
  static propTypes = {
    home: PropTypes.object,
    onDetails: PropTypes.func,
  };

  render() {
    return (
      <TextField {...{...this.props, style: { ...style, ...this.props.style } } }/>
    )
  }
}

export default Input;