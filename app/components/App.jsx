import React from 'react';
import Header from './Header';

export default class App extends React.Component {
  state = { header: 'Welcome to LifeApp' };

  render() {
    return (
      <div>
        <Header header={this.state.header} />
      </div>
    );
  }
}
