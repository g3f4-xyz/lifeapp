import React from 'react';
import Relay from 'react-relay';
import Tasks from './Tasks';

class App extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };

  render() {
    return (
      <div>
        <Tasks tasks={this.props.user.tasks} />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        tasks(first: 5) {
          ${Tasks.getFragment('tasks')},
        },
      }
    `,
  },
});
