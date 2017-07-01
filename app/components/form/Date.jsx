import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const style = {
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
};

class Date extends React.Component {
  static propTypes = {
    home: React.PropTypes.object,
    onDetails: React.PropTypes.func,
  };

  render() {
    return (
      <DatePicker {...{...this.props, style: { ...style, ...this.props.style } } }/>
    )
  }
}

export default Date;