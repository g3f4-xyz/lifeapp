import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Tasks from '../containers/Tasks';

const pageSize = 10;

class Home extends React.Component {
  static propTypes = {
    home: React.PropTypes.object,
    onDetails: React.PropTypes.func,
    onTaskCreate: React.PropTypes.func,
  };

  componentDidMount() {
    console.log(['Home:componentDidMount']);
  }

  onMore = () => this.props.relay.setVariables({
    pageSize: this.props.relay.variables.pageSize + pageSize
  });

  onTaskCreate = () => {
    if (this.props.onTaskCreate) {
      this.props.onTaskCreate();
    }
  };

  render() {
    return (
      <div>
        <Tasks
          tasks={this.props.home.tasks}
          onMore={this.onMore}
          onSelect={this.props.onDetails}
        />
        <FlatButton
          icon={<AddCircle />}
          style={{
            zIndex: 9,
            position: 'absolute',
            bottom: 0,
            color: '#8BC34A',
            left: 0,
            zoom: 3,
          }}
          onClick={this.onTaskCreate}
        />
      </div>
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
