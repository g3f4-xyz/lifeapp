import React from 'react';
import Relay from 'react-relay';
import Tasks from '../containers/Tasks';

class Home extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };

  render() {
    return (
      <Tasks tasks={this.props.user.tasks}/>
    );
  }
}

export default Relay.createContainer(Home, {
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
