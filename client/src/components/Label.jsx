import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: 'inline-flex',
};

export default class Label extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  };

  render() {
    return (
      <div style={{ ...style, ...this.props.style }}>{this.props.children}</div>
    );
  }
}
