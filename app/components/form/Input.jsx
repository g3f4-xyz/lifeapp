import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
};

class Input extends React.Component {
  static propTypes = {
    home: React.PropTypes.object,
    onDetails: React.PropTypes.func,
  };

  render() {
    return (
      <TextField {...{...this.props, style: { ...style, ...this.props.style } } }/>
    )
  }
}

export default Input;