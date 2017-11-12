import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import AddButton from 'material-ui/svg-icons/navigation/check';
import { Icon, Label, Input, Date, Select, Slider } from '../components';
import environment from '../environment';
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
    task: this.props.taskCreate,
  };

  updateTask(update) {
    this.setState({
      task: {
        ...this.state.task,
        ...update,
      }
    })
  }

  onAdd = () => {
    this.setState({ pending: true });
    addTask(environment, this.state.task, this.props.home.id, this.props.onAdded)
  };

  render() {
    const { title, priority, creationDate, progress, finishDate, status, note } = this.state.task;

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
              value: 'TODO',
              text: 'TODO',
            }, {
              value: 'IN_PROGRESS',
              text: 'In progress',
            }]}
            onChange={(e, priority) => {
              this.updateTask({ priority });
            }}
          />
          </Paper>
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
             <Label>Creation Date</Label>
            </div>
            <Date
              value={new Date(creationDate)}
              hintText="Change creation date"
              onChange={(e, creationDate) => {
                this.updateTask({ creationDate });
              }}
            />
          </Paper>
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
              <Label>Progress</Label>
            </div>
            <Slider
              value={progress}
              onChange={(e, progress) => {
                this.updateTask({ progress });
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
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
              <Label>Finish Date</Label>
            </div>
            <Date
              value={new Date(finishDate)}
              hintText="Set finish date"
              onChange={(e, finishDate) => {
                this.updateTask({ finishDate });
              }}
            />
          </Paper>
          <Paper style={styles.row}>
            <div style={{ textAlign: 'center' }}>
              <Icon type={'diskFull'} />
              <Label>Note</Label>
            </div>
            <Input
              multiLine
              value={note}
              hintText="Add task note"
              onChange={(e, note) => {
                this.updateTask({ note });
              }}
            />
          </Paper>
        </div>
      </div>
    );
  }
}

export default class DataProvider extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query TaskCreateQuery($type: String) {
            app {
              taskCreate (type: $type) {
                id
                title
                priority
                creationDate
                finishDate
                progress
                status
                note
              },
              home {
                id
              }
            }
          }
        `}
        variables={{
          type: this.props.type,
        }}
        render={({error, props}) => {
          if (error) {
            return <div>{JSON.stringify(error)}</div>;
          } else if (props) {
            return <TaskCreate {...props.app} {...this.props} />;
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
    );
  }
}
