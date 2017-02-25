import React from 'react';
import Relay from 'react-relay';

class Tasks extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.object,
  };

  render() {
    return (
      <div>
        <h1>User tasks:</h1>
        <ul>
        {this.props.tasks.edges.map(edge =>
          <li key={edge.node.id}>{edge.node.title} ({edge.node.priority})</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(Tasks, {
  fragments: {
    tasks: () => Relay.QL`
      fragment on TaskConnection {
        edges {
          node {
            id,
            title,
            priority,
          },
        },
      }
    `,
  },
});
