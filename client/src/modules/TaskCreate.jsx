import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import CircularProgress from 'material-ui/CircularProgress';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import AddButton from 'material-ui/svg-icons/navigation/check';
import { Label, Input, Select } from '../components';
import Create from 'material-ui/svg-icons/content/create';
import addTask from '../mutations/addTask';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
  },
};

class TaskCreate extends React.Component {
  static propTypes = {
    onAdded: PropTypes.func,
    type: PropTypes.string,
  };

  state = {
    pending: false,
    task: null,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      task: nextProps.data.taskCreate,
    });
  }

  componentDidMount() {
    this.props.relay.refetch({ type: this.props.type });
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
    const { /* taskType, */fields } = this.state.task;
    const updateFieldValue = (fieldId, value) => {
      const fieldIndex = this.state.task.fields.findIndex(field => field.fieldId === fieldId);

      this.setState(update(this.state, {
        task: {
          fields: {
            [fieldIndex]: {
              value: {
                $set: value
              }
            }
          }
        }
      }));
    };

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
      {fields
        .map(item => item) // propsy są immutable, sortowanie modyfikuje oryginalną tablicę
        .sort((a, b) => a.order - b.order)
        .map(({ fieldId, label, type, meta: { options }, value, info }) => console.log(['options'], options) || (
        <div key={fieldId}>
          <Paper style={styles.row}>
            <div style={{ padding: 10, width: 200, textAlign: 'left' }}>
              <Create />
              <Label style={{ padding: 10 }}>{label}</Label>
            </div>
            <div style={{ paddingRight: 20, width: '80%' }}>
          {({
            CHOICE: (
              <Select
                style={{ width: '80%' }}
                value={value.id}
                info={info}
                options={options || []}
                onChange={(e, id) => {
                  console.log(['onChange.value'], { id });
                  updateFieldValue(fieldId, { id });
                }}
              />
            ),
            DATE: (
              <DatePicker
                textFieldStyle={{ width: '80%' }}
                autoOk
                value={value.id}
                hintText={info}
                options={options || []}
                onChange={(e, id) => {
                  console.log(['onChange.value'], { id });
                  updateFieldValue(fieldId, { id });
                }}
              />
            ),
          })[type] || (
            <Input
              style={{ width: '80%' }}
              multiLine
              hintText={info}
              value={value.text || value.number}
              onChange={(e, value) => {
                console.log(['onChange.value'], value);
                updateFieldValue(fieldId, { text: value });
              }}
            />
          )}
            </div>
          </Paper>
        </div>
      ))}
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
        taskType
        fields {
          fieldId
          format
          order
          type
          label
          value {
            ... on NumberValueType {
              number
            }
            ... on TextNumberType {
              text
              id
            }
          }
          info
          meta {
            ... on NumberMetaType {
              required
              min
              max
            }
            ... on  TextMetaType {
              required
              minLen
              maxLen
              options {
                text
                value
              }
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
          taskType
          fields {
            fieldId
            format
            order
            type
            label
            value {
              ... on NumberValueType {
                number
              }
              ... on TextNumberType{
                text
                id # tymczasowo do czasu dorobienia type dla ChoiceValueType
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
                options {
                  text
                  value
                }
              }
            }
          }
        }
      }
    }
  `
);
