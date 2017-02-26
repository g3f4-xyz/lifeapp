import React from 'react';
import Relay from 'react-relay';
import Home from '../modules/Home';

class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.shape({
      user: React.PropTypes.object,
    }),
  };

  render() {
    return (
      <div>
        <Home user={this.props.app.user} />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        user {
          ${Home.getFragment('user')},
        }
      }
    `,
  },
});
