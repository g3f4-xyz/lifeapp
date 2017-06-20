import React from 'react';

const style = {
  display: 'inline-flex',
};

export default class Label extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div style={style}>{this.props.children}</div>
    );
  }
}
