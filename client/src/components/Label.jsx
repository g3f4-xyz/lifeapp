import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: 'inline-flex',
};

export default class Label extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div style={style}>{this.props.children}</div>
    );
  }
}
