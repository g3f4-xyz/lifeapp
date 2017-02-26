import React from 'react';

export default class Module extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        {tihs.props.children}
      </div>
    );
  }
}
