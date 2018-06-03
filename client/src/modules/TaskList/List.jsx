import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class List extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    console.log(['List:render'], this.props)

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
