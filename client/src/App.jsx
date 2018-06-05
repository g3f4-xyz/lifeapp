import React, { Component, Fragment } from 'react';
import { QueryRenderer, graphql } from 'react-relay'
import ErrorBoundary from './containers/ErrorBoundary';
import ResponsiveGrid from './containers/ResponsiveGrid';
import environment from './environment';
import Menu from './components/Menu';
import Loader from './components/Loader';
import Task from './modules/Task/Task';
import TaskList from './modules/TaskList/TaskList';
import TaskTypeList from './modules/TaskTypeList/TaskTypeList';

const originalLayouts = getFromLS('layouts') || {};

const MODULES_IDS = {
  TASK: 'task',
  TASK_LIST: 'taskList',
  TASK_TYPE_LIST: 'taskTypeList',
};

const MODULES_COMPONENTS = {
  [MODULES_IDS.TASK]: Task,
  [MODULES_IDS.TASK_LIST]: TaskList,
  [MODULES_IDS.TASK_TYPE_LIST]: TaskTypeList,
};
const APP_MODULES_IDS = [MODULES_IDS.TASK_LIST, MODULES_IDS.TASK_TYPE_LIST];

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

class App extends Component {
  state = {
    activeModuleId: null,
    openedTasksData: [],
    appOpenedModules: [MODULES_IDS.TASK_LIST],
    layouts: JSON.parse(JSON.stringify(originalLayouts)),
    gridView: true,
  };

  handlers = {
    [MODULES_IDS.TASK]: ({ editMode, ...data }, taskListId) => ({
      moduleId: data.id,
      editMode,
      data,
      taskListId,
      onSave: taskId => {
        console.log(['handlers:task:onSave']);

        this.setState(({ openedTasksData }) => ({
          openedTasksData: openedTasksData.filter(({ id }) => id === data.id),
        }));
        this.onModuleChange(MODULES_IDS.TASK_LIST);
        this.closeModule(taskId);
      },
    }),
    [MODULES_IDS.TASK_LIST]: (data) => ({
      moduleId: MODULES_IDS.TASK_LIST,
      data,
      onAdd: () => {
        console.log(['handlers:taskList:onAdd']);

        this.onModuleChange(MODULES_IDS.TASK_TYPE_LIST);
      },
      onDetails: (taskData) => {
        console.log(['handlers:taskList:onDetails'], taskData);

        this.setState({
          openedTasksData: [
            ...this.state.openedTasksData,
            {
              ...taskData,
              editMode: false,
            }
          ]
        });
        if (!this.state.gridView) {
          this.onModuleChange(taskData.id);
        }
      },
      onEdit: (taskData) => {
        console.log(['handlers:taskList:onEdit'], taskData);
        const { openedTasksData } = this.state;

        this.setState({
          activeModuleId: taskData.id,
          gridView: false,
          openedTasksData: [
            ...openedTasksData,
            {
              ...taskData,
              editMode: true,
            }
          ]
        });
      },
    }),
    [MODULES_IDS.TASK_TYPE_LIST]: data => ({
      moduleId: MODULES_IDS.TASK_TYPE_LIST,
      data,
      onAdd: () => {
        console.log(['onAdd']);
      },
      onSelect: type => {
        console.log(['handlers:taskTypeList:type'], type);
        const temporaryId = Date.now();

        this.setState({
          activeModuleId: temporaryId,
          openedTasksData: [
            ...this.state.openedTasksData,
            {
              temporaryId,
              isNew: true,
              editMode: true,
              ...type,
            }
          ]
        });
      },
    }),
  };

  moduleHandler(moduleId, data, taskListId) {
    const handler = this.handlers[moduleId];

    if (handler) {
      return handler(data, taskListId);
    }

    console.error(`No module handler provider for module ${moduleId}`);
  }

  onModuleChange = (activeModuleId) => {
    console.log(['App:onModuleChange:activeModuleId'], activeModuleId);

    const { appOpenedModules } = this.state;
    const isApplicationModule = APP_MODULES_IDS.includes(activeModuleId);
    const setAppOpenedModules = () => {
      return appOpenedModules.includes(activeModuleId)
        ? appOpenedModules
        : [...appOpenedModules, activeModuleId];
    };

    this.setState({
      activeModuleId,
      gridView: false,
      appOpenedModules: isApplicationModule
        ? setAppOpenedModules()
        : appOpenedModules,
    });
  };

  closeModule = moduleId => {
    console.log(['App:closeModule:moduleId'], moduleId);
    const { appOpenedModules, openedTasksData } = this.state;

    if (APP_MODULES_IDS.includes(moduleId)) {
      this.setState({
        appOpenedModuleIds: appOpenedModules.filter(id => id !== moduleId),
      });
    } else {
      this.setState({
        appOpenedModuleIds: appOpenedModules.filter(id => id !== moduleId),
        openedTasksData: openedTasksData.filter(({ id }) => id !== moduleId),
      });
    }
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
            disabled: this.state.appOpenedModules.length + this.state.openedTasksData.length < 2,
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
    const { activeModuleId, openedTasksData } = this.state;
    const taskListId = props.app.taskList.id;
    const taskData = openedTasksData.find(({ id, temporaryId }) => id === activeModuleId || temporaryId === activeModuleId);
    const isApplicationModule = APP_MODULES_IDS.includes(moduleId);
    const Component = isApplicationModule ? MODULES_COMPONENTS[activeModuleId] : MODULES_COMPONENTS[MODULES_IDS.TASK];
    const handlerName = isApplicationModule ? moduleId : MODULES_IDS.TASK;
    const data = isApplicationModule ? props.app[activeModuleId] : taskData;

    return (
      <Component
        key={activeModuleId}
        {...this.moduleHandler(handlerName, data, taskListId)}
      />
    );
  }

  renderApplicationModules(props) {
    const { appOpenedModules } = this.state;

    return appOpenedModules.map(moduleId => {
      const Component = MODULES_COMPONENTS[moduleId];

      return (
        <Component key={moduleId} {...this.moduleHandler(moduleId, props.app[moduleId])} />
      );
    });
  }

  renderTaskModules() {
    const { openedTasksData } = this.state;

    return openedTasksData.map(data => (
      <Task key={data.id} {...this.moduleHandler(MODULES_IDS.TASK, data)} />
    ));
  }

  renderResponsiveGrid(props) {
    const { layouts } = this.state;

    return (
      <ResponsiveGrid
        layouts={layouts}
        onModuleClose={this.closeModule}
        onModuleChange={this.onModuleChange}
        onLayoutChange={this.onLayoutChange}
      >
        {this.renderApplicationModules(props)}
        {this.renderTaskModules()}
      </ResponsiveGrid>
    );
  }

  renderApplication(props) {
    return (
      <Fragment>
        {this.renderMenu()}
        {this.state.gridView ? this.renderResponsiveGrid(props) : this.renderModule(this.state.activeModuleId, props)}
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
