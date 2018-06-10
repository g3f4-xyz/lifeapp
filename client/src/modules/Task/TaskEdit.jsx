import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import AddButton from '@material-ui/icons/Check';
import saveTaskMutation from '../../mutations/saveTask';
import Fields from '../../components/Fields';

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
    onSaveDone: PropTypes.func,
    isNew: PropTypes.bool,
    data: PropTypes.object,
    taskListId: PropTypes.string,
  };

  state = {
    task: this.props.data,
  };

  onSave = async () => {
    const { isNew, taskListId } = this.props;
    const { task } = this.state;
    const id = isNew ? '' : task.id;
    console.log(['TaskEdit:onSave'], this.state);

    try {
      await saveTaskMutation({
        isNew,
        task: {
          id,
          fields: task.fields,
          taskType: task.taskType,
        },
        parentID: taskListId,
      });
      this.props.onSaveDone();
    }

    catch (error) {
      console.error(['TaskEdit:onSave:error'], error);
    }
  };

  render() {
    console.log(['TaskEdit:render'], this.props);
    if (!this.state) {
      return null;
    }

    const { fields, taskType } = this.state.task;
    const updateFieldValue = (fieldId, value) => {
      const fieldIndex = fields.findIndex(field => field.fieldId === fieldId);

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
        <h1>{taskType}</h1>
        <Fields fields={fields} onFieldChange={updateFieldValue} />
      </div>
    );
  }
}
