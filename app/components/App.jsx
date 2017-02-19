import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };

  render() {
    return (
      <div>
        <h1>User tasks:</h1>
        <ul>
        {this.props.user.tasks.edges.map(edge =>
          <li key={edge.node.id}>{edge.node.title} ({edge.node.priority})</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        tasks(first: 5) {
          edges {
            node {
              id,
              title,
              priority,
            },
          },
        },
      }
    `,
  },
});
