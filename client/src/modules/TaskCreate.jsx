import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import AddButton from 'material-ui/svg-icons/navigation/check';
import { Icon, Label, Input, Select } from '../components';
import addTask from '../mutations/addTask';

const styles = {
  leftCol: {
    float: 'left',
    width: '50%',
    textAlign: 'left',
  },
  rightCol: {
    float: 'left',
    width: '50%',
    textAlign: 'left',
  },
  root: {
  },
  row: {
    margin: 10,
  },
};

class TaskCreate extends React.Component {
  static propTypes = {
    onAdded: PropTypes.func,
  };

  state = {
    pending: false,
    task: null,
  };

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      task: nextProps.data.taskCreate,
    });
  }

  componentDidMount() {
    this.props.relay.refetch({ type: 'default' });
  }

  updateTask(update) {
    this.setState({
      task: {
        ...this.state.task,
        ...update,
      }
    })
  }

  onAdd = () => {
    const { data, onAdded } = this.props;

    this.setState({ pending: true });
    addTask(this.props.relay.environment, this.state.task, data.taskList.id, onAdded)
  };

  render() {
    if (!this.state.task) {
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
    }
    const { title, priority, status/* , additionalFields */ } = this.state.task;

    return (
      <div style={styles.root}>
        {this.state.pending ? (
          <CircularProgress
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              zoom: 2,
              margin: 20,
            }}
            size={60} thickness={6}
          />
        ) : (
          <AddButton
            style={{
              position: 'absolute',
              bottom: 0,
              color: '#8BC34A',
              right: 0,
              margin: 20,
              width: '20%',
              height: '20%',
            }}
            onClick={this.onAdd}
          />
        )}

        <Input
          multiLine
          hintText="Enter title of new task"
          value={title}
          style={{
            fontSize: '32px',
          }}
          onChange={(e, title) => {
            this.updateTask({ title });
          }}
        />
        <div style={styles.leftCol}>
          <Paper style={styles.row}>
          <div style={{ textAlign: 'center' }}>
            <Icon type={'eventNote'} />
            <Label>Priority</Label>
          </div>
          <Select
            value={priority}
            hintText="Set task priority"
            options={[{
              value: 1,
              text: 'TODO',
            }, {
              value: 2,
              text: 'In progress',
            }]}
            onChange={(e, priority) => {
              this.updateTask({ priority });
            }}
          />
          </Paper>
        </div>
        <div style={styles.rightCol}>
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
             <Label>Status</Label>
            </div>
            <Select
              value={status}
              hintText="Set task priority"
              options={[{
                value: 'NORMAL',
                text: 'Normal',
              }, {
                value: 'URGENT',
                text: 'Urgent',
              }]}
              onChange={(e, status) => {
                this.updateTask({ status });
              }}
            />
          </Paper>
        </div>
      </div>
    );
  }
}

export default createRefetchContainer(
  TaskCreate,
  graphql`
    fragment TaskCreate on AppType 
    @argumentDefinitions(
      type: { type: "String", defaultValue: "" },
    ) 
    {
      id
      taskList {
        id
      }
      taskCreate(type: $type) {
        id
        title
        status
        priority
        additionalFields {
          fieldId
          format
          type
          label
          value {
            ... on NumberValueType {
              number
            }
            ... on TextNumberType{
              text
            }
          }
          info
          meta {
            ... on NumberMetaType {
              required
              min
              max
            }
            ... on TextMetaType{
              required
              minLen
              maxLen
            }
          }
        }
      }
    }
  `,
  graphql`
    query TaskCreateRefetchQuery($type: String) {
      app {
        id
        taskList {
          id
        }
        taskCreate(type: $type) {
          id
          title
          status
          priority
          additionalFields {
            fieldId
            format
            type
            label
            value {
              ... on NumberValueType {
                number
              }
              ... on TextNumberType{
                text
              }
            }
            info
            meta {
              ... on NumberMetaType {
                required
                min
                max
              }
              ... on TextMetaType{
                required
                minLen
                maxLen
              }
            }
          }
        }
      }
    }
  `
);
