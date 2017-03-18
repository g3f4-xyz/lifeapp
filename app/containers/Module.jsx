import React from 'react';

export default class Module extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.props.children}
      </div>
    );
  }
}
