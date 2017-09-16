// https://github.com/callemall/material-ui/issues/4239
import React from 'react';
import PropTypes from 'prop-types';
import {Paper} from 'material-ui';
import _ from 'lodash';

class PaperForGridTile extends React.Component {
  static propTypes = {
    style: PropTypes.object,
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
