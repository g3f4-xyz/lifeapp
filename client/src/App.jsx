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
    activeModuleId: MODULES_IDS.TASK_LIST,
    openedTasksData: {},
    appOpenedModules: [MODULES_IDS.TASK_LIST],
    layouts: JSON.parse(JSON.stringify(originalLayouts)),
    gridView: false,
    gridViewLocked: false,
  };

  handlers = {
    [MODULES_IDS.TASK]: ({ data, moduleId }, taskListId) => ({
      data,
      moduleId,
      taskListId,
      onSave: () => {
        console.log(['handlers:task:onSave']);
        const { gridView } = this.state;
        const openedTasksData = [...this.state.openedTasksData];
        delete openedTasksData[moduleId];

        this.setState({ openedTasksData });
        !gridView && this.onModuleChange(MODULES_IDS.TASK_LIST);
        this.onModuleClose(moduleId);
      },
      onTaskChange: data => {
        const openedTasksData = { ...this.state.openedTasksData };
        openedTasksData[moduleId].data = data;
        this.setState({openedTasksData});
      }
    }),
    [MODULES_IDS.TASK_LIST]: (data) => ({
      moduleId: MODULES_IDS.TASK_LIST,
      data,
      onAdd: () => {
        console.log(['handlers:taskList:onAdd']);

        this.onModuleChange(MODULES_IDS.TASK_TYPE_LIST);
      },
      onDetails: (taskData) => {
        const { gridViewLocked, openedTasksData } = this.state;
        console.log(['handlers:taskList:onDetails'], taskData);
        const moduleId = `${taskData.id}:details`;
        console.log(['handlers:taskList:moduleId'], moduleId);
        const isOpened = openedTasksData[moduleId];

        !isOpened && this.setState({
          activeModuleId: moduleId,
          gridView: !gridViewLocked,
          openedTasksData: {
            ...openedTasksData,
            [moduleId]: {
              moduleId,
              data: {
                ...taskData,
                editMode: false,
              }
            }
          }
        });
      },
      onEdit: (taskData) => {
        console.log(['handlers:taskList:onEdit'], taskData);
        const { gridViewLocked, openedTasksData } = this.state;
        const moduleId = `${taskData.id}:edited`;
        console.log(['handlers:taskList:moduleId'], moduleId);
        const isOpened = openedTasksData[moduleId];

        !isOpened && this.setState({
          activeModuleId: moduleId,
          gridView: !gridViewLocked,
          openedTasksData: {
            ...openedTasksData,
            [moduleId]: {
              moduleId,
              data: {
                ...taskData,
                editMode: true,
              }
            }
          }
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
        const { gridView, gridViewLocked, openedTasksData } = this.state;
        console.log(['handlers:taskTypeList:type'], type);
        const temporaryId = Date.now();

        this.setState({
          activeModuleId: temporaryId,
          gridView: gridView ? gridView : gridViewLocked,
          openedTasksData: {
            ...openedTasksData,
            [temporaryId]: {
              moduleId: temporaryId,
              data: {
                moduleId: temporaryId,
                temporaryId,
                isNew: true,
                editMode: true,
                ...type,
              }
            }
          }
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

  onModuleClose = moduleId => {
    console.log(['App:onModuleClose:moduleId'], moduleId);
    const { appOpenedModules } = this.state;

    if (APP_MODULES_IDS.includes(moduleId)) {
      this.setState({
        appOpenedModuleIds: appOpenedModules.filter(id => id !== moduleId),
      });
    } else {
      const openedTasksData = { ...this.state.openedTasksData };

      delete openedTasksData[moduleId];

      this.setState({ openedTasksData });
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

  toggleGridViewLocked = () => {
    this.setState({
      gridView: !this.state.gridViewLocked,
      gridViewLocked: !this.state.gridViewLocked
    })
  };

  renderMenu() {
    const { appOpenedModules, gridView, gridViewLocked, openedTasksData} = this.state;
    return (
      <div style={{ position: 'absolute', right: 10, zIndex: 9 }}>
        <Menu
          options={[{
            label: 'Log out',
            action: () => window.location.replace('logout'),
          }, {
            label: gridView ? 'Hide grid' : 'Show grid',
            action: this.toggleGridView,
            disabled: appOpenedModules.length + openedTasksData.length < 2,
          },  {
            label: gridViewLocked ? 'Unlock grid' : 'Lock grid',
            action: this.toggleGridViewLocked,
          }, {
            label: 'Reset grid',
            action: this.resetGrid,
            visible: gridView,
          }]}
        />
      </div>
    );
  }

  renderModule(moduleId, props) {
    const { activeModuleId, openedTasksData } = this.state;
    const isApplicationModule = APP_MODULES_IDS.includes(moduleId);
    const taskListId = props.app.taskList.id;
    const taskData = openedTasksData[activeModuleId];
    const Component = isApplicationModule ? MODULES_COMPONENTS[activeModuleId] : MODULES_COMPONENTS[MODULES_IDS.TASK];
    const handlerName = isApplicationModule ? moduleId : MODULES_IDS.TASK;
    const data = isApplicationModule ? props.app[activeModuleId] : taskData;

    if (!data) {
      console.error(`No data for "${activeModuleId}" module`);
    }

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
    const list = Object.keys(openedTasksData).map(moduleId => openedTasksData[moduleId]);

    return list.map(data => (
      <Task key={data.id} {...this.moduleHandler(MODULES_IDS.TASK, data)} />
    ));
  }

  renderResponsiveGrid(props) {
    const { layouts } = this.state;

    return (
      <ResponsiveGrid
        layouts={layouts}
        onModuleClose={this.onModuleClose}
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
            count: 5,
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
