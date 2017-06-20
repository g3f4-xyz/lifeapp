import React from 'react';
import Relay from 'react-relay';
import AttachmentPreview from '../modules/AttachmentPreview';
import CustomTemplate from '../modules/CustomTemplate';
import Enter from '../modules/Enter';
import Home from '../modules/Home';
import TaskCreate from '../modules/TaskCreate';
import TaskEdit from '../modules/TaskEdit';
import TaskDetails from '../modules/TaskDetails';
import Templates from '../modules/Templates';
import Settings from '../modules/Settings';
import Grid from './Grid';

class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.shape({
      home: React.PropTypes.object,
      taskDetails: React.PropTypes.object,
    }),
  };

  state = {
    viewPortOffset: {
      column: 1,
      row: 1,
    },
  };

  onDetails = (selectedTaskId) => {
    this.props.relay.setVariables({ selectedTaskId }, () => {
      this.onModuleChange({
        column: 2,
        row: 1,
      })
    });
  };

  onModuleChange = (viewPortOffset) => this.setState({ viewPortOffset });

  render() {
    const modules = [
      {
        desc: 'Home module',
        node: <Home
          home={this.props.app.home}
          onDetails={this.onDetails}
        />,
        offset: {
          column: 1,
          row: 1,
        },
      },
      {
        desc: 'Enter module',
        node: <Enter />,
        offset: {
          column: 1,
          row: 0,
        },
      },
      {
        desc: 'TaskCreate module',
        node: <TaskCreate />,
        offset: {
          column: 0,
          row: 0,
        },
      },
      {
        desc: 'TaskEdit module',
        node: <TaskEdit />,
        offset: {
          column: 2,
          row: 0,
        },
      },
      {
        desc: 'TaskDetails module',
        node: <TaskDetails
          taskDetails={this.props.app.taskDetails}
          onDetails={this.onDetails}
        />,
        offset: {
          column: 2,
          row: 1,
        },
      },
      {
        desc: 'Templates module',
        node: <Templates />,
        offset: {
          column: 0,
          row: 1,
        },
      },
      {
        desc: 'Settings module',
        node: <Settings />,
        offset: {
          column: 1,
          row: 2,
        },
      },
      {
        desc: 'AttachmentPreview module',
        node: <AttachmentPreview />,
        offset: {
          column: 2,
          row: 2,
        },
      },
      {
        desc: 'CustomTemplate module',
        node: <CustomTemplate />,
        offset: {
          column: 0,
          row: 2,
        },
      },
    ];

    return (
      <div>
        <Grid
          modules={modules}
          viewPortOffset={this.state.viewPortOffset}
          onModuleChange={this.onModuleChange}
        />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    selectedTaskId: null,
  },
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        home {
          ${Home.getFragment('home')},
        }
        taskDetails (id: $selectedTaskId) {
          ${TaskDetails.getFragment('taskDetails')},
        }
      }
    `,
  },
});
