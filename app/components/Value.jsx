import React from 'react';

const style = {
  textAlign: 'center'
};

export default class Value extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div style={style}>{this.props.children}</div>
    );
  }
}
