import React from 'react';
import Relay from 'react-relay';
import Tasks from '../containers/Tasks';

class Home extends React.Component {
  static propTypes = {
    home: React.PropTypes.object,
  };

  render() {
    return (
      <Tasks tasks={this.props.home.tasks}/>
    );
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    home: () => Relay.QL`
      fragment on Home {
        tasks(first: 5) {
          ${Tasks.getFragment('tasks')},
        },
      }
    `,
  },
});
