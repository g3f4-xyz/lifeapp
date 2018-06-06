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
    onSave: PropTypes.func,
    onTaskChange: PropTypes.func,
    data: PropTypes.object,
    taskListId: PropTypes.string,
  };

  onSave = async () => {
    const { isNew, ...task } = this.props.data;
    const id = isNew ? '' : task.id;
    console.log(['TaskEdit:onSave'], this.props.data);
    this.props.onSave();

    try {
      await saveTaskMutation({
        isNew,
        task: {
          fields: task.fields,
          id,
          taskType: task.taskType,
        },
        parentID: this.props.taskListId,
      });
    }

    catch (error) {
      console.error(['TaskEdit:onSave:error'], error);
    }
  };

  render() {
    if (!this.props.data) {
      return null;
    }

    const { fields, taskType } = this.props.data;
    const updateFieldValue = (fieldId, value) => {
      const fieldIndex = fields.findIndex(field => field.fieldId === fieldId);
      const data = update(this.props.data, {
        fields: {
          [fieldIndex]: {
            value: {
              $set: value
            }
          }
        }
      });

      this.props.onTaskChange(data);
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
