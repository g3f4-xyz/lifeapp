import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';

const style = {
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
};

class Date extends React.Component {
  static propTypes = {
    home: PropTypes.object,
    onDetails: PropTypes.func,
  };

  render() {
    return (
      <DatePicker {...{...this.props, style: { ...style, ...this.props.style } } }/>
    )
  }
}

export default Date;