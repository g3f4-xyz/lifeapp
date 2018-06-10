import React, { Component, Fragment } from 'react';
import { QueryRenderer, graphql } from 'react-relay'
import immutabilityHelper from 'immutability-helper'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorBoundary from './containers/ErrorBoundary';
import ResponsiveGrid from './containers/ResponsiveGrid';
import { MODULES_IDS } from './constans';
import environment from './environment';
import Menu from './components/Menu';
import Loader from './components/Loader';
import TaskQuery, { handler as taskHandler } from './modules/Task';
import TaskListQuery, { handler as taskListHandler } from './modules/TaskList';
import TaskTypeListQuery, { handler as taskTypeListHandler } from './modules/TaskTypeList';

const originalLayouts = getFromLS('layouts') || {};
const styles = {
  backButton: {
    zIndex: 9,
    position: 'absolute',
    bottom: 20,
    left: 20,
    height: 72,
    width: 72,
  },
  backButtonIcon: {
    fontSize: 72,
  },
  menuContainer: {
    position: 'absolute',
    right: 10,
    zIndex: 9,
  },
};

const QUERIES_COMPONENTS = {
  [MODULES_IDS.TASK]: TaskQuery,
  [MODULES_IDS.TASK_LIST]: TaskListQuery,
  [MODULES_IDS.TASK_TYPE_LIST]: TaskTypeListQuery,
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
    activeModulesHistory: [MODULES_IDS.TASK_LIST],
    appOpenedModuleIds: [MODULES_IDS.TASK_LIST],
    openedTasksModulesProps: [],
    layouts: originalLayouts,
    gridView: false,
    gridViewLocked: false,
  };

  handlers = {
    [MODULES_IDS.TASK]: taskHandler,
    [MODULES_IDS.TASK_LIST]: taskListHandler,
    [MODULES_IDS.TASK_TYPE_LIST]: taskTypeListHandler,
  };

  moduleHandler(handlerName, moduleProps, data) {
    const handler = this.handlers[handlerName];
    const updateState = spec => this.setState(immutabilityHelper(this.state, spec));

    if (handler) {
      return handler(moduleProps, data, this.state, updateState);
    }

    console.error(`No module handler provider for module ${moduleProps.moduleId}`);
  }

  onModuleZoom = activeModuleId => {
    console.log(['App:onModuleZoom:activeModuleId'], activeModuleId);
    const { appOpenedModuleIds } = this.state;
    const isApplicationModule = APP_MODULES_IDS.includes(activeModuleId);
    const setAppOpenedModuleIds = () => {
      return appOpenedModuleIds.includes(activeModuleId)
        ? appOpenedModuleIds
        : [...appOpenedModuleIds, activeModuleId];
    };

    this.setState({
      activeModuleId,
      activeModulesHistory: [MODULES_IDS.TASK_LIST, activeModuleId],
      gridView: false,
      appOpenedModuleIds: isApplicationModule
        ? setAppOpenedModuleIds()
        : appOpenedModuleIds,
    });
  };

  onModuleClose = moduleId => {
    console.log(['App:onModuleClose:moduleId'], moduleId);
    if (moduleId !== MODULES_IDS.TASK_LIST) {
      const { appOpenedModuleIds, openedTasksModulesProps } = this.state;

      if (APP_MODULES_IDS.includes(moduleId)) {
        this.setState({
          appOpenedModuleIds: appOpenedModuleIds.filter(id => id !== moduleId),
        });
      } else {
        this.setState({
          openedTasksModulesProps: openedTasksModulesProps.filter(props => props.moduleId !== moduleId),
        });
      }
    }
  };

  onActiveModuleBack = () => {
    console.log(['App:onActiveModuleBack']);
    const { activeModuleId, activeModulesHistory, appOpenedModuleIds, openedTasksModulesProps } = this.state;
    const isApplicationModule = APP_MODULES_IDS.includes(activeModuleId);

    if (isApplicationModule) {
      this.setState({
        activeModuleId: activeModulesHistory[activeModulesHistory.length - 2],
        activeModulesHistory: activeModulesHistory.filter(moduleId => moduleId !== activeModuleId),
        appOpenedModuleIds: appOpenedModuleIds.filter(id => id !== activeModuleId),
      });
    } else {
      this.setState({
        activeModuleId: activeModulesHistory[activeModulesHistory.length - 2],
        activeModulesHistory: activeModulesHistory.filter(moduleId => moduleId !== activeModuleId),
        openedTasksModulesProps: openedTasksModulesProps.filter(props => props.moduleId !== activeModuleId),
      });
    }
  };

  onResetGrid= () => {
    this.setState({ layouts: {} });
  };

  onLayoutChange = (layout, layouts) => {
    console.log(['App:onLayoutChange'], layout, layouts, layouts === this.state.layouts);
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  };

  onToggleGridView = () => {
    this.setState({ gridView: !this.state.gridView })
  };

  onToggleGridViewLocked = () => {
    this.setState({
      gridView: !this.state.gridViewLocked,
      gridViewLocked: !this.state.gridViewLocked
    })
  };

  renderMenu() {
    const { gridView, gridViewLocked } = this.state;

    return (
      <div className={this.props.classes.menuContainer}>
        <Menu
          options={[{
            label: 'Log out',
            action: () => window.location.replace('logout'),
          }, {
            label: gridView ? 'Hide grid' : 'Show grid',
            action: this.onToggleGridView,
          },  {
            label: gridViewLocked ? 'Unlock grid' : 'Lock grid',
            action: this.onToggleGridViewLocked,
          }, {
            label: 'Reset grid',
            action: this.onResetGrid,
            visible: gridView,
          }]}
        />
      </div>
    );
  }

  renderTaskModule(moduleProps, data) {
    return (
      <TaskQuery key={moduleProps.moduleId} { ...this.moduleHandler(MODULES_IDS.TASK, moduleProps, data) } />
    );
  }

  renderTaskModules(data) {
    return this.state.openedTasksModulesProps.map(module => this.renderTaskModule(module, data));
  }

  renderApplicationModule(moduleId, data) {
    const Component = QUERIES_COMPONENTS[moduleId];

    return (
      <Component
        key={moduleId}
        moduleId={moduleId}
        {...this.moduleHandler(moduleId, { moduleId }, data)}
      />
    );
  }

  renderApplicationModules(data) {
    return this.state.appOpenedModuleIds.map(moduleId =>
      this.renderApplicationModule(moduleId, data.app[moduleId]));
  }

  renderResponsiveGrid(data) {
    const { layouts } = this.state;

    return (
      <ResponsiveGrid
        layouts={layouts}
        onModuleClose={this.onModuleClose}
        onModuleZoom={this.onModuleZoom}
        onLayoutChange={this.onLayoutChange}
      >
        {this.renderApplicationModules(data)}
        {this.renderTaskModules(data)}
      </ResponsiveGrid>
    );
  }

  renderModule(data) {
    const { activeModuleId } = this.state;
    const isApplicationModule = APP_MODULES_IDS.includes(activeModuleId);

    if (isApplicationModule) {
      return this.renderApplicationModule(activeModuleId, data);
    }

    const taskModuleProps = this.state.openedTasksModulesProps.find(({ moduleId }) => activeModuleId === moduleId);

    if (!taskModuleProps) {
      console.error(`No moduleProps for module "${activeModuleId}"`);
    }

    return this.renderTaskModule(taskModuleProps, data);
  }

  renderApplication(data) {
    const { classes } = this.props;
    const { activeModuleId, gridView } = this.state;
    const isTaskListModuleActive = MODULES_IDS.TASK_LIST === activeModuleId;

    return (
      <Fragment>
        {this.renderMenu()}
        {this.state.gridView ? this.renderResponsiveGrid(data) : this.renderModule(data)}
        {!(isTaskListModuleActive || gridView) && (
          <IconButton
            className={classes.backButton}
            color="secondary"
            onClick={this.onActiveModuleBack}
          >
            <CancelIcon className={classes.backButtonIcon} />
          </IconButton>
        )}
      </Fragment>
    )
  }

  render() {
    console.log(['App:render'], this.state);
    return (
      <ErrorBoundary>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query AppQuery {
              app {
                taskList {
                  id
                }
                taskTypeList {
                  id
                }
              }
            }
          `}
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

export default withStyles(styles)(App);
