import React, { Component, Fragment } from 'react';
import { QueryRenderer, graphql } from 'react-relay'
import ErrorBoundary from './containers/ErrorBoundary';
import ResponsiveGrid from './containers/ResponsiveGrid';
import environment from './environment';
import Menu from './components/Menu';
import Loader from './components/Loader';
import TaskList from './modules/TaskList';
import TaskCreate from './modules/TaskCreate';
import TaskEdit from './modules/TaskEdit';
import TaskDetails from './modules/TaskDetails';
import TaskTypeList from './modules/TaskTypeList';

const originalLayouts = getFromLS('layouts') || {};

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value
      })
    );
  }
}

const MODULES_IDS = {
  TASK_LIST: 'TaskList',
  TASK_CREATE: 'TaskCreate',
  TASK_EDIT: 'TaskEdit',
  TASK_DETAILS: 'TaskDetails',
  TASK_TYPE_LIST: 'TaskTypeList',
};

const MODULES_COMPONENTS = {
  [MODULES_IDS.TASK_LIST]: TaskList,
  [MODULES_IDS.TASK_TYPE_LIST]: TaskTypeList,
  [MODULES_IDS.TASK_CREATE]: TaskCreate,
  [MODULES_IDS.TASK_EDIT]: TaskEdit,
  [MODULES_IDS.TASK_DETAILS]: TaskDetails,
};

class App extends Component {
  state = {
    selectedTaskId: null, // #TODO rozbudować scheme na froncie żeby przechowywała tą informacje
    visited: [MODULES_IDS.TASK_LIST],
    activeModuleId: MODULES_IDS.TASK_LIST,
    layouts: JSON.parse(JSON.stringify(originalLayouts)),
    gridView: false,
  };

  handlers = {
    [MODULES_IDS.TASK_LIST]: (props) => ({
      data: props.app && props.app.taskList,
      onAdd: () => {
        this.onModuleChange(MODULES_IDS.TASK_TYPE_LIST);
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
        this.onModuleChange(MODULES_IDS.TASK_CREATE, {
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

  moduleHandler(moduleId, props) {
    console.log(['moduleHandler'], moduleId);
    const handler = this.handlers[moduleId];

    if (handler) {
      return handler(props);
    }

    console.error(`No module handler provider for module ${moduleId}`);
  }

  onAdded = () => {
    this.onModuleChange(MODULES_IDS.TASK_LIST);
  };

  onDetails = selectedTaskId => {
    this.setState({ selectedTaskId });
    if (this.state.gridView) {
      this.setState({
        visited: this.state.visited.includes(MODULES_IDS.TASK_DETAILS)
          ? this.state.visited
          : [...this.state.visited, MODULES_IDS.TASK_DETAILS]
      })
    } else {
      this.onModuleChange(MODULES_IDS.TASK_DETAILS);
    }
  };

  onEdit = editTaskData => {
    console.log(['App:onEdit'], editTaskData);
    this.setState({ editTaskData });
    this.onModuleChange(MODULES_IDS.TASK_EDIT);
  };

  onEdited = () => {
    console.log(['App:onEdited']);
    this.setState({ editTaskData: null });
    this.onModuleChange(MODULES_IDS.TASK_LIST);
  };

  onModuleChange = (moduleId, extend = {}) => {
    const { visited } = this.state;

    this.setState({
      activeModuleId: moduleId,
      visited: visited.includes(moduleId) ? visited : [...visited, moduleId],
      gridView: false,
      ...extend
    });
  };

  onModuleClose = moduleId => {
    const { activeModuleId, visited } = this.state;

    this.setState({
      activeModuleId: activeModuleId === moduleId ? MODULES_IDS.TASK_LIST : activeModuleId,
      visited: visited.filter(id => id !== moduleId)
    });
  };

  resetGrid= () => {
    this.setState({ layouts: {} });
  };

  onLayoutChange = (layout, layouts) => {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  };

  toggleGridView = () => {
    this.setState({ gridView: !this.state.gridView })
  };

  renderMenu() {
    return (
      <div style={{ position: 'absolute', right: 10, zIndex: 9 }}>
        <Menu
          options={[{
            label: 'Log out',
            action: () => window.location.replace('logout'),
          }, {
            label: 'Show grid',
            action: this.toggleGridView,
            disabled: this.state.visited.length === 1,
          }, {
            label: 'Reset grid',
            action: this.resetGrid,
            visible: this.state.gridView,
          }]}
        />
      </div>
    );
  }

  renderModule(moduleId, props) {
    const { activeModuleId } = this.state;
    const Component = MODULES_COMPONENTS[activeModuleId];

    return (
      <Component moduleId={activeModuleId} key={activeModuleId} {...this.moduleHandler(activeModuleId, props)} />
    );
  }

  renderResponsiveGrid(props) {
    const { layouts, visited } = this.state;
    const modules = visited.map(moduleId => ({ moduleId, Component: MODULES_COMPONENTS[moduleId] }));

    return (
      <ResponsiveGrid
        layouts={layouts}
        onModuleClose={this.onModuleClose}
        onModuleChange={this.onModuleChange}
        onLayoutChange={this.onLayoutChange}
      >
        {modules.map(({ moduleId, Component }) => (
          <Component moduleId={moduleId} key={moduleId} {...this.moduleHandler(moduleId, props)} />
        ))}
      </ResponsiveGrid>
    );
  }

  renderApplication(props) {
    return (
      <Fragment>
        {this.renderMenu()}
        {this.state.gridView ? this.renderResponsiveGrid(props) : this.renderModule(MODULES_IDS.TASK_LIST, props)}
      </Fragment>
    )
  }

  render() {
    return (
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
              return this.renderApplication(props);
            }
            return (
              <Loader />
            );
          }}
        />
        </ErrorBoundary>
    );
  }
}

export default App;
