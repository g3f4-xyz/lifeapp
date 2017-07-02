import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import AddButton from 'material-ui/svg-icons/navigation/check';
import { Icon, Label, Input, Date, Select, Slider } from '../components';
import Radio from 'backbone.radio';

const channel = Radio.channel('app');

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
    onAdd: PropTypes.func,
  };

  state = {
    task: {
      title: '',
      priority: null,
      creationDate: null,
      progress: 0,
      finishDate: null,
      status: null,
      note: '',
    },
  };

  componentDidMount() {
    console.log(['TaskCreate:componentDidMount']);
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
    channel.request('addTask', this.state.task);
  };

  render() {
    const { title, priority, creationDate, progress, finishDate, status, note } = this.state.task;

    return (
      <div style={styles.root}>
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
              value={creationDate}
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
              value={finishDate}
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

export default TaskCreate;
