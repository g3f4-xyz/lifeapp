import React from 'react';
import Paper from 'material-ui/Paper';

export default class Module extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  };

  render() {
    const { children, style } = this.props;

    return (
      <Paper style={style} zDepth={5} >
        {children}
      </Paper>
    );
  }
}
