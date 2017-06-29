import React from 'react';
import Relay from 'react-relay';
import Tasks from '../containers/Tasks';

const pageSize = 10;

class Home extends React.Component {
  static propTypes = {
    home: React.PropTypes.object,
    onDetails: React.PropTypes.func,
  };

  componentDidMount() {
    console.log(['Home.componentDidMount'])
  }

  onMore = () => this.props.relay.setVariables({
    pageSize: this.props.relay.variables.pageSize + pageSize
  });

  render() {
    return (
      <Tasks
        tasks={this.props.home.tasks}
        onMore={this.onMore}
        onSelect={this.props.onDetails}
      />
    );
  }
}

export default Relay.createContainer(Home, {
  initialVariables: {
    pageSize: pageSize
  },
  fragments: {
    home: () => Relay.QL`
      fragment on Home {
        tasks(first: $pageSize) {
          ${Tasks.getFragment('tasks')},
        },
      }
    `,
  },
});
