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

const modules = [
  {
    id: 'Home',
    Component: Home,
    offset: {
      column: 1,
      row: 1,
    },
  },
  {
    id: 'Enter',
    Component: Enter,
    offset: {
      column: 1,
      row: 0,
    },
  },
  {
    id: 'TaskCreate',
    Component: TaskCreate,
    offset: {
      column: 0,
      row: 0,
    },
  },
  {
    id: 'TaskEdit',
    Component: TaskEdit,
    offset: {
      column: 2,
      row: 0,
    },
  },
  {
    id: 'TaskDetails',
    Component: TaskDetails,
    offset: {
      column: 2,
      row: 1,
    },
  },
  {
    id: 'Templates',
    Component: Templates,
    offset: {
      column: 0,
      row: 1,
    },
  },
  {
    id: 'Settings',
    Component: Settings,
    offset: {
      column: 1,
      row: 2,
    },
  },
  {
    id: 'AttachmentPreview',
    Component: AttachmentPreview,
    offset: {
      column: 2,
      row: 2,
    },
  },
  {
    id: 'CustomTemplate',
    Component: CustomTemplate,
    offset: {
      column: 0,
      row: 2,
    },
  },
];

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

    return (
      <div>
        <Grid
          modules={modules}
          handlers={{
            Home: () => ({
              home: this.props.app.home,
              onDetails: this.onDetails,
            }),
            TaskDetails: () => ({
              taskDetails: this.props.app.taskDetails,
              onDetails: this.onDetails,
            }),
          }}
          viewPortOffset={this.state.viewPortOffset}
          onModuleChange={this.onModuleChange}
        >
          <Home
            id="Home"
            home={this.props.app.home}
            onDetails={this.onDetails}
          />
          <Enter id="Enter" />
          <TaskCreate id="TaskCreate" />
          <TaskEdit id="TaskEdit" />
          <TaskDetails
            id="TaskDetails"
            taskDetails={this.props.app.taskDetails}
            onDetails={this.onDetails}
          />
          <Templates id="Templates" />
          <Settings id="Settings" />
          <AttachmentPreview id="AttachmentPreview" />
          <CustomTemplate id="CustomTemplate" />
        </Grid>
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
