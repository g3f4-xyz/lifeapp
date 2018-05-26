import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import AddButton from '@material-ui/icons/Check';
import Loader from "../components/Loader";
import editTaskMutation from "../mutations/editTask";
import Fields from '../components/Fields';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
    minHeight: 50,
  },
};

export default class TaskEdit extends React.Component {
  static propTypes = {
    onEdited: PropTypes.func,
    data: PropTypes.object,
    parentId: PropTypes.string,
  };

  state = {
    task: this.props.data,
  };

  updateTask(update) {
    this.setState({
      task: {
        ...this.state.task,
        ...update,
      }
    })
  }

  onSave = async () => {
    const { id, fields } = this.state.task;
    console.log(['TaskEdit:onSave'], this.state.task);
    this.props.onEdited();

    try {
      await editTaskMutation({ id, fields });
    }

    catch (error) {
      console.error(['TaskEdit:onSave:error'], error);
    }
  };

  render() {
    if (!this.state.task) {
      return (
        <Loader />
      );
    }
    console.log(['this.state.task'], this.state.task)
    const { fields } = this.state.task;
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
            onClick={this.onSave}
          />
        )}
        <Fields fields={fields} onFieldChange={updateFieldValue} />
      </div>
    );
  }
}
