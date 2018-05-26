import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import AddButton from '@material-ui/icons/Check';
import addTask from '../mutations/addTask';
import Loader from '../components/Loader';
import Fields from '../components/Fields';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
  },
};

class TaskCreate extends React.PureComponent {
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
        <Loader />
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
          <Loader />
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
      <Fields fields={fields} onFieldChange={updateFieldValue} />
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
