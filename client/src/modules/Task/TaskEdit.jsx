import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import saveTaskMutation from '../../mutations/saveTask';
import Fields from '../../containers/Fields';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
    minHeight: 50,
  },
  addButton: {
    zIndex: 9,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 72,
    width: 72,
  },
  addButtonIcon: {
    color: '#8BC34A',
    fontSize: 72,
  },
};

class TaskEdit extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
    taskListId: PropTypes.string,
    isNew: PropTypes.bool,
    onSaveDone: PropTypes.func,
  };

  state = {
    task: this.props.data,
  };

  static valueParser(field) {
    if (field.type === 'datetime-local') {
      return {
        ...field,
        value: {
          text: (new Date(field.value.text)),
        }
      }
    }

    return field;
  }

  onSave = async () => {
    const { isNew, taskListId } = this.props;
    const { task } = this.state;
    const id = isNew ? '' : task.id;
    console.log(['TaskEdit:onSave'], this.state);
    console.log(['TaskEdit:fields'], task.fields);
    console.log(['TaskEdit:parsedFields'], task.fields.map(TaskEdit.valueParser));

    try {
      await saveTaskMutation({
        isNew,
        task: {
          id,
          fields: task.fields.map(TaskEdit.valueParser),
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

  updateFieldValue = (fieldId, value) => {
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

  render() {
    console.log(['TaskEdit:render'], this.props);
    const { classes } = this.props;
    const { fields, taskType } = this.state.task;

    return (
      <div className={classes.root}>
        <IconButton
          className={classes.addButton}
          color="primary"
          onClick={this.onSave}
        >
          <CheckCircleIcon className={classes.addButtonIcon} />
        </IconButton>
        <h1>{taskType}</h1>
        <Fields fields={fields} onFieldChange={this.updateFieldValue} />
      </div>
    );
  }
}

export default withStyles(styles)(TaskEdit);
