import React from 'react';
import PropTypes from 'prop-types';

const style = {
  textAlign: 'center'
};

export default class Value extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div style={style}>{this.props.children}</div>
    );
  }
}
