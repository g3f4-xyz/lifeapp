import React from 'react';
import Relay from 'react-relay';
import shallowequal from 'shallowequal';
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
    id: MODULES_IDS.HOME,
    Component: Home,
    offset: {
      column: 1,
      row: 1,
    },
  },
  {
    id: MODULES_IDS.ENTER,
    Component: Enter,
    offset: {
      column: 1,
      row: 0,
    },
  },
  {
    id: MODULES_IDS.TASK_CREATE,
    Component: TaskCreate,
    offset: {
      column: 0,
      row: 0,
    },
  },
  {
    id: MODULES_IDS.TASK_EDIT,
    Component: TaskEdit,
    offset: {
      column: 2,
      row: 0,
    },
  },
  {
    id: MODULES_IDS.TASK_DETAILS,
    Component: TaskDetails,
    offset: {
      column: 2,
      row: 1,
    },
  },
  {
    id: MODULES_IDS.TEMPLATES,
    Component: Templates,
    offset: {
      column: 0,
      row: 1,
    },
  },
  {
    id: MODULES_IDS.SETTINGS,
    Component: Settings,
    offset: {
      column: 1,
      row: 2,
    },
  },
  {
    id: MODULES_IDS.ATTACHMENT_PREVIEW,
    Component: AttachmentPreview,
    offset: {
      column: 2,
      row: 2,
    },
  },
  {
    id: MODULES_IDS.CUSTOM_TEMPLATE,
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
    visited: [MODULES_IDS.HOME],
    viewPortOffset: {
      column: 1,
      row: 1,
    },
  };

  handlers = {
    [MODULES_IDS.HOME]: () => ({
      home: this.props.app.home,
      onDetails: this.onDetails,
    }),
    [MODULES_IDS.TASK_DETAILS]: () => ({
      taskDetails: this.props.app.taskDetails,
      onDetails: this.onDetails,
    }),
  };

  onDetails = selectedTaskId => {
    this.props.relay.setVariables({ selectedTaskId }, () => {
      this.onModuleChange({
        column: 2,
        row: 1,
      })
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

  render() {

    return (
      <div>
        <Grid
          dynamic
          modules={MODULES}
          handlers={this.handlers}
          visited={this.state.visited}
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
