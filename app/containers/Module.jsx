import React from 'react';

const styles = {
  textAlign: 'center',
  padding: '10px',
  overflow: 'hidden',
};

export default class Module extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  };

  render() {
    const { children, style } = this.props;

    return (
      <div style={{ ...style, ...styles }} >
        {children}
      </div>
    );
  }
}
