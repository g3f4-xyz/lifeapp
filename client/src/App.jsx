import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import shallowequal from 'shallowequal';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorBoundary from './containers/ErrorBoundary';
import Grid from './containers/Grid';
import environment from './environment';
import AttachmentPreview from './modules/AttachmentPreview';
import CustomTemplate from './modules/CustomTemplate';
import Enter from './modules/Enter';
import TaskList from './modules/TaskList';
import TaskCreate from './modules/TaskCreate';
import TaskEdit from './modules/TaskEdit';
import TaskDetails from './modules/TaskDetails';
import TaskTypeList from './modules/TaskTypeList';
import Settings from './modules/Settings';
import editTaskMutation from "./mutations/editTask";

const MODULES_IDS = {
  TASK_LIST: 'TaskList',
  ENTER: 'Enter',
  TASK_CREATE: 'TaskCreate',
  TASK_EDIT: 'TaskEdit',
  TASK_DETAILS: 'TaskDetails',
  TASK_TYPE_LIST: 'TaskTypeList',
  SETTINGS: 'Settings',
  ATTACHMENT_PREVIEW: 'AttachmentPreview',
  CUSTOM_TEMPLATE: 'CustomTemplate',
};
const MODULES = [
  {
    locked: true,
    id: MODULES_IDS.TASK_LIST,
    Component: TaskList,
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
    id: MODULES_IDS.TASK_TYPE_LIST,
    Component: TaskTypeList,
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
    visited: [MODULES_IDS.TASK_LIST],
    showGrid: false,
    viewPortOffset: {
      column: 1,
      row: 1,
    },
  };

  handlers = {
    [MODULES_IDS.TASK_LIST]: (props) => ({
      data: props.app && props.app.taskList,
      onAdd: () => {
        this.onModuleChange({
          column: 0,
          row: 1,
        });
      },
      onDetails: this.onDetails,
      onEdit: this.onEdit,
    }),
    [MODULES_IDS.TASK_TYPE_LIST]: (props) => ({
      data: props.app && props.app.taskTypeList,
      onAdd: () => {
        console.log(['onAdd']);
      },
      onSelect: (type) => {
        this.onModuleChange({
          column: 0,
          row: 0,
        }, {
          type,
        });
      },
    }),
    [MODULES_IDS.TASK_DETAILS]: (props) => ({
      selectedTaskId: this.state.selectedTaskId,
      data: props.app, // #TODO dodać wyświetlanie wielu szczegółów. Wymaga przebudowy Grida. Do tego czasu wyświetamy tylko ostatni z listy.
    }),
    [MODULES_IDS.TASK_CREATE]: (props) => ({
      onAdded: this.onAdded,
      data: props.app,
      type: this.state.type,
    }),
    [MODULES_IDS.TASK_EDIT]: (props) => ({
      data: this.state.editTaskData,
      onEdited: this.onEdited,
      environment,
      parentId: props.app.taskList.id,
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

  onEdit = editTaskData => {
    console.log(['App:onEdit'], editTaskData);
    this.setState({ editTaskData });
    this.onModuleChange({
      column: 2,
      row: 0,
    });
  };

  onEdited = () => {
    console.log(['App:onEdited']);
    this.setState({ editTaskData: null });
    this.onModuleChange({
      column: 1,
      row: 1,
    });
  };

  onModuleChange = (viewPortOffset, extend = {}) => {
    const { id } = MODULES.find(({ offset }) => shallowequal(viewPortOffset, offset));
    const { visited } = this.state;

    this.setState({
      visited: visited.includes(id) ? visited : [...visited, id],
      viewPortOffset,
      showGrid: false,
      ...extend
    });
  };

  onModuleClose = moduleId => {
    this.setState({
      visited: this.state.visited.filter(id => id !== moduleId)
    });
  };

  renderGrid(props) {
    const modules = MODULES.map(({ id, Component, offset, inViewPort, locked }) => ({
      id,
      offset,
      inViewPort,
      locked,
      node: <Component {...(this.handlers[id] ? this.handlers[id](props) : {})} />,
    }));

    return (
      <Grid
        onModuleClose={this.onModuleClose}
        dynamic
        showGrid={this.state.showGrid}
        modules={modules}
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
              query AppQuery (
                $count: Int!
                $cursor: String
              ) {
                app {
                  taskList {
                   id
                    ...TaskList
                  }
                  taskTypeList {
                    ...TaskTypeList
                  }
                  ...TaskDetails
                  ...TaskCreate
                }
              }
            `}
            variables={{
              count: 2,
              type: null,
              ids: []
            }}
            render={({error, props}) => {
              if (error) {
                return <div>{JSON.stringify(error)}</div>;
              } else if (props) {
                return (
                  <div>
                    <div style={{ position: 'absolute', right: 10, zIndex: 9 }}>
                      <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="Logout" onClick={(() => window.location.replace('logout'))} />
                      <MenuItem disabled={this.state.showGrid || this.state.visited.length === 1} primaryText="Show grid" onClick={(() => this.setState({ showGrid: true }))} />
                    </IconMenu>
                  </div>
                  {this.renderGrid(props)}
                </div>
                );
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
