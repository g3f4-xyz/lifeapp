import React from 'react';

export default class Module extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  };

  render() {
    const { children, style } = this.props;

    return (
      <div style={style} >
        {children}
      </div>
    );
  }
}
