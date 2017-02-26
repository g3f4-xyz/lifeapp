import React from 'react';
import Relay from 'react-relay';
import Home from '../modules/Home';

class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.shape({
      home: React.PropTypes.object,
    }),
  };

  render() {
    return (
      <div>
        <Home home={this.props.app.home} />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        home {
          ${Home.getFragment('home')},
        }
      }
    `,
  },
});
