// https://github.com/callemall/material-ui/issues/4239
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';

class RaisedButtonForGridTile extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
  };

  render() {
    return (
        <RaisedButton
          {...this.props}
          style={_.omit(this.props.style, [ 'muiPrepared' ])}
        />
    );
  }
}

export default RaisedButtonForGridTile;
