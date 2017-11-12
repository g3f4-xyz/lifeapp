import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import shallowequal from 'shallowequal';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorBoundary from './ErrorBoundary';
import Grid from './Grid';
import environment from '../environment';
import AttachmentPreview from '../modules/AttachmentPreview';
import CustomTemplate from '../modules/CustomTemplate';
import Enter from '../modules/Enter';
import Home from '../modules/Home';
import TaskCreate from '../modules/TaskCreate';
import TaskEdit from '../modules/TaskEdit';
import TaskDetails from '../modules/TaskDetails';
import Templates from '../modules/Templates';
import Settings from '../modules/Settings';

const MODULES_IDS = {
  HOME: 'Home',
  ENTER: 'Enter',
  TASK_CREATE: 'TaskCreate',
  TASK_EDIT: 'TaskEdit',
  TASK_DETAILS: 'TaskDetails',
  TEMPLATES: 'Templates',
  SETTINGS: 'Settings',
  ATTACHMENT_PREVIEW: 'AttachmentPreview',
  CUSTOM_TEMPLATE: 'CustomTemplate',
};
const MODULES = [
  {
    locked: true,
    id: MODULES_IDS.HOME,
    Component: Home,
    offset: {
      column: 1,
      row: 1,
    },
  },
  {
    locked: false,
    id: MODULES_IDS.ENTER,
    Component: Enter,
    offset: {
      column: 1,
      row: 0,
    },
  },
  {
    locked: false,
    id: MODULES_IDS.TASK_CREATE,
    Component: TaskCreate,
    offset: {
      column: 0,
      row: 0,
    },
  },
  {
    locked: false,
    id: MODULES_IDS.TASK_EDIT,
    Component: TaskEdit,
    offset: {
      column: 2,
      row: 0,
    },
  },
  {
    locked: false,
    id: MODULES_IDS.TASK_DETAILS,
    Component: TaskDetails,
    offset: {
      column: 2,
      row: 1,
    },
  },
  {
    locked: false,
    id: MODULES_IDS.TEMPLATES,
    Component: Templates,
    offset: {
      column: 0,
      row: 1,
    },
  },
  {
    locked: false,
    id: MODULES_IDS.SETTINGS,
    Component: Settings,
    offset: {
      column: 1,
      row: 2,
    },
  },
  {
    locked: false,
    id: MODULES_IDS.ATTACHMENT_PREVIEW,
    Component: AttachmentPreview,
    offset: {
      column: 2,
      row: 2,
    },
  },
  {
    locked: false,
    id: MODULES_IDS.CUSTOM_TEMPLATE,
    Component: CustomTemplate,
    offset: {
      column: 0,
      row: 2,
    },
  },
];

class App extends Component {
  state = {
    selectedTaskId: null, // #TODO rozbudować scheme na froncie żeby przechowywała tą informacje
    visited: [MODULES_IDS.HOME],
    viewPortOffset: {
      column: 1,
      row: 1,
    },
  };

  handlers = {
    [MODULES_IDS.HOME]: () => {
      return {
        data: this.data.app,
        onAdd: () => {
          this.onModuleChange({
            column: 0,
            row: 0,
          });
        },
        onDetails: this.onDetails,
      }
    },
    [MODULES_IDS.TASK_DETAILS]: () => ({
      selectedTaskId: this.state.selectedTaskId
    }),
    [MODULES_IDS.TASK_CREATE]: () => ({
      onAdded: this.onAdded
    }),
  };

  onAdded = () => {
    this.onModuleChange({
      column: 1,
      row: 1,
    });
  };

  onDetails = selectedTaskId => {
    this.setState({ selectedTaskId });
    this.onModuleChange({
      column: 2,
      row: 1,
    });
  };

  onModuleChange = viewPortOffset => {
    const { id } = MODULES.find(({ offset }) => shallowequal(viewPortOffset, offset));
    const { visited } = this.state;

    this.setState({
      visited: visited.includes(id) ? visited : [...visited, id],
      viewPortOffset,
    });
  };

  onModuleClose = moduleId => {
    this.setState({
      visited: this.state.visited.filter(id => id !== moduleId)
    });
  };

  renderGrid() {
    return (
      <Grid
        onModuleClose={this.onModuleClose}
        dynamic
        modules={MODULES}
        handlers={this.handlers}
        visited={this.state.visited}
        viewPortOffset={this.state.viewPortOffset}
        onModuleChange={this.onModuleChange}
      />
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <ErrorBoundary>
          <QueryRenderer
            environment={environment}
            query={graphql`
              query AppQuery(
                $count: Int!
                $cursor: String
              ) {
                app {
                  ...Home
                  home {
                    id
                  }
                }
              }
            `}
            variables={{
              count: 5,
            }}
            render={({error, props}) => {
              if (error) {
                return <div>{JSON.stringify(error)}</div>;
              } else if (props) {
                this.data = props;

                return this.renderGrid();
              }
              return (
                <CircularProgress
                  style={{
                    margin: 'auto',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                  size={180}
                  thickness={15}
                />
              );
            }}
          />
          </ErrorBoundary>
      </MuiThemeProvider>
    );
  }
}

export default App;