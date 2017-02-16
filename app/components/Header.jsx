import React from 'react';

export default class Header extends React.Component {
  static propTypes = {
    header: React.PropTypes.string,
  };

  render() {
    return (
      <div>
        <h1 className="header">{this.props.header}</h1>
      </div>
    );
  }
}
