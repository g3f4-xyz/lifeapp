import React from 'react';

const styles = {
  textAlign: 'center',
  margin: '2%',
  overflow: 'auto',
  height: '96%',
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
