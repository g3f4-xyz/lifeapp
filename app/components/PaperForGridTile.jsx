// https://github.com/callemall/material-ui/issues/4239
import React from 'react';
import {Paper} from 'material-ui';
import _ from 'lodash';

class PaperForGridTile extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
  };

  render() {
    return (
        <Paper
          {...this.props}
          style={_.omit(this.props.style, [ 'muiPrepared' ])}
        />
    );
  }
}

export default PaperForGridTile;
